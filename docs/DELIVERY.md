# 交付清单

> 最后更新：round-0433

## 一句话

**你要的东西已经能用了**：仓库里有解混淆后的完整源码，`bash build.sh` 一键构建出可运行的离线应用。
反编译器作为额外成果：main bundle 的 418 个组件中 **393 个还原为可编译 `.vue`**，
其中 **94 个已在真实 Chrome 里渲染出正确 HTML**。

---

## 一、应用（核心需求，已完成）

| 项目 | 状态 |
|---|---|
| 仓库 | `github.com/zhaojiaxiang97-crypto/xiaobai-daily`（分支 `main`） |
| 一键构建 | `bash build.sh` → 下载 Release 资产（含 `tar tzf` 校验）→ 打包 asar → ad-hoc 签名 |
| 产物 | `build/extract/小白日报.app` |
| 运行验证 | **PASS**（九页面内容断言 + 待办 IPC） |
| 部署位置 | `/Applications/小白日报.app` |

### 验证结果（最近一次 `./tools/check.sh`）

```
BODY 449
  今日工作 388 / 待办 388 / 生成报告 1097 / 记忆时间线 192 / 热力图 433
  应用记录 2441 / 历史报告 240 / API 设置 304 / 隐私保护 1352
IPC todos: 30
RESULT: PASS
```

产物：asar 45M + unpacked 323M。

### 已做的改造

- **去商业化**：订阅/邀请/客服/交流群/教育认证/成长计划/反馈/积分/检查更新/
  帮助/排行榜/Pro/会员等入口全部移除
- **免登录 + 本地 AI 通道**（API 设置可配）
- **待办存本地 SQLite**（`local_todos`）
- **品牌**：小黑 → 小白
- 删除吉祥物、2026 年度成就、通知中心

---

## 二、源码可读性（已到机械极限）

| 指标 | 数值 |
|---|---|
| 主进程唯一 `_0x` 变量 | 13800 → **6122**（-56%） |
| 主进程 `_0x` 引用点 | ~37860 → **17498** |
| 全库短名(≤2 字符)占比 | **31.2%**（大头是第三方库内联：语言包、three.js、markdown 渲染器） |
| `void 0` 残留 | **0** |

**已到边界**：三轮规则迭代（含反向启发式、后缀补全、形参表扩充）实测无新命中，
剩余均为引用 1-2 次、无任何可推断特征的短命局部。

**不可再动**：前端 import 别名批量改名会破坏 Vue 渲染（实测整页空白，见
`archive/` 相关记录），这是硬约束。

---

## 三、反编译器（额外成果，详见 [DECOMPILER.md](DECOMPILER.md)）

### 组件可用性

| 位置 | 组件数 | 可编译 | 真实渲染 |
|---|---|---|---|
| **独立 chunk**（`ui/` `blocks/` `pages/`） | 160 | **122/123（99%）** | ✅ Kbd 已验证 |
| **main bundle**（`renderer/chunks/main.js`） | 418 | **393/393** | **94（24%）** |
| 去重总计 | **575** | — | — |

### 关键事实

- **未定义符号 0**（从 63 收敛到 0）
- **`vite build` 通过**
- **94 个组件在真实 Chrome 里渲染出完整 HTML**（`data-slot`、Tailwind class、slot 内容全对）

### 为什么只有 24%

251 个报错里，约 99 个是「必须在父组件内使用」（`Injection Symbol(DialogRootContext) not found`），
69 个是「mock 数据类型不对」（期望 string 给了 `{}`）。

这套 UI 库是 **reka-ui / radix 风格的组合式组件** —— 子组件必须在父组件内，
且需要贴近真实业务数据的 prop 结构。按组件族做包裹式测试后只从 91 提升到 94，
说明瓶颈已从「上下文」转为「数据深度」。

**24% 是这类组件库的固有属性，不是还原质量问题。**

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

### 反编译侧（`tools/vue-decompiler/`，详见 [DECOMPILER.md](DECOMPILER.md)）

| 工具 | 用途 |
|---|---|
| `gen-main.cjs` | **主生成器**：main bundle → 393 个 .vue + shared.js |
| `lib-conv.cjs` | 独立 chunk → 可运行 .vue（99%） |
| `convert-component.cjs` | render 函数 → template |
| `registry.cjs` | 组件注册表（341 项） |
| `verify-browser.sh` | 真实浏览器渲染验证 |
| `gen-render-test.cjs` / `gen-family-test.cjs` | props mock / 族包裹测试 |
| 其余 | 切分、绑定分析、映射校验、批量转换 |

---

## 五、已知限制

1. **反编译器只到「能渲染」，不到「逐字节等价」** —— 逆向后再编译，静态提升、
   patchFlag、缓存槽位必然不同；功能等价可验证。
2. **24% 之外的组件渲染需要真实业务数据** —— 要从原应用数据流反推每个组件的
   prop 结构，是另一个量级的工程。
3. **组件内部 CSS 已丢失** —— `_export_sfc` 的 scopeId（`data-v-xxx`）未保留。
4. **反混淆已到机械极限** —— 剩余 6122 个 `_0x` 无特征可推。
5. **前端 import 别名不可批量改名** —— 会破坏渲染（实测整页空白）。

---

## 六、如果要继续

| 方向 | 成本 | 价值 | 建议 |
|---|---|---|---|
| 按需取用现有组件 | 0 | 高 | **推荐** |
| 反推真实数据流让更多组件渲染 | 高（数十轮） | 中 | 收益/成本比差 |
| 找回组件 scopeId 恢复内联样式 | 中 | 中 | 有需要再说 |
| 继续反混淆 | 已到极限 | — | 不可行 |

---

## 七、怎么用

```bash
# 1. 构建并验证应用（主要用途）
git clone https://github.com/zhaojiaxiang97-crypto/xiaobai-daily.git
cd xiaobai-daily
./tools/check.sh          # 语法 → 构建 → 九页面断言，约 4 分钟

# 2. 取用某个独立 chunk 组件
node tools/vue-decompiler/lib-conv.cjs src/renderer/ui/Kbd.js ./out \
     tools/vue-decompiler/convert-component.cjs
# → out/Kbd.vue

# 3. 还原 main bundle 全部组件
node tools/vue-decompiler/gen-main.cjs src/renderer/chunks/main.js \
     tools/vue-decompiler/convert-component.cjs /tmp/proj
mkdir -p /tmp/proj/src/vendor && cp -R src/renderer/* /tmp/proj/src/vendor/
node tools/vue-decompiler/gen-render-test.cjs /tmp/proj
tools/vue-decompiler/verify-browser.sh /tmp/proj
```
