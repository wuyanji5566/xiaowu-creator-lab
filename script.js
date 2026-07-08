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

function renderCover(w,className){
  var cover=safeUrl(w.cover);
  if(cover){
    return '<img src="'+escapeHtml(cover)+'" alt="'+escapeHtml(w.name)+'" loading="lazy" decoding="async" onerror="this.parentElement.classList.add(\'is-missing\');this.remove()">';
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
  if(!metricWorks||!metricDone||!metricProgress)return;
  metricWorks.textContent=works.length;
  metricDone.textContent=works.filter(function(w){return w.status==='已完成'}).length;
  metricProgress.textContent=works.filter(function(w){return w.status==='进行中'}).length;
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
    var active=filter||'all';
    var list=works.filter(function(w){return active==='all'||w.status===active});

    planetLayer.innerHTML=list.map(function(w){
      var left=w.position&&w.position.left?w.position.left:'50%';
      var top=w.position&&w.position.top?w.position.top:'50%';
      return '<button class="sg-planet sg-planet--'+escapeHtml(w.level||'M')+' sg-planet--'+escapeHtml(w.orbit||'o1')+'" style="left:'+escapeHtml(left)+';top:'+escapeHtml(top)+'" type="button" data-work-id="'+escapeHtml(w.id)+'">'+
        '<span class="sg-planet__glow"></span>'+
        '<span class="sg-planet__body"></span>'+
        '<span class="sg-planet__info"><span class="sg-planet__name">'+escapeHtml(w.name)+'</span><span class="sg-planet__tag">'+escapeHtml(w.type)+'</span><span class="sg-planet__desc">'+escapeHtml(w.summary)+'</span></span>'+
      '</button>';
    }).join('');

    archive.innerHTML=list.map(function(w){
      return '<article class="work-card" data-work-id="'+escapeHtml(w.id)+'">'+
        '<button class="work-card__button" type="button" data-work-id="'+escapeHtml(w.id)+'">'+
          '<span class="work-card__thumb"><span class="work-card__thumb-placeholder">'+renderCover(w,'work-card__thumb-icon')+'</span></span>'+
          '<span class="work-card__body">'+
            '<span class="work-card__tag">'+escapeHtml(w.type)+'</span>'+
            '<span class="work-card__title">'+escapeHtml(w.name)+'</span>'+
            '<span class="work-card__desc">'+escapeHtml(w.summary)+'</span>'+
            '<span class="work-card__foot"><span class="work-card__date">'+escapeHtml(w.date)+'</span><span class="work-card__status '+statusClass(w.status)+'">'+escapeHtml(w.status)+'</span></span>'+
          '</span>'+
        '</button>'+
      '</article>';
    }).join('');
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
    var sections=[
      ['创造背景',w.background],
      ['制作过程',w.process],
      ['当前成果',w.result],
      ['我的思考',w.thought],
      ['下一步',w.next]
    ].filter(function(item){return item[1]});
    detailScroll.innerHTML=
      '<div class="sg-detail__cover">'+renderCover(w,'sg-detail__cover-icon')+'</div>'+
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
// 视频兜底（仅首页）
// ==========================================================
var bgVideo=document.getElementById('bgVideo'),bgFallback=document.getElementById('bgFallback');
if(bgVideo){bgVideo.addEventListener('error',function(){if(bgFallback)bgFallback.classList.add('bg-fallback--show');bgVideo.style.display='none'});var ft=setTimeout(function(){if(bgVideo.readyState<2&&bgFallback)bgFallback.classList.add('bg-fallback--show')},3000);bgVideo.addEventListener('playing',function(){clearTimeout(ft)})}

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
