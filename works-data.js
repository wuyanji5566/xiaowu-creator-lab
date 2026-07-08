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
    },
    {
      id: 'xuanji-destiny-os',
      name: '玄机命理会馆',
      type: 'AI命理产品',
      category: 'product',
      date: '2026.07',
      status: '已完成',
      level: 'L',
      orbit: 'o2',
      position: { left: '18%', top: '76%' },
      icon: '◎',
      cover: 'assets/works/xuanji-destiny-os-cover.png',
      images: [
        'assets/works/xuanji-destiny-os-cover.png'
      ],
      link: 'https://xuanji-mingli-huiguan-4xi3.onrender.com',
      tools: ['AI产品设计', '命理知识结构化', '前端页面', 'Render部署'],
      summary: '融合八字、紫微、星座、MBTI 的 AI 个人命理解读产品首页。',
      background: '把传统命理与 AI 产品化表达结合，验证个人认知类产品是否能形成清晰的展示和转化路径。',
      process: '先设计产品定位和四维系统，再完成首页视觉、报告入口、案例展示和部署验证。',
      result: '完成可公开访问的 AI 命理产品展示页，形成第一个可展示的个人认知类产品样品。',
      thought: '命理产品不能只做玄学包装，必须把结构化分析、报告体验和行动建议做清楚。',
      next: '继续补完整报告页、输入流程和报告案例。'
    },
    {
      id: 'lvyu-chanyuan',
      name: '律御禅园',
      type: '东方关系产品',
      category: 'product',
      date: '2026.07',
      status: '进行中',
      level: 'M',
      orbit: 'o3',
      position: { left: '82%', top: '74%' },
      icon: '◫',
      cover: 'assets/works/lvyu-chanyuan-cover.png',
      images: [
        'assets/works/lvyu-chanyuan-cover.png'
      ],
      tools: ['AI产品设计', '移动端页面', '八字合婚', '关系分析'],
      summary: '面向移动端的八字合婚与关系能量分析产品样品。',
      background: '测试东方关系咨询类产品能否用移动端页面承载更轻量、更温和的用户体验。',
      process: '围绕合婚测算、服务项目、报告预览和底部导航搭建移动端体验。',
      result: '完成移动端首页样品，视觉风格更偏东方、温润、咨询服务型。',
      thought: '这类产品的关键不是堆概念，而是让用户感觉“可信、清楚、愿意继续看”。',
      next: '补充合婚表单、报告结果页和服务项目说明。'
    },
    {
      id: 'enterprise-ai-factory',
      name: '企业AI数字工厂',
      type: '企业AI样品',
      category: 'enterprise',
      date: '2026.07',
      status: '已完成',
      level: 'L',
      orbit: 'o4',
      position: { left: '50%', top: '82%' },
      icon: '◈',
      cover: 'assets/works/enterprise-ai-factory-cover.png',
      images: [
        'assets/works/enterprise-ai-factory-cover.png'
      ],
      tools: ['AI诊断框架', '前端页面', '企业服务设计', '样品验证'],
      summary: '帮助企业 10 分钟找出最值得做的第一个 AI 项目的诊断型产品页。',
      background: '很多企业想做 AI，但第一步不知道选什么场景。这个样品把“诊断、验证、成交路径”做成一个清晰入口。',
      process: '设计企业AI诊断流程，突出切入方向、样品验证和成交路径，再落成可展示页面。',
      result: '完成企业AI诊断样品页，可作为企业AI落地服务的第一个展示案例。',
      thought: '企业AI落地的成交前提，是让客户先看见一个小而清楚的第一步。',
      next: '接入诊断问卷和自动报告生成。'
    },
    {
      id: 'football-ai-dashboard',
      name: '先知足球 AI 量化大盘',
      type: 'AI数据产品',
      category: 'product',
      date: '2026.07',
      status: '进行中',
      level: 'M',
      orbit: 'o5',
      position: { left: '30%', top: '88%' },
      icon: '⬡',
      cover: 'assets/works/football-ai-dashboard-cover.png',
      images: [
        'assets/works/football-ai-dashboard-cover.png'
      ],
      tools: ['AI数据分析', '体育数据产品', 'Dashboard设计', '前端页面'],
      summary: '基于足球数据和 AI 模型概念设计的量化分析大盘。',
      background: '探索体育赛事数据、AI预测和可视化大盘如何组合成一个专业感强的产品入口。',
      process: '围绕预测准确率、赛事覆盖、模型同步和数据服务能力设计首页指标。',
      result: '完成深色科技风的数据产品首屏，适合继续扩展成分析终端。',
      thought: '数据产品第一眼必须建立可信度，指标、模型说明和风险声明都要同时存在。',
      next: '补充真实数据来源、分析方法页和比赛详情页。'
    },
    {
      id: 'deep-sleep-lab',
      name: 'Deep Sleep Lab',
      type: 'AI疗愈应用',
      category: 'product',
      date: '2026.07',
      status: '进行中',
      level: 'M',
      orbit: 'o1',
      position: { left: '70%', top: '88%' },
      icon: '✦',
      cover: 'assets/works/deep-sleep-lab-cover.png',
      images: [
        'assets/works/deep-sleep-lab-cover.png'
      ],
      tools: ['移动端产品设计', '情绪状态选择', '睡眠仪式', '声音场景'],
      summary: '面向睡前放松、情绪安定和声音场景的移动端应用样品。',
      background: '测试 AI 时代的轻疗愈应用能否通过仪式感、情绪识别和声音内容形成日常使用场景。',
      process: '设计深睡模式、情绪状态、呼吸建议、睡前仪式和声音场景模块。',
      result: '完成移动端首屏视觉样品，适合继续扩展成交互原型。',
      thought: '疗愈类产品的重点是安全感和陪伴感，界面应该降低刺激而不是制造焦虑。',
      next: '补充声音播放、睡前流程和打卡记录。'
    },
    {
      id: 'yuao-sports-admin',
      name: '宇奥体育运营管理后台',
      type: '运营管理系统',
      category: 'web',
      date: '2026.07',
      status: '已完成',
      level: 'M',
      orbit: 'o2',
      position: { left: '8%', top: '88%' },
      icon: '▣',
      cover: 'assets/works/yuao-sports-admin-cover.png',
      images: [
        'assets/works/yuao-sports-admin-cover.png'
      ],
      tools: ['管理后台', '课程招生', '考勤扣课', '学习反馈'],
      summary: '面向体育培训机构的运营管理后台登录与功能入口样品。',
      background: '体育培训机构需要把课程、班级、报名、考勤、课时和反馈集中管理，降低日常运营成本。',
      process: '先做 Mock 演示版本，聚焦课程招生、考勤扣课和学习反馈三个核心流程。',
      result: '完成可演示的后台入口，适合继续扩展成 MVP 管理系统。',
      thought: '后台产品不需要炫技，关键是让机构看清“能管什么、怎么管、能省多少事”。',
      next: '继续补充课程、学员、订单和考勤模块。'
    }
  ];

  window.CREATION_LOGS = [
    { date: '2026.07.07', title: '建立数字根据地', text: '完成小伍创造者实验室的第一版宇宙首页和基础页面。' },
    { date: '2026.07.07', title: '升级为作品数据系统', text: '把作品内容抽离成独立数据文件，后续只改数据就能更新展示。' },
    { date: 'Next', title: '补充真实作品截图', text: '为每个作品加入截图、制作过程和复盘，让展示基地逐步长出证据。' }
  ];
})();
