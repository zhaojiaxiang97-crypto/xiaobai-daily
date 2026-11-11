#!/usr/bin/env node
// 独立 chunk → 可运行 .vue：复用 convert-component 的模板转换，补齐真实 import
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');

const VUE_API_MAP = {
  '$n':'normalizeClass','An':'unref','Ct':'renderSlot','O':'createTextVNode','S':'createElementBlock',
  'St':'renderList','Wt':'watch','b':'createBlock','c':'Fragment','gt':'openBlock','j':'defineComponent',
  'mt':'onUnmounted','ot':'onMounted','rr':'toDisplayString','ut':'onBeforeMount','v':'computed',
  'x':'createCommentVNode','y':'createElementVNode','H':'createElementVNode','D':'createStaticVNode',
  'A':'defineAsyncComponent','Bn':'isArray',
};
const SEM = new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode',
  'createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass',
  'toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment',
  'computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent','ref',
  'reactive','nextTick','inject','provide','h','toRef','toRefs','shallowRef','triggerRef']);

const [,, file, outDir, convPath, mapPath] = process.argv;
// 组件映射表： "相对路径::导出名" -> 组件名（用于跨 chunk import 重定向到 .vue）
let COMP_MAP = {};
if (mapPath) { try { COMP_MAP = JSON.parse(fs.readFileSync(mapPath, 'utf8')); } catch {} }
// 源文件所在目录（ui/blocks/pages/chunks），用于拼 vendor 内路径
const srcDirName = path.basename(path.dirname(file));
const src = fs.readFileSync(file, 'utf8');
const ast = P.parse(src, { sourceType: 'module' });

const imports = {};
T(ast, {
  ImportDeclaration(p) {
    const from = p.node.source.value;
    for (const sp of p.node.specifiers) {
      if (t.isImportSpecifier(sp) && t.isIdentifier(sp.local) && t.isIdentifier(sp.imported)) {
        imports[sp.local.name] = { imported: sp.imported.name, from };
      } else if (t.isImportDefaultSpecifier(sp) && t.isIdentifier(sp.local)) {
        imports[sp.local.name] = { imported: 'default', from };
      }
    }
  },
});
const isRuntime = f => /vue-i18n\.runtime/.test(f || '');

