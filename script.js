/* ============================================================
   小伍创造者实验室 v2.0 — 统一宇宙引擎
   所有页面共享同一粒子系统
   首页额外：视频背景 + 能量核心视差
   ============================================================ */
(function(){'use strict';

var prefersReducedMotion=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
var isMobile=/Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent)||innerWidth<768;
var isHub=!!document.querySelector('.body--hub'); // 首页检测
var works=window.CREATION_WORKS||[];

function escapeHtml(value){
  return String(value==null?'':value).replace(/[&<>"']/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  });
}

function statusClass(status){
  if(status==='已完成')return 'status--done';
  if(status==='进行中')return 'status--progress';
  return 'status--pending';
}

function safeUrl(value){
  var url=String(value||'').trim();
  if(!url||/^javascript:/i.test(url))return '';
  return url;
}

function thumbUrl(w){
  var cover=safeUrl(w.cover);
  var match=cover.match(/^assets\/works\/([^/]+)\.(png|jpe?g|webp)$/i);
  if(!match)return cover;
  return 'assets/works/thumbs/'+match[1]+'.webp';
}

function renderCover(w,className,useThumb,priority){
  var cover=safeUrl(w.cover);
  var src=useThumb?thumbUrl(w):cover;
  if(src){
    var loading=priority?'eager':'lazy';
    var fetchPriority=priority?' fetchpriority="high"':'';
    var fallback=useThumb&&cover&&src!==cover?' data-fallback-src="'+escapeHtml(cover)+'"':'';
    return '<img src="'+escapeHtml(src)+'"'+fallback+' alt="'+escapeHtml(w.name)+'" loading="'+loading+'" decoding="async"'+fetchPriority+' onerror="if(this.dataset.fallbackSrc&&this.src.indexOf(this.dataset.fallbackSrc)===-1){this.src=this.dataset.fallbackSrc;delete this.dataset.fallbackSrc}else{this.parentElement.classList.add(\'is-missing\');this.remove()}">';
  }
  return '<span class="'+className+'">'+escapeHtml(w.icon||'◈')+'</span>';
}

// ==========================================================
// 首页基地状态 — 由作品数据自动统计
// ==========================================================
(function(){
  if(!works.length)return;
  var metricWorks=document.getElementById('metricWorks');
  var metricDone=document.getElementById('metricDone');
  var metricProgress=document.getElementById('metricProgress');
  var experimentDay=document.getElementById('experimentDay');
  if(!metricWorks||!metricDone||!metricProgress)return;
  metricWorks.textContent=works.length;
  metricDone.textContent=works.filter(function(w){return w.status==='已完成'}).length;
  metricProgress.textContent=works.filter(function(w){return w.status==='进行中'}).length;
  if(experimentDay){
    var start=new Date(2026,6,7);
    var today=new Date();
    var localToday=new Date(today.getFullYear(),today.getMonth(),today.getDate());
    var day=Math.max(1,Math.floor((localToday-start)/86400000)+1);
    experimentDay.textContent='Day '+day+' · 数字基地持续生长';
  }
})();

// ==========================================================
// 作品星库 — 数据驱动渲染
// ==========================================================
(function(){
  var planetLayer=document.getElementById('planetLayer');
  var archive=document.getElementById('worksArchive');
  var stats=document.getElementById('archiveStats');
  var detail=document.getElementById('sgDetail');
  if(!planetLayer||!archive||!detail||!works.length)return;

  var detailScroll=document.getElementById('detailScroll');
  var detailTitle=document.getElementById('detailTitle');
  var detailClose=document.getElementById('detailClose');
  var filters=document.querySelectorAll('.archive-filter');
  var renderToken=0;

  function renderStats(){
    if(!stats)return;
    var done=works.filter(function(w){return w.status==='已完成'}).length;
    var progress=works.filter(function(w){return w.status==='进行中'}).length;
    var pending=works.filter(function(w){return w.status==='计划中'}).length;
    stats.innerHTML=[
      '<div><strong>'+works.length+'</strong><span>总节点</span></div>',
      '<div><strong>'+done+'</strong><span>已完成</span></div>',
      '<div><strong>'+progress+'</strong><span>推进中</span></div>',
      '<div><strong>'+pending+'</strong><span>计划中</span></div>'
    ].join('');
  }

  function render(filter){
    renderToken++;
    var token=renderToken;
    var active=filter||'all';
    var list=works.filter(function(w){return active==='all'||w.status===active}).slice().sort(function(a,b){
      var aReal=safeUrl(a.cover).indexOf('assets/works/')===0?1:0;
      var bReal=safeUrl(b.cover).indexOf('assets/works/')===0?1:0;
      if(aReal!==bReal)return bReal-aReal;
      return 0;
    });

    var planetHtml=list.map(function(w){
      var left=w.position&&w.position.left?w.position.left:'50%';
      var top=w.position&&w.position.top?w.position.top:'50%';
      return '<button class="sg-planet sg-planet--'+escapeHtml(w.level||'M')+' sg-planet--'+escapeHtml(w.orbit||'o1')+'" style="left:'+escapeHtml(left)+';top:'+escapeHtml(top)+'" type="button" data-work-id="'+escapeHtml(w.id)+'">'+
        '<span class="sg-planet__glow"></span>'+
        '<span class="sg-planet__body"></span>'+
        '<span class="sg-planet__info"><span class="sg-planet__name">'+escapeHtml(w.name)+'</span><span class="sg-planet__tag">'+escapeHtml(w.type)+'</span><span class="sg-planet__desc">'+escapeHtml(w.summary)+'</span></span>'+
      '</button>';
    }).join('');
    if(isMobile){
      planetLayer.innerHTML='';
      setTimeout(function(){if(token===renderToken)planetLayer.innerHTML=planetHtml},700);
    }else{
      planetLayer.innerHTML=planetHtml;
    }

    function cardHtml(w,index){
      return '<article class="work-card" data-work-id="'+escapeHtml(w.id)+'">'+
        '<button class="work-card__button" type="button" data-work-id="'+escapeHtml(w.id)+'">'+
          '<span class="work-card__thumb"><span class="work-card__thumb-placeholder">'+renderCover(w,'work-card__thumb-icon',true,index<4)+'</span></span>'+
          '<span class="work-card__body">'+
            '<span class="work-card__tag">'+escapeHtml(w.type)+'</span>'+
            '<span class="work-card__title">'+escapeHtml(w.name)+'</span>'+
            '<span class="work-card__desc">'+escapeHtml(w.summary)+'</span>'+
            '<span class="work-card__foot"><span class="work-card__date">'+escapeHtml(w.date)+'</span><span class="work-card__status '+statusClass(w.status)+'">'+escapeHtml(w.status)+'</span></span>'+
          '</span>'+
        '</button>'+
      '</article>';
    }
    if(isMobile&&list.length>8){
      archive.innerHTML=list.slice(0,8).map(cardHtml).join('');
      setTimeout(function(){
        if(token!==renderToken)return;
        archive.insertAdjacentHTML('beforeend',list.slice(8).map(function(w,index){return cardHtml(w,index+8)}).join(''));
      },250);
    }else{
      archive.innerHTML=list.map(cardHtml).join('');
    }
  }

  function openDetail(id){
    var w=works.filter(function(item){return item.id===id})[0];
    if(!w)return;
    detailTitle.textContent=w.name;
    var toolHtml=(w.tools||[]).map(function(t){return '<span class="sg-detail__tool">'+escapeHtml(t)+'</span>'}).join('');
    var imageHtml=(w.images||[]).map(function(src,index){
      var image=safeUrl(src);
      if(!image)return '';
      return '<figure class="sg-detail__shot"><img src="'+escapeHtml(image)+'" alt="'+escapeHtml(w.name)+' 截图 '+(index+1)+'" loading="lazy" decoding="async"></figure>';
    }).join('');
    var link=safeUrl(w.link);
    var linkHtml=link?'<a class="sg-detail__link" href="'+escapeHtml(link)+'" target="_blank" rel="noopener noreferrer">打开作品</a>':'';
    var video=safeUrl(w.video);
    var videoHtml=video?'<div class="sg-detail__video"><video controls preload="metadata" poster="'+escapeHtml(safeUrl(w.cover))+'"><source src="'+escapeHtml(video)+'" type="video/mp4">当前浏览器不支持视频播放。</video></div>':'';
    var sections=[
      ['创造背景',w.background],
      ['制作过程',w.process],
      ['当前成果',w.result],
      ['我的思考',w.thought],
      ['下一步',w.next]
    ].filter(function(item){return item[1]});
    detailScroll.innerHTML=
      '<div class="sg-detail__cover">'+renderCover(w,'sg-detail__cover-icon',false,true)+'</div>'+
      videoHtml+
      '<div class="sg-detail__meta"><span class="sg-detail__tag">'+escapeHtml(w.type)+'</span><span class="sg-detail__date">'+escapeHtml(w.date)+'</span><span class="sg-detail__status '+statusClass(w.status)+'">'+escapeHtml(w.status)+'</span></div>'+
      '<p class="sg-detail__summary">'+escapeHtml(w.summary)+'</p>'+
      linkHtml+
      '<div class="sg-detail__tools">'+toolHtml+'</div>'+
      (imageHtml?'<div class="sg-detail__gallery"><h4>作品截图</h4><div class="sg-detail__shots">'+imageHtml+'</div></div>':'')+
      sections.map(function(item){return '<div class="sg-detail__section"><h4>'+escapeHtml(item[0])+'</h4><p>'+escapeHtml(item[1])+'</p></div>'}).join('');
    detailScroll.scrollTop=0;
    detail.classList.add('sg-detail--open');
    detail.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    if(detailClose)detailClose.focus();
  }

  function closeDetail(){
    detail.classList.remove('sg-detail--open');
    detail.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
  }

  renderStats();
  render('all');

  document.addEventListener('click',function(e){
    var target=e.target.closest('[data-work-id]');
    if(target)openDetail(target.getAttribute('data-work-id'));
  });
  if(detailClose)detailClose.addEventListener('click',closeDetail);
  detail.addEventListener('click',function(e){if(e.target===detail)closeDetail()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeDetail()});

  filters.forEach(function(btn){
    btn.addEventListener('click',function(){
      filters.forEach(function(item){item.classList.remove('archive-filter--active')});
      btn.classList.add('archive-filter--active');
      render(btn.getAttribute('data-filter'));
    });
  });
})();

// ==========================================================
// Reveal — 所有页面
// ==========================================================
(function(){
  if(prefersReducedMotion){
    document.querySelectorAll('.fade-up').forEach(function(el){el.style.opacity='1';el.style.transform='none';el.style.animation='none'});
    document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('revealed')});
    return;
  }
  var els=document.querySelectorAll('.reveal');if(!els.length)return;
  if(!('IntersectionObserver' in window)){for(var i=0;i<els.length;i++)els[i].classList.add('revealed');return}
  var ob=new IntersectionObserver(function(entries){for(var i=0;i<entries.length;i++){if(entries[i].isIntersecting){entries[i].target.classList.add('revealed');ob.unobserve(entries[i].target)}}},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  for(var i=0;i<els.length;i++)ob.observe(els[i]);
})();

// ==========================================================
// 个人作品集首页 — 精选作品由作品数据自动生成
// ==========================================================
(function(){
  var featured=document.getElementById('featuredWorks');
  if(!featured||!works.length)return;
  var count=document.getElementById('portfolioProjectCount');
  var countFacts=document.getElementById('portfolioWorksCount');
  if(count)count.textContent=works.length;
  if(countFacts)countFacts.textContent=works.length;

  var list=works.filter(function(w){return safeUrl(w.cover).indexOf('assets/')===0}).slice(0,5);
  if(!list.length){featured.innerHTML='<p class="portfolio-loading">作品档案暂未开放。</p>';return}
  featured.innerHTML=list.map(function(w,index){
    return '<article class="featured-project '+(index===0?'featured-project--lead':'')+'">'+
      '<a class="featured-project__link" href="works.html" aria-label="查看作品 '+escapeHtml(w.name)+'">'+
        renderCover(w,'featured-project__icon',true,index<2)+
        '<span class="featured-project__copy"><span class="featured-project__type">'+escapeHtml(w.type)+'</span><span class="featured-project__name">'+escapeHtml(w.name)+'</span><span class="featured-project__date">'+escapeHtml(w.date)+' <span aria-hidden="true">→</span></span></span>'+
      '</a></article>';
  }).join('');
})();

// ==========================================================
// 轻量互动层 — 不依赖 React 或外部运行时
// ==========================================================
(function(){
  var progress=document.getElementById('portfolioProgress');
  var interactive=document.querySelectorAll('.featured-project,.work-card');
  if(progress){
    function updateProgress(){
      var max=document.documentElement.scrollHeight-innerHeight;
      progress.style.transform='scaleX('+(max>0?Math.min(1,Math.max(0,scrollY/max)):0)+')';
    }
    addEventListener('scroll',updateProgress,{passive:true});
    addEventListener('resize',updateProgress,{passive:true});
    updateProgress();
  }
  var portfolioSections=document.querySelectorAll('.body--portfolio .portfolio-section,.body--portfolio .portfolio-statement,.body--portfolio .portfolio-contact,.body--portfolio .portfolio-footer');
  if(portfolioSections.length&&!prefersReducedMotion){
    document.body.classList.add('portfolio-motion-ready');
    if('IntersectionObserver' in window){
      var revealObserver=new IntersectionObserver(function(entries){
        for(var j=0;j<entries.length;j++)if(entries[j].isIntersecting){entries[j].target.classList.add('is-visible');revealObserver.unobserve(entries[j].target)}
      },{threshold:.08,rootMargin:'0px 0px -34px 0px'});
      for(var k=0;k<portfolioSections.length;k++)revealObserver.observe(portfolioSections[k]);
    }else for(var q=0;q<portfolioSections.length;q++)portfolioSections[q].classList.add('is-visible');
  }else for(var v=0;v<portfolioSections.length;v++)portfolioSections[v].classList.add('is-visible');
  if(prefersReducedMotion||isMobile)return;
  for(var i=0;i<interactive.length;i++){
    interactive[i].addEventListener('pointermove',function(e){
      var rect=this.getBoundingClientRect();
      this.style.setProperty('--spot-x',((e.clientX-rect.left)/rect.width*100)+'%');
      this.style.setProperty('--spot-y',((e.clientY-rect.top)/rect.height*100)+'%');
    });
    interactive[i].addEventListener('pointerleave',function(){this.style.removeProperty('--spot-x');this.style.removeProperty('--spot-y')});
  }
  var hero=document.querySelector('.portfolio-hero'),heroPortrait=document.querySelector('.portfolio-hero__portrait'),heroImage=document.querySelector('.portfolio-bg__image');
  if(hero&&heroPortrait&&heroImage){
    var raf=0,lastX=0,lastY=0;
    hero.addEventListener('pointermove',function(e){
      var rect=hero.getBoundingClientRect();
      lastX=(e.clientX-(rect.left+rect.width/2))/rect.width;
      lastY=(e.clientY-(rect.top+rect.height/2))/rect.height;
      if(!raf)raf=requestAnimationFrame(function(){
        heroPortrait.style.setProperty('--hero-portrait-x',(lastX*10).toFixed(2)+'px');
        heroPortrait.style.setProperty('--hero-portrait-y',(lastY*7).toFixed(2)+'px');
        heroImage.style.setProperty('--hero-bg-x',(lastX*-8).toFixed(2)+'px');
        heroImage.style.setProperty('--hero-bg-y',(lastY*-5).toFixed(2)+'px');
        raf=0;
      });
    });
    hero.addEventListener('pointerleave',function(){heroPortrait.style.removeProperty('--hero-portrait-x');heroPortrait.style.removeProperty('--hero-portrait-y');heroImage.style.removeProperty('--hero-bg-x');heroImage.style.removeProperty('--hero-bg-y')});
  }
})();

// ==========================================================
// 视频兜底（仅首页）
// ==========================================================
var bgVideo=document.getElementById('bgVideo'),bgFallback=document.getElementById('bgFallback');
if(bgVideo){bgVideo.addEventListener('error',function(){if(bgFallback)bgFallback.classList.add('bg-fallback--show');bgVideo.style.display='none'});var ft=setTimeout(function(){if(bgVideo.readyState<2&&bgFallback)bgFallback.classList.add('bg-fallback--show')},3000);bgVideo.addEventListener('playing',function(){clearTimeout(ft)})}

// ==========================================================
// Unicorn Studio 场景 — 成功加载后覆盖本地互动背景，失败自动回退
// ==========================================================
(function(){
  var scene=document.querySelector('.portfolio-unicorn__scene,.secondary-unicorn__scene');
  if(!scene)return;
  function init(){
    if(window.UnicornStudio&&window.UnicornStudio.init){window.UnicornStudio.init();document.body.classList.add('has-unicorn')}
  }
  if(window.UnicornStudio&&window.UnicornStudio.init){init();return}
  var script=document.createElement('script');
  script.src='https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.12/dist/unicornStudio.umd.js';
  script.onload=init;
  script.onerror=function(){scene.parentNode.classList.add('portfolio-unicorn--failed')};
  (document.head||document.body).appendChild(script);
})();

// ==========================================================
// 首页互动场景 — 本地 Canvas，不依赖外部编辑器或运行时
// ==========================================================
(function(){
  var field=document.getElementById('portfolioField');
  if(!field||prefersReducedMotion)return;
  var ctx=field.getContext('2d'),W=0,H=0,dpr=Math.min(devicePixelRatio||1,2),nodes=[],pointer={x:-9999,y:-9999,tx:-9999,ty:-9999},raf=0,last=0;
  function resize(){
    W=innerWidth;H=innerHeight;field.width=W*dpr;field.height=H*dpr;field.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
    nodes=[];var count=isMobile?18:34;
    for(var i=0;i<count;i++)nodes.push({x:W*(.12+Math.random()*.76),y:H*(.28+Math.random()*.56),r:1.1+Math.random()*2.4,phase:Math.random()*Math.PI*2,speed:.25+Math.random()*.5,drift:8+Math.random()*18});
  }
  function draw(t){
    raf=requestAnimationFrame(draw);var dt=Math.min(32,t-last||16);last=t;ctx.clearRect(0,0,W,H);
    pointer.x+=(pointer.tx-pointer.x)*.07;pointer.y+=(pointer.ty-pointer.y)*.07;
    var pulse=t*.001;
    ctx.lineWidth=.65;
    for(var i=0;i<nodes.length;i++){
      var a=nodes[i],ax=a.x+Math.sin(pulse*a.speed+a.phase)*a.drift,ay=a.y+Math.cos(pulse*a.speed*.8+a.phase)*a.drift*.45;
      a.cx=ax;a.cy=ay;
      for(var j=i+1;j<nodes.length;j++){
        var b=nodes[j],bx=b.cx,by=b.cy,dx=ax-bx,dy=ay-by,dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<155){var alpha=(1-dist/155)*.22;ctx.strokeStyle='rgba(58,157,212,'+alpha+')';ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke()}
      }
    }
    for(var n=0;n<nodes.length;n++){
      var p=nodes[n],dx=p.cx-pointer.x,dy=p.cy-pointer.y,dist=Math.sqrt(dx*dx+dy*dy)||1,near=Math.max(0,1-dist/190);
      var glow=ctx.createRadialGradient(p.cx,p.cy,0,p.cx,p.cy,18+near*16);glow.addColorStop(0,'rgba(224,181,86,'+(.5+near*.35)+')');glow.addColorStop(1,'rgba(42,145,208,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(p.cx,p.cy,18+near*16,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(239,198,112,'+(.42+near*.48)+')';ctx.beginPath();ctx.arc(p.cx,p.cy,p.r+near*1.5,0,Math.PI*2);ctx.fill();
    }
    var scan=(t*.055)%(H+180)-90;var grad=ctx.createLinearGradient(0,scan-26,0,scan+26);grad.addColorStop(0,'rgba(71,178,226,0)');grad.addColorStop(.5,'rgba(71,178,226,.14)');grad.addColorStop(1,'rgba(71,178,226,0)');ctx.fillStyle=grad;ctx.fillRect(0,scan-26,W,52);
  }
  resize();addEventListener('resize',resize,{passive:true});
  if(!isMobile){var hero=document.querySelector('.portfolio-hero');if(hero)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();pointer.tx=e.clientX-r.left;pointer.ty=e.clientY-r.top},{passive:true});if(hero)hero.addEventListener('pointerleave',function(){pointer.tx=-9999;pointer.ty=-9999},{passive:true})}
  addEventListener('visibilitychange',function(){if(document.hidden){cancelAnimationFrame(raf);raf=0}else if(!raf){last=performance.now();raf=requestAnimationFrame(draw)}});raf=requestAnimationFrame(draw);
})();

