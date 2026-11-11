#!/usr/bin/env node
// main bundle → 可构建 Vue 工程
//
// 结构：分析 → 生成（严格两段，不交叉依赖）
//   阶段 A：解析 main.js，产出纯数据（组件清单 / 顶层语句 / import 表 / 符号用途）
//   阶段 B：先写组件 .vue，再写 shared.js（因为 shared 要 import 组件）
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const P = require('@babel/parser');
const T = require('@babel/traverse').default;
const t = require('@babel/types');
const G = require('@babel/generator').default;

const [,, mainFile, convPath, outDir] = process.argv;

// ═══════════════════════════════════════════════════════════
// 常量
// ═══════════════════════════════════════════════════════════
const VUE_API_MAP = {
  '$n':'normalizeClass','An':'unref','Ct':'renderSlot','O':'createTextVNode','S':'createElementBlock',
  'St':'renderList','Wt':'watch','b':'createBlock','c':'Fragment','gt':'openBlock','j':'defineComponent',
  'mt':'onUnmounted','ot':'onMounted','rr':'toDisplayString','ut':'onBeforeMount','v':'computed',
  'x':'createCommentVNode','y':'createElementVNode','H':'createElementVNode','D':'createStaticVNode',
  'A':'defineAsyncComponent','Bn':'isArray',
};
const VUE_APIS = new Set(['openBlock','createElementBlock','createElementVNode','createBlock','createVNode',
  'createTextVNode','createCommentVNode','createStaticVNode','renderSlot','renderList','normalizeClass',
  'toDisplayString','unref','withCtx','withDirectives','defineComponent','resolveComponent','Fragment',
  'computed','watch','onMounted','onUnmounted','onBeforeMount','isArray','defineAsyncComponent','ref',
  'reactive','nextTick','inject','provide','h','toRef','toRefs','shallowRef','triggerRef']);
// 外部全局：不计入"未定义"（浏览器/AMD/CommonJS）
const EXTERNALS = new Set(['window','document','console','performance','URL','localStorage',
  'sessionStorage','clearTimeout','setTimeout','clearInterval','setInterval','crypto',
  'requestAnimationFrame','cancelAnimationFrame','queueMicrotask','structuredClone',
  'IntersectionObserver','ResizeObserver','MutationObserver','navigator','location','history',
  'screen','fetch','XMLHttpRequest','WebSocket','Worker','Element','Node','Event','CustomEvent',
  'Promise','Symbol','Map','Set','WeakMap','WeakSet','Array','Object','String','Number','Boolean',
  'Date','RegExp','Error','JSON','Math','Intl','Buffer','process','require','module','exports',
  'globalThis','undefined','NaN','Infinity','parseInt','parseFloat','isNaN','isFinite',
  'encodeURIComponent','decodeURIComponent','encodeURI','decodeURI','alert','prompt','atob','btoa',
  'TextEncoder','TextDecoder','Blob','File','FileReader','FormData','URLSearchParams',
  'AbortController','AbortSignal','matchMedia','getComputedStyle','Image','Audio','Video',
  'HTMLElement','SVGElement','EventTarget','Storage','Cache','OffscreenCanvas','Request','Response',
  'PerformanceObserver','HTMLIFrameElement','HTMLVideoElement','HTMLCanvasElement','HTMLTextAreaElement',
  'HTMLInputElement','HTMLSelectElement','HTMLImageElement','HTMLBRElement','SVGImageElement',
  'DOMException','DOMRect','DOMTokenList','CSSRule','CSSStyleSheet','DOMParser','XMLSerializer',
  'PointerEvent','MouseEvent','KeyboardEvent','TouchEvent','DragEvent','ClipboardEvent','WheelEvent',
  'createImageBitmap','Headers','RequestInit','define','WebGLRenderingContext','MediaStream',
  'FileSystemHandle','IdleDeadline','TrustedHTML','TrustedScriptURL','trustedTypes']);

// ═══════════════════════════════════════════════════════════
// 阶段 A：分析
// ═══════════════════════════════════════════════════════════
const src = fs.readFileSync(mainFile, 'utf8');
const ast = P.parse(src, { sourceType: 'unambiguous' });

const isDefineComponent = name => (VUE_API_MAP[name] || (VUE_APIS.has(name) ? name : null)) === 'defineComponent';

