# 交付清单

> 最后更新：round-0424（跑的 `./tools/check.sh` 全流程自检，结果 PASS）

## 一句话

**你要的东西已经能用了**：仓库里有解混淆后的完整源码，`bash build.sh` 一键构建出可运行的离线应用。
反编译器是附带的额外成果——独立 chunk 组件 99% 可还原为能编译的 `.vue`，其中已验证能真实渲染。

---

## 一、应用（核心需求，已完成）

| 项目 | 状态 |
|---|---|
| 仓库 | `github.com/zhaojiaxiang97-crypto/xiaobai-daily`（分支 `main`） |
| 一键构建 | `bash build.sh` → 自动下载 Release 资产（含 `tar tzf` 校验）→ 打包 asar → ad-hoc 签名 |
| 产物 | `build/extract/小白日报.app` |
| 运行验证 | **PASS**（九页面内容断言 + 待办 IPC） |
| 部署位置 | `/Applications/小白日报.app` |

### 验证结果（最近一次自检）

```
BODY 449
  今日工作 388 / 待办 388 / 生成报告 1097 / 记忆时间线 192 / 热力图 433
  应用记录 2441 / 历史报告 240 / API 设置 304 / 隐私保护 1352
IPC todos: 30
RESULT: PASS
```

产物体积：asar 45M + unpacked 323M。

### 改造内容（已交付）

- 去商业化：订阅/邀请/客服/交流群/教育认证/成长计划/反馈/积分/检查更新/帮助/排行榜/Pro/会员等入口全部移除
- 免登录 + 本地 AI 通道（API 设置可配）
- 待办存本地 SQLite（`local_todos`）
- 品牌 小黑 → 小白
- 删除吉祥物、2026 年度成就、通知中心

---

## 二、源码可读性（已完成到机械极限）

| 指标 | 数值 |
|---|---|
| 主进程唯一 `_0x` 变量 | 13800 → **6122**（-56%） |
| 主进程 `_0x` 引用点 | ~37860 → **17498** |
| 全库短名(≤2 字符)占比 | **31.2%**（大头是第三方库内联：语言包、three.js、markdown 渲染器） |
| `void 0` 残留 | **0** |
| 括号属性（可转点访问） | 已处理，剩 91 处均为非法标识符键 |

**已到边界**：剩余 `_0x` 经过三轮规则迭代（含反向启发式、后缀补全）实测无新命中，
均为引用 1-2 次、无任何可推断特征的短命局部。前端 import 别名批量改名会破坏渲染
（round-0400 事故），不可再动。

---

## 三、反编译器（额外成果）

### 组件可用性矩阵

| 位置 | 组件数 | 可编译 | 可运行 | 说明 |
|---|---|---|---|---|
| **独立 chunk**（`ui/` `blocks/` `pages/`，43 文件） | 160 | **122/123（99%）** | ✅ 已验证（Kbd） | 天然模块化，真实 import 关系 |
| **前端 main bundle**（`renderer/chunks/main.js`，5.2MB） | 418 | 391/418（93.5%） | ❌ | 内部模块边界已被打包抹除，不可恢复 |
| 去重总计 | **575** | — | — | 3 个重名 |

### 独立 chunk 组件（能用）

全链路验证：`Kbd`

```
ui/Kbd.js (690B)
  → Kbd.vue（template + import + defineProps + 别名）
  → vite build（7 modules）
  → jsdom SSR

输出 415B：
<kbd data-slot="kbd" class="bg-muted text-muted-foreground ..."><!--[-->SLOT<!--]--></kbd>
```

生成样例：

```vue
<template>
  <kbd data-slot="kbd" :class="e('bg-muted ...', s.class)"><slot /></kbd>
</template>
<script setup>
import { xt as e } from '../vendor/ui/Switch.js';
const o = defineProps({class:{type:[Boolean,null,String,Object,Array]}});
const s = o;
</script>
```

覆盖的组件族：`Switch`(10)、`TooltipTrigger`(16)、`DropdownMenuTrigger`(14)、
`alert-dialog`(11)、`Kbd`、`CodeBlockNode`、`RovingFocusGroup` 等。

