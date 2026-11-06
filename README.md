# 伍老师｜AI 独立创造者

这是伍老师个人品牌网站的公开静态版本。首页使用方向 B 的原创静态页面；作品详情和其他内页来自本机 Halo 已发布内容。Render 发布仓库根目录；仓库地址为 `wuyanji5566/xiaowu-creator-lab`。

## 页面

首页、作品与分类分页、项目案例、方法、服务、关于、动态、联系、归档及作品详情。内容以真实素材和已公开资料为准。微信二维码是联系入口；客户与学员案例按现有匿名规则展示。

## 本地查看

在 PowerShell 中执行：

```powershell
cd "D:\伍老师个人网站优化\github-publish"
python -m http.server 5173 --bind 127.0.0.1
```

打开 <http://127.0.0.1:5173/>。页面无需前端构建工具。

## 更新内容

作品详情与内页是公开快照。先在本机 Halo 后台更新并发布，再运行导出脚本。导出前确认 Docker 中的 Halo 正在 `http://127.0.0.1:8090/` 运行。

```powershell
cd "D:\伍老师个人网站优化\github-publish"
python tools/export_halo_static.py .
python tools/verify_static_export.py .
```

导出脚本只读取 Halo 公开页面，不读取后台凭据、数据库或未发布草稿。它从站点地图和公开链接收集页面，并下载页面用到的图片、视频、字体、样式和脚本。默认保留自定义 `index.html`，因此更新内页不会覆盖首页。若明确需要恢复 Halo 首页，可加 `--replace-home`。发布前检查本次改动，然后提交并推送 GitHub；Render 将按 `render.yaml` 发布静态站。

首页源码是 `index.html`、`direction-b.css`、`direction-b.js` 与 `assets/direction-b/`。首页的客户与学员反馈引用 `themes/theme-wulaoshi/assets/media/feedback/` 中已匿名处理的公开副本，勿用原始聊天截图替换。

本次首页回退：找到部署前的提交 `8075f5c`，在新分支中用 `git show 8075f5c:index.html` 查看旧版首页；如需恢复，可将旧版 `index.html` 写回并推送新提交。其他内页无需回退。

Halo 后台的新增内容不会自动同步到此仓库，需要重新导出。独立的 Halo 主题源码与本地运行配置保存在本机 `D:\伍老师个人网站优化`。

## 部署

`render.yaml` 使用 `runtime: static`，发布仓库根目录。站内链接指向导出的 `.html` 页面；`sitemap.xml` 和 `robots.txt` 指向 [公开地址](https://xiaowu-creator-lab.onrender.com/)。

旧的 `enterprise.html`、`products.html`、`system.html` 提供到新版服务、作品和方法页的跳转，便于保留已有分享链接。