// 提取组件名 + props + setup 参数
const comps = [];
T(ast, {
  VariableDeclarator(p) {
    const { id, init } = p.node;
    if (!t.isIdentifier(id) || !init || !(t.isCallExpression(init))) return;
    const callee = t.isIdentifier(init.callee) ? init.callee.name : null;
    if (!callee) return;
    // 先经 import 表解析成本地语义（o → j → defineComponent）
    const imp = imports[callee];
    // import 解析优先：本地名可能与 Vue 语义名撞车（如 dialog.js 里 h = defineComponent），
    // 先按 import 表解析才能得到真实语义；SEM 只作无 import 时的兜底。
    let sem = null;
    if (imp) {
      if (isRuntime(imp.from)) sem = VUE_API_MAP[imp.imported] || (SEM.has(imp.imported) ? imp.imported : null);
      else sem = SEM.has(imp.imported) ? imp.imported : null;
    }
    if (sem === null && SEM.has(callee)) sem = callee;
    if (sem !== 'defineComponent') return;
    const arg = init.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    let name = null, propsCode = '{}', setupParam = null, alias = null, setupNode = null;
    for (const pr of arg.properties) {
      if (!t.isObjectProperty(pr)) continue;
      const k = t.isIdentifier(pr.key) ? pr.key.name : (t.isStringLiteral(pr.key) ? pr.key.value : null);
      if (k === '__name') {
        const v = pr.value;
        name = t.isStringLiteral(v) ? v.value : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
      }
      if (k === 'props') propsCode = src.slice(pr.value.start, pr.value.end);
      if (k === 'setup' && (t.isFunctionExpression(pr.value) || t.isArrowFunctionExpression(pr.value))) {
        setupNode = pr.value;
        const fp = pr.value.params[0];
        if (t.isIdentifier(fp)) setupParam = fp.name;
        const bodySrc = src.slice(pr.value.start, pr.value.end);
        const m = bodySrc.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
        if (m && m[2] === setupParam) alias = m[1];
      }
    }
    // 形态二：ObjectMethod setup(o) { ... }（Kbd 等用的是这种）
    if (!setupNode) {
      for (const pr of arg.properties) {
        if (t.isObjectMethod(pr) && t.isIdentifier(pr.key, { name: 'setup' })) setupNode = pr;
      }
    }
    if (!setupParam) {
      for (const pr of arg.properties) {
        if (t.isObjectMethod(pr) && t.isIdentifier(pr.key, { name: 'setup' })) {
          const fp = pr.params[0];
          if (t.isIdentifier(fp)) {
            setupParam = fp.name;
            const bodySrc = src.slice(pr.start, pr.end);
            const m = bodySrc.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
            if (m && m[2] === setupParam) alias = m[1];
          }
        }
      }
    }
    if (name) {
      // 自由变量分析：组件引用了、但既非 import 也非组件内部的标识符
      // （通常是 chunk 文件级的辅助函数/常量；切分后必须一并带进组件）
      const free = new Set();
      try {
        const fileAst = t.file(t.program([t.variableDeclaration('var', [
          t.variableDeclarator(t.identifier('__c'), t.cloneNode(arg, true, true))
        ])]));
        T(fileAst, {
          Identifier(ip) {
            if (!ip.isReferencedIdentifier()) return;
            const nm = ip.node.name;
            if (nm === '__c') return;
            if (ip.scope.hasBinding(nm)) return;
            free.add(nm);
          },
        });
      } catch (e) {}
      // 组件子树内的所有声明（含 setup 内、render 内、逗号表达式内的局部函数）
      // 用局部 traverse 精确限定范围，避免同名符号串台
      const innerDefs = new Map();
      try {
        // 提取声明里的所有绑定名（普通标识符 + 解构模式里的别名）
        // 解构是关键：`let { state: N } = useX()` 里的 N 会被模板引用，
        // 只认 Identifier 的写法会整条跳过 → 运行时 ReferenceError。
        const bindingNames = node => {
          const out = [];
          const walk = n => {
            if (!n) return;
            if (t.isIdentifier(n)) { out.push(n.name); return; }
            if (t.isObjectPattern(n)) {
              for (const pr of n.properties) {
                if (t.isObjectProperty(pr)) walk(pr.value);       // {key: alias} → alias
                else if (t.isRestElement(pr)) walk(pr.argument);
              }
              return;
            }
            if (t.isArrayPattern(n)) { for (const el of n.elements) walk(el); return; }
            if (t.isAssignmentPattern(n)) { walk(n.left); return; }   // {a: x = 1} → x
            if (t.isRestElement(n)) { walk(n.argument); return; }
          };
          walk(node);
          return out;
        };

        p.traverse({
          VariableDeclaration(decl) {
            // 按「整条声明语句」内联：解构的右侧依赖（如 O()）必须一起带上，
            // 否则内联出来的只有一个空洞的别名。
            const kind = decl.node.kind || 'var';
            const stmtCode = `${kind} ${src.slice(decl.node.start, decl.node.end).replace(/^\s*(?:var|let|const)\s+/, '')}`;
            const stmtEnd = stmtCode.endsWith(';') || stmtCode.endsWith('}') ? '' : ';';
            const fullCode = stmtCode + stmtEnd;
            for (const d of decl.node.declarations) {
              for (const nm of bindingNames(d.id)) {
                if (!innerDefs.has(nm)) {
                  innerDefs.set(nm, { code: fullCode, start: decl.node.start });
                }
              }
            }
          },
          FunctionDeclaration(f) {
            if (!f.node.id) return;
            if (!innerDefs.has(f.node.id.name)) {
              innerDefs.set(f.node.id.name, {
                code: src.slice(f.node.start, f.node.end),
                start: f.node.start,
              });
            }
          },
        });
      } catch (e) {}
      comps.push({ name, propsCode, setupParam, alias, free: [...free], node: arg, setupNode, innerDefs });
    }
  },
});
if (!comps.length) { console.error('no-component'); process.exit(0); }