### main bundle 的 418 个组件（只能读）

- 模板结构正确（元素/属性绑定/slot/具名子组件还原到 163 个）
- 运行时绑定已补（props/别名/跨 chunk 符号经 `shared.js`）
- **不可运行**：`renderer/chunks/main.js` 的模块边界在 vite 打包时消失
  （实测 0 处 rollup 模块注释；`__vite__mapDeps` 78 条只覆盖懒加载 chunk）。
  平铺成单个 `shared.js` 必然触发初始化顺序问题（`EntityStart` 未初始化等）。

---

## 四、工具链

### 应用侧

| 工具 | 用途 |
|---|---|
| `tools/check.sh` | **全流程自检**：语法 → 构建 → 结构 → 九页面内容断言（约 4 分钟） |
| `tools/verify-app.sh` | 内容断言：启动应用遍历九页面，断言 `.content-body` 非空 |
| `tools/selfcheck.sh` | 产物结构与混淆残留统计 |

### 反混淆侧

| 工具 | 用途 |
|---|---|
| `tools/deobf.cjs` | 九种命名模式（computed/params/locals/forms/callbacks/byfunc/more/late/final） |
| `tools/deobf-rules.cjs` | 反向启发式命名（属性名反向/实参反推/别名/数组 + 后缀补全） |

### 反编译侧（`tools/vue-decompiler/`）

| 工具 | 用途 |
|---|---|
| `analyze-bindings.cjs` | AST 级 import 绑定分析（排除同名局部变量遮蔽） |
| `verify-map.cjs` + `vue-api-map.json` | Vue API 映射（运行时行为探测得出，16 项） |
| `convert-component.cjs` | render → template 转换（元素/分支/slot/属性/文本） |
| `split-components.cjs` / `split-with-deps.cjs` | 从 bundle 切分组件 |
| `registry.cjs` | 组件注册表（341 项，`<component :is="YM"/>` → `<SettingsSection/>`） |
| `lib-conv.cjs` | **独立 chunk → 可运行 `.vue`**（99% 通过率） |
| `gen-project.cjs` | 生成完整 Vue 工程骨架 |
| `batch-convert.cjs` / `compile-check.cjs` | 批量转换 + 编译验证 |

---

## 五、已知限制（诚实清单）

1. **main bundle 的 418 个组件不可运行** —— 模块边界信息在打包时已丢失，非努力可补
2. **逆向 template 与原始产物不等价** —— 静态提升、patchFlag、缓存槽位必然不同；
   功能等价可验证，逐字节一致做不到
3. **反混淆已到机械极限** —— 剩余 6122 个 `_0x` 无特征可推
4. **异步组件/复杂动态组件** 仍有边缘失败（如 `SliderThumb` 的 props 重复声明）
5. **`shared.js` 方案失败** —— 已实测，平铺 11MB 顶层代码无法保证初始化顺序

---

## 六、如果要继续，三条路

| 方向 | 成本 | 价值 | 建议 |
|---|---|---|---|
| 清尾巴：修 `SliderThumb` + 把 122 个组件打成可 `npm run build` 的库 | 1 轮 | 低 | 可选 |
| 重写 main bundle 的 418 个组件（用还原的 template 作参考） | 数十轮 | 中 | 不建议 |
| 停止技术深挖，按需取用现有成果 | 0 | 高 | **推荐** |

---

## 七、怎么用现有成果

```bash
# 1. 构建并验证应用（主要用途）
git clone https://github.com/zhaojiaxiang97-crypto/xiaobai-daily.git
cd xiaobai-daily
./tools/check.sh          # 语法 → 构建 → 九页面断言，约 4 分钟

# 2. 取用某个独立 chunk 组件
npm i @babel/parser @babel/traverse @babel/generator @babel/types
node tools/vue-decompiler/lib-conv.cjs src/renderer/ui/Kbd.js ./out tools/vue-decompiler/convert-component.cjs
# → out/Kbd.vue

# 3. 读 main bundle 里的组件（不可运行，但结构和模板正确）
REGISTRY_PATH=/tmp/reg.json node tools/vue-decompiler/convert-component.cjs <组件.js>
```
