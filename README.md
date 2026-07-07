# 小伍创造者实验室

> One-Man AI Factory · Since 2026.07.07

这是一个自用的个人 AI 创造档案馆，用来长期展示作品、实验、方法论和成长记录。

技术栈：原生 HTML + CSS + JavaScript，零框架，零构建步骤。

## 本地预览

在 PowerShell 里执行：

```bash
cd "D:\小伍创造者实验室"
python -m http.server 5173
```

打开：

```text
http://localhost:5173
```

## 文件结构

```text
/
├── index.html        # 首页：创造基地入口 + 当前状态
├── about.html        # 创造者档案
├── experiment.html   # 100 天 AI 创造实验时间线
├── works.html        # 作品星库：由 works-data.js 自动渲染
├── enterprise.html   # 企业 AI 实验方向
├── products.html     # AI 产品实验方向
├── system.html       # 创造方法论
├── styles.css        # 全站样式
├── script.js         # 粒子系统、首页统计、作品页交互
├── works-data.js     # 作品数据；以后新增作品优先改这里
└── assets/           # 背景、头像、作品素材
```

## 如何新增一个作品

优先修改 `works-data.js`。

复制 `window.CREATION_WORKS` 里的任意一个作品对象，改这些字段：

- `id`：英文唯一标识，比如 `my-first-ai-tool`
- `name`：作品名
- `type`：作品类型
- `category`：分类，例如 `web`、`visual`、`video`、`product`
- `date`：日期或“持续更新”
- `status`：只能用 `已完成`、`进行中`、`计划中`
- `summary`：一句话说明
- `tools`：用过的工具列表
- `background`、`process`、`result`、`thought`、`next`：详情弹窗内容

保存后刷新 `works.html`，作品星球、作品卡片、筛选和详情会自动更新。

## 当前设计原则

- 这是长期展示基地，不是销售官网。
- 首页承担“基地控制台”作用：让人知道当前实验进度。
- 作品页承担“档案库”作用：每个作品都要有背景、过程、成果、思考和下一步。
- 不追求一次做大，先持续积累真实作品。

## 下一步建议

每完成一个作品，就补充：

- 一张截图或封面图
- 为什么做
- 用了哪些 AI 工具
- 做出来了什么
- 学到了什么
