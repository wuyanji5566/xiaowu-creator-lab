# Project Notes

本项目是伍老师个人品牌网站的公开静态站。自定义首页在 `index.html`、`direction-b.css`、`direction-b.js` 和 `assets/direction-b/`；其他页面以本机 Halo 已发布内容为来源，通过 Render 静态服务发布。

## Editing Rules

- 保持静态站结构；首页单独维护，其他页面从本机 Halo 已发布内容导出。维护步骤见 `README.md`。
- 不直接手改导出的作品正文；先在 Halo 后台更新，再运行 `tools/export_halo_static.py`。
- 保持暖纸、墨色、真实作品影像和编辑式排版，不回退到旧的宇宙实验室首页。
- 客户与学员案例继续匿名；作品状态和交付边界必须以真实素材为依据。
- 不提交 Halo 数据库、后台凭据、未发布草稿或原始私有素材。

## Local Preview

```bash
cd "D:\伍老师个人网站优化\github-publish"
python -m http.server 5173 --bind 127.0.0.1
```

Then open:

```text
http://localhost:5173
```
