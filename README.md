# 小白日报（原小黑日报助手 v1.8.3）

小黑日报助手的逆向改造版：去商业化、免登录、全 AI 通道本地化。

## 文档

- [docs/FILE-GUIDE.md](docs/FILE-GUIDE.md)——每个文件名（含哈希 chunk）的实际含义索引
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)——运行架构、模块依赖图、核心数据流、原始工程形态反推、asar 结构、改造点速查

## 改造内容

- Pro 解锁：订阅校验恒为 Pro 会员
- 积分系统全部 stub：消耗恒零、额度恒满
- 免登录：伪造匿名会话，无任何登录门
- AI 本地化：报告/截图/音频转写/可视化报告全部支持自定义 API 直连
  （内置 API 设置页统一管理，OpenAI 兼容协议）
- 待办本地化：云端 todos.php 替换为本地 SQLite 存储（免登录完整可用）
- UI 精简：移除订阅、邀请、客服、交流群、教育认证、成长计划、反馈、
  积分余额、检查更新、帮助、教程、排行榜、超能伙伴 Bot、分享、邀请、
  工具箱、吉祥物、移动端连接等全部商业化/社交功能
- 品牌重塑：小黑日报助手 → 小白日报

## 代码状态

主进程 main.js 与前端 main bundle 已经过深度反混淆：

- javascript-obfuscator 保护壳（字符串数组/旋转 IIFE/self-defending）剥离
- 布尔混淆（![]/!![]）还原
- 括号属性访问（obj["x"]）AST 级转点访问
- 十六进制字面量十进制化（保留 UTF-8 字节序列与超时常量）
- 字符串 \x 转义还原
- 跨模块导入名恢复语义（settings.repository/auth.service 导出映射）
- Vue 编译 API 别名语义化（createElementVNode/ref/computed 等 22 个）
- 变量名语义化：三阶规则 + LLM 上下文推断，累计 2172 个 _0x 变量重命名
- 死代码清理：null 别名声明、壳残留

auth.service / settings.repository 模块边界天然保留语义函数名。


## 开发流程

改完源码后必须跑全流程自检（约 4 分钟）：

```bash
./tools/check.sh      # 语法 → 构建 → 结构自检 → 九页面内容断言
```

只看「侧边栏存在」无法发现主内容空白——本项目两次事故（import 别名批量改名、
函数参数批量改名）都是这个症状。`tools/verify-app.sh` 会断言九个页面的
`.content-body` 文本长度。

工具清单见 [tools/README.md](tools/README.md)，改动风险边界见
[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)（含实测的「主进程可改、前端禁改」
对照表）。

## 一键构建离线版

```bash
./build.sh          # → build/extract/小白日报.app
```

详见 [BUILD.md](BUILD.md)。构建运行时资产（Electron 外壳 + 原生模块）见
[Release v1.8.3](https://github.com/zhaojiaxiang97-crypto/xiaobai-daily/releases/tag/v1.8.3)，
脚本自动下载组装。

## 声明

本仓库为个人学习逆向工程技术的研究产物，请勿用于商业用途。
原始软件版权归 上海听悟智能科技 所有。