// 原文件的全部 import 源码（必须随临时文件一起喂给转换器）
// 否则 convert-component 的 API 表为空，只能靠全局 VUE_API_MAP 兜底 ——
// 而全局表是对 main bundle 探测的，不同 chunk 的短名含义不同：
//   本 chunk 里 x = import b = createBlock，但 VUE_API_MAP['x'] = createCommentVNode
//   → 被当作注释节点丢弃 → 整个 render 变空模板。
const importSrc = [];
T(ast, {
  ImportDeclaration(p) {
    if (p.parentPath.isProgram()) importSrc.push(src.slice(p.node.start, p.node.end));
  },
});

// ── setup 作用域的定义（模板里引用的 ref/computed/局部函数都在这里）──
// 转换器只取了 setup 返回的 render 并转成模板，setup 体内其余定义会被丢弃；
// 模板引用了它们 → 运行时 ReferenceError。这里按引用把它们抽出来内联。
function collectSetupDefs(setupNode) {
  const defs = new Map();
  if (!setupNode) return defs;
  const body = setupNode.body;
  const stmts = t.isBlockStatement(body) ? body.body
    : (t.isExpression(body) ? [] : []);
  for (const st of stmts) {
    if (t.isVariableDeclaration(st)) {
      for (const d of st.declarations) {
        if (!t.isIdentifier(d.id)) continue;
        // 跳过解构出来的 t / locale 之类（模板用不到就自然不会被选中）
        defs.set(d.id.name, {
          code: src.slice(d.start, d.end),
          start: d.start,
          kind: st.kind,
        });
      }
    } else if (t.isFunctionDeclaration(st) && st.id) {
      defs.set(st.id.name, { code: src.slice(st.start, st.end), start: st.start, kind: 'function' });
    }
  }
  return defs;
}

// 压缩代码常把局部函数塞进逗号表达式：
//   return (e, t) => (function N() { ... }, createElementVNode(...))
// 转换器只取最后一项当模板，前面的定义必须捞回来内联。
function collectRenderLocals(setupNode) {
  const defs = [];
  if (!setupNode) return defs;
  const body = setupNode.body;
  const stmts = t.isBlockStatement(body) ? body.body : [];
  const ret = stmts.find(x => t.isReturnStatement(x));
  if (!ret || !ret.argument) return defs;
  let node = ret.argument;
  let seqNode = null;
  if (t.isSequenceExpression(node)) seqNode = node;
  else if (t.isArrowFunctionExpression(node) || t.isFunctionExpression(node)) {
    if (t.isSequenceExpression(node.body)) seqNode = node.body;
    else if (t.isBlockStatement(node.body)) {
      // 函数体内也可能先定义再 return
      for (const st of node.body.body) {
        if (t.isFunctionDeclaration(st) && st.id) {
          defs.push({ name: st.id.name, code: src.slice(st.start, st.end), start: st.start });
        } else if (t.isVariableDeclaration(st)) {
          for (const d of st.declarations) {
            if (t.isIdentifier(d.id)) defs.push({ name: d.id.name, code: `${st.kind} ${src.slice(d.start, d.end)};`, start: d.start });
          }
        }
      }
    }
  }
  if (seqNode) {
    for (const item of seqNode.expressions.slice(0, -1)) {
      if (t.isFunctionExpression(item) && item.id) {
        defs.push({ name: item.id.name, code: src.slice(item.start, item.end), start: item.start });
      } else if (t.isAssignmentExpression(item) && t.isIdentifier(item.left)) {
        defs.push({ name: item.left.name, code: `const ${src.slice(item.start, item.end)};`, start: item.start });
      }
    }
  }
  return defs;
}