// A1) 组件区间
const compRanges = [];
T(ast, {
  CallExpression(p) {
    const c = p.node.callee;
    if (!t.isIdentifier(c) || !isDefineComponent(c.name)) return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    const hasName = arg.properties.some(pr => t.isObjectProperty(pr) &&
      ((t.isIdentifier(pr.key) && pr.key.name === '__name') ||
       (t.isStringLiteral(pr.key) && pr.key.value === '__name')));
    if (hasName) compRanges.push([p.node.start, p.node.end]);
  },
});
const inComp = (s, e) => compRanges.some(([a, b]) => s < b && e > a);

// A2) import 表
const importMap = {};
T(ast, {
  ImportDeclaration(p) {
    const from = p.node.source.value;
    for (const sp of p.node.specifiers) {
      if (t.isImportSpecifier(sp) && t.isIdentifier(sp.local) && t.isIdentifier(sp.imported)) {
        importMap[sp.local.name] = { imported: sp.imported.name, from };
      } else if (t.isImportDefaultSpecifier(sp) && t.isIdentifier(sp.local)) {
        importMap[sp.local.name] = { imported: 'default', from };
      }
    }
  },
});

// A3) 收集顶层语句（按原位置，保持顺序）
const topUnits = [];   // { start, kind, code?, declarators?, exprNode?, fnName? }
const compVarNames = new Set();
const compVarToName = new Map();

function nameOfComponent(node) {
  // 在 defineComponent({...}) 或其外层包装（_export_sfc / _X）里找 __name
  let found = null;
  const walk = n => {
    if (!n || found) return;
    if (t.isCallExpression(n)) {
      for (const a of n.arguments) {
        if (t.isObjectExpression(a)) {
          for (const pr of a.properties) {
            if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: '__name' })) {
              const v = pr.value;
              found = t.isStringLiteral(v) ? v.value
                : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
              if (found) return;
            }
          }
        }
        walk(a);
      }
    }
  };
  walk(node);
  return found;
}

T(ast, {
  VariableDeclaration(p) {
    if (!p.parentPath.isProgram()) return;
    const decls = p.node.declarations;
    const normal = [];
    for (const d of decls) {
      if (inComp(d.start, d.end)) {
        if (t.isIdentifier(d.id)) {
          compVarNames.add(d.id.name);
          const nm = nameOfComponent(d.init);
          if (nm) compVarToName.set(d.id.name, nm);
        }
      } else {
        normal.push(d);
      }
    }
    if (normal.length) topUnits.push({ start: p.node.start, kind: 'var', declarators: normal, varKind: p.node.kind });
  },
  FunctionDeclaration(p) {
    if (!p.parentPath.isProgram() || !p.node.id) return;
    if (inComp(p.node.start, p.node.end)) return;
    topUnits.push({ start: p.node.start, kind: 'func', code: src.slice(p.node.start, p.node.end) });
  },
  ExpressionStatement(p) {
    if (!p.parentPath.isProgram()) return;
    if (inComp(p.node.start, p.node.end)) return;
    // 排除 X.install = ...（原应用的全局组件注册；还原成 .vue 后不需要，
    // 且它会在 shared.js 顶层立即执行，与组件形成循环依赖 → TDZ 错误）
    const t2 = p.node.expression;
    if (t2 && t2.type === 'AssignmentExpression' && t2.left.type === 'MemberExpression'
        && !t2.left.computed && t2.left.property && t2.left.property.name === 'install') {
      return;
    }
    topUnits.push({ start: p.node.start, kind: 'expr', code: src.slice(p.node.start, p.node.end) });
  },
});
topUnits.sort((a, b) => a.start - b.start);

// A4) 符号分类：本地声明 vs cross-chunk import vs Vue API
const localNames = new Set();
for (const u of topUnits) {
  if (u.kind === 'var') for (const d of u.declarators) if (t.isIdentifier(d.id)) localNames.add(d.id.name);
  else if (u.kind === 'func') localNames.add(/function\s+([\w$]+)/.exec(u.code)?.[1]);
}
const crossList = [];
for (const [local, info] of Object.entries(importMap)) {
  if (VUE_APIS.has(local)) continue;                                  // Vue 语义名 → __vue
  const isRT = /vue-i18n\.runtime/.test(info.from || '');
  if (isRT && (VUE_API_MAP[info.imported] || VUE_APIS.has(info.imported))) continue;  // 运行时 API → __vue
  let rel = info.from || '';
  if (rel.startsWith('../')) rel = './vendor/' + rel.slice(3);
  else if (rel.startsWith('./')) rel = './vendor/chunks/' + rel.slice(2);
  else rel = './vendor/' + rel;
  crossList.push({ local, imported: info.imported, from: rel, inner: 'src_' + local, exported: 'S_' + local });
}
const crossByLocal = new Map(crossList.map(c => [c.local, c]));

