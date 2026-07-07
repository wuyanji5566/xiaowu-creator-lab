# Project Notes

本项目是小伍自用的个人 AI 创造档案馆，目标是长期展示作品、实验、方法论和成长记录，不是短期销售官网。

## Editing Rules

- 保持静态站结构：HTML + CSS + JavaScript，不引入框架，除非用户明确要求。
- 视觉风格沿用深空宇宙、金色能量、实验室入口，不要重做成普通 SaaS 或营销落地页。
- 新增作品优先修改 `works-data.js`，不要把作品内容重新写死在 `works.html`。
- 保留“已完成 / 进行中 / 计划中”三个状态，避免状态体系膨胀。
- 首页适合作为基地控制台，作品页适合作为档案库。
- 每个真实作品最好补齐：截图、背景、过程、成果、思考、下一步。

## Local Preview

```bash
cd "D:\小伍创造者实验室"
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```