// 从 setup 定义表里，按「模板引用的名字」递归收集（依赖用标识符粗筛）
function collectSetupDeps(setupDefs, wanted, skip) {
  const out = new Map();
  const queue = [...wanted];
  const seenN = new Set();
  while (queue.length) {
    const nm = queue.shift();
    if (seenN.has(nm)) continue;
    seenN.add(nm);
    if (skip.has(nm)) continue;
    const def = setupDefs.get(nm);
    if (!def) continue;
    out.set(nm, def);
    for (const r of (def.code.match(/[A-Za-z_$][\w$]*/g) || [])) {
      if (r === nm) continue;
      if (seenN.has(r)) continue;
      if (setupDefs.has(r)) queue.push(r);
    }
  }
  return [...out.values()].sort((a, b) => a.start - b.start);
}

// ── 从 chunk 顶层抽出「文件级定义」，供组件内联 ──────────────────────────
// 结构：name -> { code, start, refs[] }
const topDefs = new Map();
T(ast, {
  VariableDeclaration(p) {
    if (!p.parentPath.isProgram()) return;
    for (const d of p.node.declarations) {
      if (!t.isIdentifier(d.id)) continue;
      // 组件定义本身不进 topDefs（否则会被当作自由变量再内联一次）
      if (d.init && t.isCallExpression(d.init) && t.isIdentifier(d.init.callee)) {
        const cn = d.init.callee.name;
        const cimp = imports[cn];
        let csem = null;
        if (cimp) csem = isRuntime(cimp.from)
          ? (VUE_API_MAP[cimp.imported] || (SEM.has(cimp.imported) ? cimp.imported : null))
          : (SEM.has(cimp.imported) ? cimp.imported : null);
        if (csem === null && SEM.has(cn)) csem = cn;
        if (csem === 'defineComponent') continue;
      }
      // 单条声明里可能多个 declarator，逐个抽（保持各自代码）
      const code = src.slice(d.start, d.end);
      const refs = new Set();
      T(t.file(t.program([t.variableDeclaration(p.node.kind, [t.cloneNode(d, true, true)])])), {
        Identifier(ip) {
          if (!ip.isReferencedIdentifier()) return;
          const nm = ip.node.name;
          if (nm === d.id.name) return;
          if (ip.scope.hasBinding(nm)) return;
          refs.add(nm);
        },
      });
      topDefs.set(d.id.name, { code, start: d.start, kind: p.node.kind, refs: [...refs] });
    }
  },
  FunctionDeclaration(p) {
    if (!p.parentPath.isProgram() || !p.node.id) return;
    const refs = new Set();
    T(t.file(t.program([t.cloneNode(p.node, true, true)])), {
      Identifier(ip) {
        if (!ip.isReferencedIdentifier()) return;
        const nm = ip.node.name;
        if (nm === p.node.id.name) return;
        if (ip.scope.hasBinding(nm)) return;
        refs.add(nm);
      },
    });
    topDefs.set(p.node.id.name, { code: src.slice(p.node.start, p.node.end), start: p.node.start, kind: 'function', refs: [...refs] });
  },
});
// 递归收集：给定自由变量集合，返回需要内联的定义（按源码顺序）
function resolveDeps(freeNames, importKeys) {
  const want = new Map();
  const queue = [...freeNames];
  const seenN = new Set();
  while (queue.length) {
    const nm = queue.shift();
    if (seenN.has(nm)) continue;
    seenN.add(nm);
    if (importKeys.has(nm)) continue;          // 是 import，另行处理
    const def = topDefs.get(nm);
    if (!def) continue;                        // 未知（全局/浏览器 API）
    want.set(nm, def);
    for (const r of def.refs) if (!seenN.has(r)) queue.push(r);
  }
  return [...want.values()].sort((a, b) => a.start - b.start);
}