// A5) 组件清单
const components = [];
T(ast, {
  CallExpression(p) {
    if (!compRanges.some(([a, b]) => p.node.start >= a && p.node.end <= b)) return;
    const c = p.node.callee;
    if (!t.isIdentifier(c) || !isDefineComponent(c.name)) return;
    const arg = p.node.arguments[0];
    if (!arg || !t.isObjectExpression(arg)) return;
    let name = null;
    for (const pr of arg.properties) {
      if (t.isObjectProperty(pr) && t.isIdentifier(pr.key, { name: '__name' })) {
        const v = pr.value;
        name = t.isStringLiteral(v) ? v.value
          : (t.isTemplateLiteral(v) && v.expressions.length === 0 ? v.quasis[0].value.cooked : null);
      }
    }
    if (name) {
      // 组件定义之后可能紧跟 [[__scopeId, `data-v-xxx`]]
      const tail = src.slice(p.node.end, Math.min(src.length, p.node.end + 220));
      const sm = tail.match(/__scopeId`?\s*,\s*[`'"](data-v-[0-9a-f]{8})[`'"]/);
      components.push({ name, start: arg.start, end: arg.end, objStart: arg.start, objEnd: arg.end,
                        scopeId: sm ? sm[1] : null });
    }
  },
});

// A6) vendor 路径索引
const rendererRoot = path.dirname(path.dirname(mainFile));
const baseIndex = {};
(function walk(d, rel) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p2 = path.join(d, e.name), r2 = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walk(p2, r2);
    else baseIndex[e.name] = './vendor/' + r2;
  }
})(rendererRoot, '');

// A6.5) 收集 CSS 里各 scopeId 的样式规则（用于恢复 scoped CSS）
const cssByScope = new Map();   // scopeId -> 规则文本
try {
  const cssDir = path.join(rendererRoot, 'styles');
  if (fs.existsSync(cssDir)) {
    for (const f of fs.readdirSync(cssDir).filter(x => x.endsWith('.css'))) {
      const css = fs.readFileSync(path.join(cssDir, f), 'utf8');
      // 按 scopeId 切分：匹配 [data-v-xxx] 开头的规则块（含嵌套媒体查询时保守处理）
      const re = /\[data-v-([0-9a-f]{8})\]([^{]*?)\{([^{}]*)\}/g;
      let m;
      while ((m = re.exec(css)) !== null) {
        const id = 'data-v-' + m[1];
        const rule = `[${id}]${m[2]}{${m[3]}}`;
        if (!cssByScope.has(id)) cssByScope.set(id, []);
        cssByScope.get(id).push(rule);
      }
    }
  }
} catch (e) { console.error('  CSS 提取失败:', String(e.message).slice(0, 50)); }
console.error('CSS scopeId 数:', cssByScope.size, '| 规则总数:', [...cssByScope.values()].reduce((a, b) => a + b.length, 0));

// A6.6) 收集所有 CSS 变量定义（组件的 scoped 规则依赖它们）
const varDefs = new Map();   // varName -> 值
try {
  const cssFiles = [];
  (function walkCss(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p2 = path.join(d, e.name);
      if (e.isDirectory()) walkCss(p2);
      else if (e.name.endsWith('.css')) cssFiles.push(p2);
    }
  })(rendererRoot);
  for (const f of cssFiles) {
    const css = fs.readFileSync(f, 'utf8');
    // 匹配 --name: value;（宽松匹配值，直到分号或右括号）
    for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
      if (!varDefs.has(m[1])) varDefs.set(m[1], m[2].trim());
    }
  }
} catch (e) { console.error('  变量提取失败:', String(e.message).slice(0, 50)); }
console.error('CSS 变量:', varDefs.size);

// A7) 统一导出清单（组件 import 与 shared export 共用，避免不一致）
const exportSet = new Map();   // 原名 -> S_原名
for (const n of localNames) if (n) exportSet.set(n, 'S_' + n);
for (const c of crossList) if (!exportSet.has(c.local)) exportSet.set(c.local, c.exported);

