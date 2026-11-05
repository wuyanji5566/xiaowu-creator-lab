'use strict';
// Content and navigation work without JavaScript. This layer only adds convenience.
(() => {
  const path = location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('nav a').forEach(link => {
    if (new URL(link.href).pathname.replace(/\/$/, '') === path) link.setAttribute('aria-current', 'page');
  });
  const navigation = document.getElementById('navigation');
  const desktop = matchMedia('(min-width: 851px)');
  const syncNavigation = () => { if (navigation) navigation.open = desktop.matches; };
  syncNavigation(); desktop.addEventListener('change', syncNavigation);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && navigation) navigation.open = false; });
  const dialog = document.getElementById('lightbox');
  let trigger;
  if (dialog && typeof dialog.showModal === 'function') {
    const galleryLinks = [...document.querySelectorAll('a[data-feedback-gallery]')];
    let galleryIndex = -1;
    let galleryControls;
    let zoomButton;
    const showImage = link => {
      let image = dialog.querySelector('img');
      if (!image) { image = new Image(); dialog.querySelector('.lightbox-close').after(image); }
      image.classList.remove('is-zoomed');
      if (zoomButton) { zoomButton.textContent = '放大'; zoomButton.setAttribute('aria-pressed', 'false'); }
      let error = dialog.querySelector('.lightbox-image-error');
      if (!error) { error = document.createElement('p'); error.className = 'media-error lightbox-image-error'; dialog.append(error); }
      error.hidden = true;
      image.onload = () => { error.hidden = true; };
      image.onerror = () => { error.textContent = '图片暂时无法加载，请关闭预览后重试。'; error.hidden = false; };
      image.alt = link.querySelector('img')?.alt || '图片预览';
      image.src = link.href;
    };
    const moveGallery = step => {
      if (galleryIndex < 0 || !galleryLinks.length) return;
      galleryIndex = (galleryIndex + step + galleryLinks.length) % galleryLinks.length;
      showImage(galleryLinks[galleryIndex]);
    };
    const ensureGalleryControls = () => {
      if (galleryControls) return;
      galleryControls = document.createElement('div');
      galleryControls.className = 'feedback-gallery-controls';
      const previous = document.createElement('button');
      previous.type = 'button'; previous.textContent = '← 上一张'; previous.setAttribute('aria-label', '查看上一张反馈截图');
      const next = document.createElement('button');
      next.type = 'button'; next.textContent = '下一张 →'; next.setAttribute('aria-label', '查看下一张反馈截图');
      zoomButton = document.createElement('button');
      zoomButton.type = 'button'; zoomButton.textContent = '放大'; zoomButton.setAttribute('aria-pressed', 'false');
      previous.addEventListener('click', () => moveGallery(-1));
      next.addEventListener('click', () => moveGallery(1));
      zoomButton.addEventListener('click', () => {
        const enlarged = dialog.querySelector('img')?.classList.toggle('is-zoomed');
        zoomButton.textContent = enlarged ? '缩小' : '放大';
        zoomButton.setAttribute('aria-pressed', String(Boolean(enlarged)));
      });
      galleryControls.append(previous, zoomButton, next); dialog.append(galleryControls);
    };
    document.addEventListener('click', event => {
      const link = event.target.closest('a[data-lightbox]');
      if (!link) return;
      event.preventDefault(); trigger = link;
      galleryIndex = galleryLinks.indexOf(link);
      if (galleryIndex >= 0) ensureGalleryControls();
      if (galleryControls) galleryControls.hidden = galleryIndex < 0;
      showImage(link); dialog.showModal();
    });
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    document.addEventListener('keydown', event => {
      if (!dialog.open) return;
      if (event.key === 'Escape') dialog.close();
      if (event.key === 'ArrowLeft') moveGallery(-1);
      if (event.key === 'ArrowRight') moveGallery(1);
    });
    dialog.addEventListener('close', () => { dialog.querySelector('img')?.remove(); galleryIndex = -1; trigger?.focus(); });
  }
  document.querySelectorAll('.prose img:not([data-no-lightbox])').forEach(image => {
    if (image.closest('a')) return;
    const link = document.createElement('a'); link.href = image.src; link.dataset.lightbox = ''; link.setAttribute('aria-label', '放大图片：' + image.alt);
    image.before(link); link.append(image);
  });
  const failImage = image => {
    if (image.closest('.lightbox')) return;
    image.classList.add('image-failed');
    const note = document.createElement('span'); note.className = 'media-error'; note.textContent = '图片暂时无法加载';
    image.after(note);
  };
  document.querySelectorAll('img').forEach(image => {
    image.addEventListener('error', () => failImage(image), {once: true});
    if (image.complete && image.naturalWidth === 0) failImage(image);
  });
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('error', () => {
      const note = document.createElement('p'); note.className = 'media-error'; note.textContent = '视频暂时无法播放，请稍后重试或联系伍老师。'; video.after(note);
    }, {once: true});
  });
  // The same editable Halo article supplies both the content and its table of contents.
  const outline = document.querySelector('[data-toc]');
  document.querySelectorAll('.service-page .prose > h3[id]').forEach(heading => {
    const wrapper = document.createElement('section'); wrapper.className = 'service-option';
    heading.before(wrapper); wrapper.append(heading);
    while (wrapper.nextElementSibling && !/^H[23]$/.test(wrapper.nextElementSibling.tagName)) wrapper.append(wrapper.nextElementSibling);
  });
  const sections = [...document.querySelectorAll('.editorial-layout .prose h2')];
  if (outline && sections.length > 1) {
    const nav = document.createElement('nav'); nav.setAttribute('aria-label', '本页章节');
    sections.forEach((section, index) => {
      if (!section.id) section.id = 'section-' + (index + 1);
      const link = document.createElement('a'); link.href = '#' + section.id; link.textContent = section.textContent;
      nav.append(link);
    });
    outline.append(nav);
    if ('IntersectionObserver' in window) {
      const current = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        nav.querySelectorAll('a').forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }), {rootMargin: '-10% 0px -65% 0px'});
      sections.forEach(section => current.observe(section));
    }
  }
  const hero = document.querySelector('.hero');
  if (hero && !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(pointer: fine) and (min-width: 851px)').matches) {
    let frame = 0;
    hero.addEventListener('pointermove', event => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty('--art-x', ((event.clientX - rect.left) / rect.width - .5) * 8 + 'px');
        hero.style.setProperty('--art-y', ((event.clientY - rect.top) / rect.height - .5) * 5 + 'px');
        frame = 0;
      });
    }, {passive: true});
    hero.addEventListener('pointerleave', () => { hero.style.setProperty('--art-x', '0px'); hero.style.setProperty('--art-y', '0px'); });
  }
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal-in'); observer.unobserve(entry.target); }
    }), {threshold: .08});
    document.querySelectorAll('.section-head, .project, .case-feature, .cooperation-list > a, .notes-list article, .about-strip').forEach(element => observer.observe(element));
  }
})();