fs.mkdirSync(outDir, { recursive: true });
let made = 0;
for (const c of comps) {
  // 用成熟转换器拿 template
  // 只转该组件，但把原文件的 import 一起带上（API 表靠它建立）
  let tpl = '';
  {
    const tmpFile = path.join('/tmp', '_lc_' + c.name.replace(/[^\w]/g, '_') + '.js');
    try {
      fs.writeFileSync(tmpFile,
        importSrc.join('\n') + '\nvar __c = ' + src.slice(c.node.start, c.node.end) + ';\nexport default {};\n');
      tpl = execFileSync('node', [convPath, tmpFile], { encoding: 'utf8', env: process.env }).trim();
    } catch (e) { }
    try { fs.unlinkSync(tmpFile); } catch (e) { }
  }
  if (!tpl) continue;

  const vueDeps = [...SEM].filter(a => new RegExp('(?<![\\w$])' + a + '\\s*\\(').test(tpl));
  const byFrom = {};
  for (const [local, info] of Object.entries(imports)) {
    if (isRuntime(info.from)) continue;
    if (!new RegExp('(?<![\\w$])' + local + '(?![\\w$])').test(tpl)) continue;
    const from = info.from;
    // 查映射表：该 chunk 的这个导出是否已被转换成 .vue（是则重定向 import）
    let redirected = null;
    if (Object.keys(COMP_MAP).length && from.startsWith('.')) {
      const rendererRoot = path.dirname(path.dirname(path.resolve(file)));
      const targetAbs = path.resolve(path.dirname(path.resolve(file)), from);
      const relToRoot = path.relative(rendererRoot, targetAbs).split(path.sep).join('/');
      const key = relToRoot + '::' + info.imported;
      const target = COMP_MAP[key];
      // 只有目标 .vue 确实存在时才重定向（避免指向未生成的组件）
      if (target && fs.existsSync(path.join(outDir, target + '.vue'))) redirected = target;
    }
    // 组件在 src/components/，vendor 在同级 src/vendor/ → 需要 ../
    const rel = from.startsWith('../')
      ? '../vendor/' + from.slice(3)                                   // ../chunks/x → ../vendor/chunks/x
      : `../vendor/${srcDirName}/` + from.replace(/^\.\//, '');      // ./x → ../vendor/ui/x
    if (redirected) {
      // → import Foo from './Foo.vue'（同目录）
      byFrom[`__vue__${redirected}`] = byFrom[`__vue__${redirected}`] || [];
      byFrom[`__vue__${redirected}`].push(local);
    } else {
      (byFrom[rel] = byFrom[rel] || []).push(info.imported === local ? local : `${info.imported} as ${local}`);
    }
  }
  // 冲突检测：props 代码里已声明的标识符，不能与 import 别名重名
  const propIds = new Set((c.propsCode.match(/[A-Za-z_$][\w$]*/g) || []));
  let tpl2 = tpl;
  const renamed = new Map();   // 原别名 → 新别名
  for (const local of Object.keys(imports)) {
    if (isRuntime(imports[local].from)) continue;
    if (!propIds.has(local)) continue;
    if (!new RegExp('(?<![\\w$])' + local + '(?![\\w$])').test(tpl2)) continue;
    renamed.set(local, '__' + local);
  }
  // ═══ 方案 B：全程 AST 组装 ═══
  // 先拼字符串、再回头加约束的做法（前几轮的坑）会把冲突检测做成一团正则。
  // 这里把所有语句先建成 AST 节点，在同一个作用域里统一检测/改名，最后一次性 generate。
  const G = require('@babel/generator').default;
  const parseStmts = codeText => {
    try { return P.parse(codeText, { sourceType: 'module' }).program.body; }
    catch (e) { return []; }
  };
  const collectPat = (node, out) => {
    if (!node) return;
    if (t.isIdentifier(node)) { out.push(node.name); return; }
    if (t.isObjectPattern(node)) {
      for (const pr of node.properties) {
        if (t.isObjectProperty(pr)) collectPat(pr.value, out);
        else if (t.isRestElement(pr)) collectPat(pr.argument, out);
      }
      return;
    }
    if (t.isArrayPattern(node)) { for (const el of node.elements) collectPat(el, out); return; }
    if (t.isAssignmentPattern(node)) { collectPat(node.left, out); return; }
    if (t.isRestElement(node)) { collectPat(node.argument, out); return; }
  };
  // 一条语句声明的名字
  const namesOfStmt = st => {
    const out = [];
    if (t.isVariableDeclaration(st)) for (const d of st.declarations) collectPat(d.id, out);
    else if (t.isFunctionDeclaration(st) && st.id) out.push(st.id.name);
    else if (t.isClassDeclaration(st) && st.id) out.push(st.id.name);
    return out;
  };
  // 在单条语句内改名（AST 级，跳过属性 key / 成员访问）
  const renameInStmt = (st, map) => {
    if (!map.size) return;
    const wrapper = t.file(t.program([st]));
    T(wrapper, {
      Identifier(ip) {
        const nm = ip.node.name;
        if (!map.has(nm)) return;
        const par = ip.parentPath;
        if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed && !par.node.shorthand) return;
        if (par.isMemberExpression() && par.node.property === ip.node && !par.node.computed) return;
        ip.node.name = map.get(nm);
      },
    });
  };

  const bodyStmts = [];
  const used = new Set();
  const tplRenames = new Map();   // 模板要同步改的名字
  let counter = 0;
  const uniqueName = base => {
    let nn;
    do { nn = base + '_' + (counter++); } while (used.has(nn));
    return nn;
  };
  // 加入一条语句；与已用名冲突则改名（并把改名记到 tplRenames 供模板同步）
  const pushStmt = st => {
    const declared = namesOfStmt(st);
    const local = new Map();
    for (const nm of declared) {
      if (used.has(nm)) {
        const nn = uniqueName(nm);
        local.set(nm, nn);
        used.add(nn);
        tplRenames.set(nm, nn);
      } else {
        used.add(nm);
      }
    }
    if (local.size) {
      renameInStmt(st, local);
      // 回溯：已 push 的语句里可能有对**旧名**的引用（它们指向本条语句的声明，
      // 例如 render 副作用序列里先出现的 N()，而 N 的声明在后面才被内联）。
      // 不改的话：声明变成 N_10、引用还是 N() → 运行时 "N is not defined"。
      for (const prev of bodyStmts) {
        // 只改「对外的引用」，不改别条语句自己的同名声明（否则会改坏它的局部绑定）
        const own = new Set(namesOfStmt(prev));
        const filtered = new Map([...local].filter(([k]) => !own.has(k)));
        if (filtered.size) renameInStmt(prev, filtered);
      }
    }
    bodyStmts.push(st);
  };
  const pushCode = codeText => {
    for (const st of parseStmts(codeText)) pushStmt(st);
  };

  // ── imports（单独，放最前）──
  let importBlock = '';
  if (vueDeps.length) importBlock += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  for (const [f2, specs] of Object.entries(byFrom)) {
    if (f2.startsWith('__vue__')) {
      importBlock += `import ${specs[0]} from './${f2.slice(7)}.vue';\n`;
      continue;
    }
    const fixed = specs.map(sp => {
      const m = sp.match(/^(.*)\s+as\s+(\w+)$/);
      const name = m ? m[2] : sp;
      if (renamed.has(name)) return (m ? m[1] : sp) + ' as ' + renamed.get(name);
      return sp;
    });
    importBlock += `import { ${fixed.join(', ')} } from '${f2}';\n`;
  }
  for (const [o, n] of renamed) {
    tpl2 = tpl2.replace(new RegExp('(?<![\\w$.])' + o.replace(/\$/g, '\\$') + '(?![\\w$])', 'g'), n);
  }
  // import 里绑定的名字算已占用（避免内联项同名）
  for (const nm of Object.keys(imports)) used.add(nm);

  // 同步模板引用（props 参数改名的情形）
  const usedNames = new Set((tpl2.match(/[A-Za-z_$][\w$]*/g) || []));
  const importLocals = new Set(Object.keys(imports).filter(k => !isRuntime(imports[k].from)));
  if (c.setupParam && (usedNames.has(c.setupParam) || (c.alias && usedNames.has(c.alias)))) {
    let paramName = c.setupParam;
    let aliasName = c.alias;
    if (importLocals.has(paramName) || importLocals.has(aliasName || '')) {
      const propBodyIds = new Set((c.propsCode.match(/[A-Za-z_$][\w$]*/g) || []));
      const replacement = (importLocals.has('props') || propBodyIds.has('props')) ? '__props' : 'props';
      tpl2 = tpl2.replace(new RegExp('(?<![\\w$])' + paramName + '(?![\\w$])', 'g'), replacement);
      if (aliasName) tpl2 = tpl2.replace(new RegExp('(?<![\\w$])' + aliasName + '(?![\\w$])', 'g'), replacement);
      aliasName = null;
      paramName = replacement;
    }
    pushCode(`const ${paramName} = defineProps(${c.propsCode});`);
    if (aliasName && aliasName !== paramName) pushCode(`const ${aliasName} = ${paramName};`);
  }

  // ── 文件级内联 ──
  {
    const importKeys = new Set(Object.keys(imports));
    const others = new Set([...(c.free || [])].filter(nm => nm !== c.setupParam && nm !== c.alias));
    for (const d of resolveDeps(others, importKeys)) {
      pushCode(d.kind === 'function' ? d.code : `${d.kind} ${d.code};`);
    }
  }

  // ── setup 内联 ──
  {
    const setupDefs = new Map();
    if (c.innerDefs) for (const [k, v] of c.innerDefs) setupDefs.set(k, { code: v.code, start: v.start, kind: 'raw' });
    for (const [k, v] of collectSetupDefs(c.setupNode)) if (!setupDefs.has(k)) setupDefs.set(k, v);
    for (const d of collectRenderLocals(c.setupNode)) {
      if (!setupDefs.has(d.name)) setupDefs.set(d.name, { code: d.code, start: d.start, kind: 'raw' });
    }
    if (setupDefs.size) {
      const tplIds = new Set(tpl2.match(/[A-Za-z_$][\w$]*/g) || []);
      // skip 只能放「实际会生成 import 的名字」——用 byFrom 而不是 Object.keys(imports)。
      // 否则：某符号是 import 的、但模板没用到（不会生成 import），
      // 却因为被 skip 挡住而不参与内联 → 悬空引用。
      const actuallyImported = new Set();
      for (const specs of Object.values(byFrom)) {
        for (const sp of specs) {
          const m = sp.match(/\s+as\s+([A-Za-z_$][\w$]*)$/);
          actuallyImported.add(m ? m[1] : sp);
        }
      }
      const skip = new Set([
        ...actuallyImported, c.setupParam, c.alias,
        'defineProps', 'defineEmits', 'defineExpose', 'undefined', 'true', 'false', 'null', 'Math', 'JSON',
      ].filter(Boolean));
      // 迭代到不动点：模板直接引用的只是种子；内联代码新引用的符号也必须继续带出，
      // 否则运行时报 "X is not defined"（它们既不在模板里、也不在 import 里）。
      const seed = new Set([...tplIds].filter(nm => setupDefs.has(nm) && !skip.has(nm)));
      // 用 AST 提取一段代码里引用到的标识符（比正则准）
      const freeIdsOf = codeText => {
        const out = new Set();
        let nodes = parseStmts(codeText);
        if (!nodes.length) {
          // 降级 1：包进函数体 —— 裸 `return ...` 片段在 module 顶层会报
          // "'return' outside of function"，导致这里静默返回空集、漏掉它引用的所有符号。
          nodes = parseStmts('function __wrap(){' + codeText + '\n}');
          if (nodes.length) {
            const wrapper = t.file(t.program(nodes.map(nd => t.cloneNode(nd, true, true))));
            T(wrapper, {
              Identifier(ip) {
                if (!ip.isReferencedIdentifier()) return;
                const nm = ip.node.name;
                if (nm === '__wrap') return;
                if (ip.scope.hasBinding(nm)) return;
                out.add(nm);
              },
            });
            return out;
          }
          // 降级 2：正则兜底，宁可多收不可漏收
          for (const m of codeText.matchAll(/(?<![\w$.])([A-Za-z_$][\w$]*)(?![\w$])/g)) out.add(m[1]);
          return out;
        }
        const wrapper = t.file(t.program(nodes.map(nd => t.cloneNode(nd, true, true))));
        T(wrapper, {
          Identifier(ip) {
            if (!ip.isReferencedIdentifier()) return;
            const nm = ip.node.name;
            if (ip.scope.hasBinding(nm)) return;
            out.add(nm);
          },
        });
        return out;
      };

      const chosen = new Map();     // name -> def
      const seenCode = new Set();
      let frontier = new Set(seed);
      let guard = 0;
      while (frontier.size && guard++ < 8) {
        const next = new Set();
        for (const nm of frontier) {
          if (chosen.has(nm) || skip.has(nm)) continue;
          const def = setupDefs.get(nm);
          if (!def) continue;
          chosen.set(nm, def);
          // 这条定义自己的引用 → 下一轮 frontier
          for (const r of freeIdsOf(def.code)) {
            if (!chosen.has(r) && !skip.has(r) && setupDefs.has(r)) next.add(r);
          }
        }
        frontier = next;
      }
      // ── 兜底扫描：对「已 push 的全部语句」做闭包收敛 ──
      // 种子只来自模板，覆盖不到「render 副作用序列」这类被保留下来的代码。
      // 这里扫整段已生成语句的自由标识符，把还没绑定、但在 setupDefs 里的名字补齐，
      // 循环到集合不再增长（不动点）。
      {
        let prev = -1;
        let g2 = 0;
        while (chosen.size !== prev && g2++ < 8) {
          prev = chosen.size;
          const bodyText = bodyStmts.map(st => {
            try { return G(st, { compact: true, jsescOption: { minimal: true } }).code; }
            catch (e) { return ''; }
          }).join('\n');
          if (!bodyText) break;
          for (const nm of freeIdsOf(bodyText)) {
            if (chosen.has(nm) || skip.has(nm)) continue;
            const def = setupDefs.get(nm);
            if (def) chosen.set(nm, def);
          }
        }
      }
      // 按源码顺序输出并去重
      const ordered = [...chosen.values()].sort((a, b) => (a.start || 0) - (b.start || 0));
      for (const d of ordered) {
        if (seenCode.has(d.code)) continue;
        seenCode.add(d.code);
        pushCode(d.kind === 'function' || d.kind === 'raw' ? d.code : `${d.kind} ${d.code};`);
      }
    }
  }

  // 模板同步改名（内联冲突时）
  for (const [o, n] of tplRenames) {
    tpl2 = tpl2.replace(new RegExp('(?<![\\w$.])' + o.replace(/\$/g, '\\$') + '(?![\\w$])', 'g'), n);
  }

  const bodyCode = bodyStmts.map(st => {
    try { return G(st, { compact: false, jsescOption: { minimal: true } }).code; }
    catch (e) { return ''; }
  }).filter(Boolean).join('\n');
  const script = importBlock + (bodyCode ? '\n' + bodyCode + '\n' : '');

  fs.writeFileSync(path.join(outDir, `${c.name}.vue`),
    `<template>\n${tpl2}\n</template>\n\n<script setup>\n${script}</script>\n`);
  made++;
}
console.error(`${path.basename(file)}: ${made} 个组件`);