// ═══════════════════════════════════════════════════════════
// 阶段 B：生成
// ═══════════════════════════════════════════════════════════
fs.mkdirSync(outDir + '/src/components', { recursive: true });
fs.mkdirSync(outDir + '/src/vendor', { recursive: true });
fs.writeFileSync(outDir + '/src/vendor/_removed.js', 'export default {};\n');
// 公共样式变量（组件 scoped 规则依赖）
try {
  fs.mkdirSync(outDir + '/src/styles', { recursive: true });
  const varLines = [...varDefs.entries()].map(([k, v]) => `  ${k}: ${v};`).join('\n');
  fs.writeFileSync(outDir + '/src/styles/variables.css',
    `/* 从原应用 CSS 提取的自定义属性（${varDefs.size} 个）\n   还原组件的 scoped 规则依赖这些变量 */\n:root {\n${varLines}\n}\n`);
} catch (e) {}

// B1) 先写组件（shared.js 要 import 它们）
// 两遍：Pass1 只算模板（确定哪些能生成），Pass2 再写 .vue（import 只引用成功生成的）
const madeComponents = new Set();
let placeholderCount = 0;
const tplMap = new Map();   // compName -> template
const seen = new Set();
for (const c of components) {
  if (seen.has(c.name)) continue;
  seen.add(c.name);
  const tmp = '/tmp/_cmp_' + c.name.replace(/[^\w]/g, '_') + '.js';
  fs.writeFileSync(tmp, 'var __c = ' + src.slice(c.start, c.end) + ';\nexport default {};\n');
  let tpl = '';
  try { tpl = execFileSync('node', [convPath, tmp], { encoding: 'utf8' }).trim(); } catch (e) {}
  if (!tpl) continue;
  tplMap.set(c.name, tpl);
  madeComponents.add(c.name);
}