// ==========================================================
// 统一粒子系统 — 所有页面
// ==========================================================
var canvas=document.getElementById('starDust');
if(canvas&&!prefersReducedMotion){
  var ctx=canvas.getContext('2d');
  var dpr=Math.min(devicePixelRatio||1,2);
  var W,H,stars=[],animId,lastTime;

  function resize(){W=innerWidth;H=innerHeight;canvas.width=W*dpr;canvas.height=H*dpr;canvas.style.width=W+'px';canvas.style.height=H+'px';ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr)}
  addEventListener('resize',function(){resize();makeStars()});resize();

  var Star=(function(){
    function S(){this.reset(true)}
    S.prototype.reset=function(init){
      this.x=Math.random()*W;this.y=init?Math.random()*H:(Math.random()<0.3?-10:H+10);
      this.r=0.2+Math.random()*1.0;this.ba=0.04+Math.random()*0.35;
      this.tp=Math.random()*Math.PI*2;this.ts=0.002*(0.3+Math.random()*1.4);
      var s=0.008+Math.random()*0.05,a=Math.random()*Math.PI*2;
      this.vx=Math.cos(a)*s;this.vy=-Math.abs(Math.sin(a))*s-0.004;
      this.warm=isHub&&(Math.random()<0.18);
      this.h=this.warm?38+Math.random()*18:205+Math.random()*35;
      this.s=this.warm?20:6;this.l=75+Math.random()*25;
    };
    S.prototype.update=function(dt){var f=dt*0.04;this.x+=this.vx*f;this.y+=this.vy*f;if(this.x<-20)this.x=W+20;if(this.x>W+20)this.x=-20;if(this.y<-20){this.y=H+20;this.reset(false)}if(this.y>H+20){this.y=-20;this.reset(false)}};
    S.prototype.a=function(){return this.ba+Math.sin(this.tp)*0.08};
    S.prototype.draw=function(c){var a=Math.max(0.01,this.a());c.beginPath();c.arc(this.x,this.y,this.r*2.8,0,Math.PI*2);c.fillStyle='hsla('+this.h+','+this.s+'%,'+this.l+'%,'+(a*0.04)+')';c.fill();c.beginPath();c.arc(this.x,this.y,this.r,0,Math.PI*2);c.fillStyle='hsla('+this.h+','+this.s+'%,'+this.l+'%,'+a+')';c.fill()};
    return S;
  })();

  var count=isMobile?28:50;
  function makeStars(){stars=[];for(var i=0;i<count;i++)stars.push(new Star())}
  makeStars();

  // 鼠标视差
  var mouse={x:0,y:0,tx:0,ty:0};
  addEventListener('mousemove',function(e){mouse.tx=(e.clientX/W)*2-1;mouse.ty=(e.clientY/H)*2-1},{passive:true});
  if(isMobile)addEventListener('touchmove',function(e){if(e.touches.length){mouse.tx=(e.touches[0].clientX/W)*2-1;mouse.ty=(e.touches[0].clientY/H)*2-1}},{passive:true});

  var energyCore=document.querySelector('.energy-core');

  lastTime=performance.now();
  (function render(t){
    animId=requestAnimationFrame(render);
    var dt=Math.min(t-lastTime,50);lastTime=t;
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){stars[i].tp+=stars[i].ts;stars[i].update(dt);stars[i].draw(ctx)}
    var lsp=isMobile?0.08:0.030;
    mouse.x+=(mouse.tx-mouse.x)*lsp;mouse.y+=(mouse.ty-mouse.y)*lsp;
    if(!isMobile){
      canvas.style.transform='translate('+(mouse.x*10)+'px,'+(mouse.y*5)+'px)';
      if(isHub&&energyCore)energyCore.style.transform='translate(calc(-50% + '+(mouse.x*15)+'px), calc(-50% + '+(mouse.y*8)+'px))';
    }
  })();

  addEventListener('visibilitychange',function(){if(document.hidden){cancelAnimationFrame(animId);animId=null}else if(!animId){lastTime=performance.now();animId=requestAnimationFrame(render)}});
}

addEventListener('beforeunload',function(){if(animId)cancelAnimationFrame(animId)});
})();
