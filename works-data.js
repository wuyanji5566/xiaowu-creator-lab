/* ============================================================
   小伍创造者实验室 — 作品数据
   以后新增作品，优先改这里，不要直接改作品页结构。
   ============================================================ */
(function(){
  'use strict';

  window.CREATION_WORKS = [
    {
      id: 'lab',
      name: '小伍创造者实验室',
      type: 'AI网页作品',
      category: 'web',
      date: '2026.07.07',
      status: '已完成',
      level: 'L',
      orbit: 'o1',
      position: { left: '22%', top: '22%' },
      icon: '◈',
      cover: 'assets/lab-bg.jpg',
      images: [
        'assets/lab-bg.jpg'
      ],
      link: 'index.html',
      tools: ['Claude Code', 'DeepSeek', 'ChatGPT', 'AI视觉生成'],
      summary: '第一个动态宇宙实验室首页系统。全原生 HTML + CSS + JavaScript，零框架零依赖，视频背景 + Canvas 星尘粒子 + 全站统一宇宙环境。',
      background: '100天AI创造者资产化实验的起点。它不是普通官网，而是一个能长期承载作品、方法、实验和成长记录的数字基地。',
      process: '先确定信息架构：基地首页、创造者档案、实验时间线、作品星库、企业AI样品、产品实验、创造方法论。再统一视觉系统和粒子环境。',
      result: '已经形成一个可本地运行、可继续扩展、可展示给别人看的个人 AI 创造基地。',
      thought: '这件作品验证了一个关键判断：一个普通人可以借助AI快速搭出专业水准的数字存在。后续重点不是堆页面，而是持续往里面沉淀真实作品。',
      next: '持续补充真实作品截图、制作过程、复盘记录，把它从展示站升级为个人创造档案馆。'
    },
    {
      id: 'creator-archive',
      name: '创造者档案系统',
      type: '个人档案',
      category: 'system',
      date: '2026.07.07',
      status: '进行中',
      level: 'M',
      orbit: 'o2',
      position: { left: '66%', top: '20%' },
      icon: '◎',
      cover: 'assets/about/photo.png',
      images: [
        'assets/about/photo.png'
      ],
      link: 'about.html',
      tools: ['HTML', 'CSS', 'AI协作', '内容整理'],
      summary: '把个人介绍、创造使命、方向、轨迹整合成长期可展示的创造者档案。',
      background: '单纯的“关于我”页面不够承载长期成长，需要一个能解释身份、方向和方法的档案结构。',
      process: '围绕三重身份、创造轨迹、五个创造方向组织内容，让外部观看者快速理解你是谁、在做什么、为什么做。',
      result: '已完成基础页面，后续需要补充更真实的作品经历和阶段性复盘。',
      thought: '个人品牌不是一句定位，而是一组持续更新的证据。',
      next: '每完成一个作品，就反向更新档案页里的经历、方向和能力证明。'
    },
    {
      id: 'visual',
      name: 'AI视觉作品集',
      type: 'AI视觉作品',
      category: 'visual',
      date: '持续更新',
      status: '进行中',
      level: 'M',
      orbit: 'o3',
      position: { left: '12%', top: '52%' },
      icon: '⬡',
      tools: ['Midjourney', 'DALL·E', 'Stable Diffusion', 'Photoshop AI'],
      summary: '宇宙感、人物、产品、品牌视觉的AI辅助创作实验。目标是建立统一视觉语言，而不是堆散图。',
      background: 'AI视觉真正有价值的地方不是生成“好看的图”，而是形成可复用的品牌资产和视觉叙事。',
      process: '采用主题探索、风格固化、系列产出的方式积累视觉素材。',
      result: '已经有宇宙感品牌视觉方向，等待继续整理成系列作品。',
      thought: '风格一致性比单张惊艳更重要。',
      next: '整理首批 6-12 张代表图，补充到作品页的真实截图区域。'
    },
    {
      id: 'video',
      name: 'AI视频短片实验',
      type: 'AI视频作品',
      category: 'video',
      date: '即将启动',
      status: '计划中',
      level: 'M',
      orbit: 'o4',
      position: { left: '76%', top: '50%' },
      icon: '▶',
      tools: ['Runway', 'Pika', 'Sora', 'AI分镜工具'],
      summary: '用AI生成短片、分镜和视觉圣经，探索一个人完成视频创作的全流程。',
      background: '视频是内容创作的高维产出。AI降低了制作成本，也让一个人完成短片成为可能。',
      process: '计划采用 AI分镜、AI生成、AI剪辑、人工精调的混合流程。',
      result: '准备阶段。首批方向包括品牌概念短片、AI创造者纪录片、产品演示视频。',
      thought: '真正要沉淀的不是某条视频，而是一套可复用的视频生产流程。',
      next: '先跑通一条 30-60 秒短片，不追求完美，追求完整闭环。'
    },
    {
      id: 'diagnosis',
      name: '企业AI诊断样品',
      type: '企业AI样品',
      category: 'enterprise',
      date: '即将启动',
      status: '计划中',
      level: 'M',
      orbit: 'o5',
      position: { left: '42%', top: '62%' },
      icon: '◫',
      tools: ['Claude Code', 'DeepSeek', '多AI协作'],
      summary: '帮助判断哪些业务适合用AI落地，快速出可行性评估和验证原型。',
      background: '很多企业知道AI重要，但不知道第一个样品该做什么。诊断工具的价值是把模糊需求翻译成可执行方案。',
      process: '核心维度包括业务匹配度、数据就绪度、技术可行性、投入产出比。',
      result: '概念验证阶段，已梳理诊断框架方向。',
      thought: '企业AI落地要从小样品开始，不要一上来做大系统。',
      next: '做出第一个可填写、可生成建议的轻量诊断表。'
    },
    {
      id: 'product',
      name: 'AI产品实验',
      type: 'AI产品实验',
      category: 'product',
      date: '持续推进',
      status: '进行中',
      level: 'S',
      orbit: 'o1',
      position: { left: '58%', top: '72%' },
      icon: '✦',
      tools: ['Claude Code', 'DeepSeek', '多种AI工具'],
      summary: '包含命理微工具和 CreatorOS 原型实验。探索AI与个人认知、创作系统的结合。',
      background: '产品是数字工厂的最终产出形态。先做自己用的小工具，再考虑通用化。',
      process: '命理微工具从知识结构化开始，CreatorOS 从自己的创作流程自动化开始。',
      result: '已完成概念设计，等待第一个可用原型。',
      thought: '最好的早期产品不是大而全，而是小而准。',
      next: '完成命理微工具的第一个可用版本，作为站内第一个真正产品样品。'
    }
  ];

  window.CREATION_LOGS = [
    { date: '2026.07.07', title: '建立数字根据地', text: '完成小伍创造者实验室的第一版宇宙首页和基础页面。' },
    { date: '2026.07.07', title: '升级为作品数据系统', text: '把作品内容抽离成独立数据文件，后续只改数据就能更新展示。' },
    { date: 'Next', title: '补充真实作品截图', text: '为每个作品加入截图、制作过程和复盘，让展示基地逐步长出证据。' }
  ];
})();