// Pass2：写 .vue
for (const [compName, tpl] of tplMap) {
  const need = [];
  for (const [varName, cn] of compVarToName) {
    if (!madeComponents.has(cn)) continue;                    // 只引用已生成的
    if (new RegExp('(?<![\\w$])' + varName.replace(/\$/g, '\\$') + '(?![\\w$])').test(tpl)) {
      need.push({ from: cn, alias: varName });
    }
  }
  const vueDeps = [...VUE_APIS].filter(a => new RegExp('(?<![\\w$])' + a + '\\s*\\(').test(tpl));
  let script = '';
  if (vueDeps.length) script += `import { ${[...new Set(vueDeps)].join(', ')} } from 'vue';\n`;
  for (const n of new Map(need.map(x => [x.from, x])).values()) {
    script += `import ${n.alias} from './${n.from}.vue';\n`;
  }
  // props 绑定：模板表达式用的是原 setup 参数名与别名（如 e / t），必须在这里建立绑定
  const compSrc = src.slice(components.find(x => x.name === compName).objStart,
                            components.find(x => x.name === compName).objEnd);
  const setupM = compSrc.match(/setup\s*\(\s*([\w$]+)/);
  const propsArg = setupM ? setupM[1] : null;
  const aliasM = compSrc.match(/let\s+([\w$]+)\s*=\s*([\w$]+)\s*[,;]/);
  const propsAlias = (aliasM && propsArg && aliasM[2] === propsArg) ? aliasM[1] : null;
  const propsM = compSrc.match(/props\s*:\s*(\{[\s\S]*?\})\s*,\s*(?:emits|setup)/);
  const propsCode = propsM ? propsM[1] : '{}';
  const usedInTpl = new Set(tpl.match(/[A-Za-z_$][\w$]*/g) || []);
  if (propsArg && (usedInTpl.has(propsArg) || (propsAlias && usedInTpl.has(propsAlias)))) {
    script += `const ${propsArg} = defineProps(${propsCode});\n`;
    if (propsAlias && propsAlias !== propsArg) script += `const ${propsAlias} = ${propsArg};\n`;
  }
  // shared 符号 import：只取 exportSet 里有的，且排除已被 props 绑定 / 组件 import 占用的名字
  const occupied = new Set([propsArg, propsAlias].filter(Boolean));
  for (const n2 of need) occupied.add(n2.alias);
  // 检查范围：模板 + props 代码（props 默认值里会引用 shared 符号，如 default: Rl）
  const scanText = tpl + '\n' + (propsCode || '');
  const sharedSpecs = [];
  for (const [orig, exported] of exportSet) {
    if (occupied.has(orig)) continue;
    if (!new RegExp('(?<![\\w$])' + orig.replace(/\$/g, '\\$') + '(?![\\w$])').test(scanText)) continue;
    sharedSpecs.push(exported === orig ? orig : `${exported} as ${orig}`);
  }
  if (sharedSpecs.length) {
    // shared import 必须在最前（ESM 位置要求），因此前置到 script
    script = script.replace(/^/, '');   // 占位
    const sharedImport = `import { ${[...new Set(sharedSpecs)].join(', ')} } from '../shared.js';\n`;
    // 插到所有 import 之后、第一个 const 之前
    const idx = script.search(/^const /m);
    script = idx >= 0 ? script.slice(0, idx) + sharedImport + script.slice(idx) : script + sharedImport;
  }
  // scoped CSS：恢复该组件的 [data-v-xxx] 规则（用普通 <style>，因为选择器已带前缀）
  const compInfo = components.find(x => x.name === compName);
  const sid = compInfo ? compInfo.scopeId : null;
  const cssRules = sid && cssByScope.has(sid) ? cssByScope.get(sid) : null;
  const styleBlock = cssRules && cssRules.length
    ? `\n<style>\n/* 从原应用 CSS 恢复（${sid}） */\n${cssRules.join('\n')}\n</style>\n`
    : '';
  // 模板根元素加 scopeId 属性，让 [data-v-xxx] 选择器生效
  let tpl2 = tpl;
  if (sid) {
    tpl2 = tpl.replace(/^<([a-z][\w-]*)/, `<$1 ${sid}`);
  }
  fs.writeFileSync(`${outDir}/src/components/${compName}.vue`,
    `<template>\n${tpl2}\n</template>\n\n<script setup>\n${script}</script>\n${styleBlock}`);
}

// B2) 生成 shared.js 的 body（AST 级改写，按原位置排序）
function buildSharedBody() {
  const codes = [];
  for (const u of topUnits) {
    if (u.kind === 'var') {
      codes.push({ start: u.start, code: G(t.variableDeclaration(u.varKind, u.declarators.map(d => t.cloneNode(d, true, true))), { compact: false, comments: true, jsescOption: { minimal: true } }).code });
    } else {
      codes.push({ start: u.start, code: u.code });
    }
  }
  let body = codes.map(c => c.code).join('\n\n');

  // B2a) Vue API 引用 → __vue.xxx
  let ast2 = P.parse(body, { sourceType: 'module' });
  let vueN = 0;
  T(ast2, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      if (nm === '__vue' || localNames.has(nm)) return;
      if (ip.scope.hasBinding(nm)) return;
      const info = importMap[nm];
      if (!info || !/vue-i18n\.runtime/.test(info.from || '')) return;
      const sem = VUE_API_MAP[info.imported] || (VUE_APIS.has(info.imported) ? info.imported : null) || (VUE_APIS.has(nm) ? nm : null);
      if (!sem) return;
      const par = ip.parentPath;
      if ((par.isMemberExpression() || par.isOptionalMemberExpression()) && par.node.property === ip.node && !par.node.computed) return;
      if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed) return;
      if (par.isVariableDeclarator() && par.node.id === ip.node) return;
      ip.replaceWith(t.memberExpression(t.identifier('__vue'), t.identifier(sem)));
      vueN++;
    },
  });
  if (vueN) body = G(ast2, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  // B2b) cross-chunk 引用 → src_xxx
  let ast3 = P.parse(body, { sourceType: 'module' });
  let crossN = 0;
  T(ast3, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      const c = crossByLocal.get(nm);
      if (!c || localNames.has(nm)) return;
      const b = ip.scope.getBinding(nm);
      if (b && !b.path.isImportSpecifier() && !b.path.isImportDefaultSpecifier()) return;
      const par = ip.parentPath;
      if (par.isVariableDeclarator() && par.node.id === ip.node) return;
      if (par.isObjectProperty() && par.node.key === ip.node && !par.node.computed) return;
      if ((par.isMemberExpression() || par.isOptionalMemberExpression()) && par.node.property === ip.node && !par.node.computed) return;
      ip.replaceWith(t.identifier(c.inner));
      crossN++;
    },
  });
  if (crossN) body = G(ast3, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  // B2c) 路径重写（AST 级，只动字符串）
  let ast4 = P.parse(body, { sourceType: 'module' });
  let fixN = 0, deadN = 0;
  const fix = val => {
    if (typeof val !== 'string' || !/^\.\.?\/[^"'`]+\.(js|css|webp|png|jpg|ico|ogg)$/.test(val)) return null;
    const hit = baseIndex[val.split('/').pop()];
    if (hit) { fixN++; return hit; }
    deadN++; return './vendor/_removed.js';
  };
  T(ast4, {
    StringLiteral(p) { const nv = fix(p.node.value); if (nv !== null) p.node.value = nv; },
    TemplateLiteral(p) {
      if (p.node.expressions.length) return;
      const q = p.node.quasis[0];
      const nv = fix(q.value.cooked);
      if (nv !== null) { q.value.cooked = nv; q.value.raw = nv; }
    },
  });
  if (fixN || deadN) body = G(ast4, { compact: false, comments: true, jsescOption: { minimal: true } }).code;

  return { body, vueN, crossN, fixN, deadN };
}

const { body, vueN, crossN, fixN, deadN } = buildSharedBody();

// B2.5) 为「body 里被引用但组件未生成」的组件补占位 .vue（避免悬空引用）
const bodyText = body;
for (const [varName, compName] of compVarToName) {
  if (madeComponents.has(compName)) continue;
  if (!new RegExp('(?<![\\w$])' + varName.replace(/\$/g, '\\$') + '(?![\\w$])').test(bodyText)) continue;
  fs.writeFileSync(`${outDir}/src/components/${compName}.vue`,
    `<template>\n<div />\n</template>\n\n<script setup>\n// 占位：该组件的原始 render 无法自动还原（renderless 或特殊形态）\ndefineProps({});\n</script>\n`);
  madeComponents.add(compName);
  placeholderCount++;
}
if (placeholderCount) console.error(`占位组件: ${placeholderCount}`);

// B3) 组装 shared.js
const compImports = [];
for (const [varName, compName] of compVarToName) {
  if (!madeComponents.has(compName)) continue;
  if (!new RegExp('(?<![\\w$])' + varName.replace(/\$/g, '\\$') + '(?![\\w$])').test(body)) continue;
  compImports.push(`import ${varName} from './components/${compName}.vue';`);
}
const crossImports = crossList.map(c => {
  const spec = c.imported === 'default' ? `default as ${c.inner}`
    : (c.imported === c.inner ? c.inner : `${c.imported} as ${c.inner}`);
  return `import { ${spec} } from '${c.from}';`;
});
const exportLines = [];
for (const n of localNames) if (n) exportLines.push(`export { ${n} as S_${n} };`);
for (const c of crossList) if (!localNames.has(c.local)) exportLines.push(`export { ${c.inner} as ${c.exported} };`);
for (const [varName, compName] of compVarToName) {
  if (madeComponents.has(compName) && compImports.some(l => l.includes(` ${varName} `))) {
    exportLines.push(`export { ${varName} as S_${varName} };`);
  }
}

const sharedCode = `// 自动生成：main bundle 共享符号
// 本地声明 ${localNames.size} | 跨 chunk ${crossList.length} | 组件 ${compImports.length}
import * as __vue from 'vue';
${compImports.join('\n')}
${crossImports.join('\n')}

${body}

${[...new Set(exportLines)].join('\n')}
`;
fs.writeFileSync(outDir + '/src/shared.js', sharedCode);

// B4) 未定义符号自检（排除外部全局）
try {
  const chk = P.parse(sharedCode, { sourceType: 'module', allowUndeclaredExports: true });
  const undef = new Map();
  T(chk, {
    Identifier(ip) {
      if (!ip.isReferencedIdentifier()) return;
      const nm = ip.node.name;
      if (nm === '__vue' || EXTERNALS.has(nm)) return;
      if (ip.scope.hasBinding(nm)) return;
      undef.set(nm, (undef.get(nm) || 0) + 1);
    },
  });
  const list = [...undef.entries()].sort((a, b) => b[1] - a[1]);
  console.error(`未定义（排除外部全局）: ${list.length}${list.length ? ' → ' + list.slice(0, 10).map(([k, v]) => k + '(' + v + ')').join(', ') : ''}`);
} catch (e) {
  console.error('自检解析失败:', String(e.message).slice(0, 80));
}

console.error(`shared.js ${(sharedCode.length / 1024 / 1024).toFixed(1)}MB | 本地 ${localNames.size} | cross ${crossList.length} | 组件import ${compImports.length} | Vue改写 ${vueN} | cross改写 ${crossN} | 路径 ${fixN}+${deadN}死 | 生成组件 ${madeComponents.size}`);
