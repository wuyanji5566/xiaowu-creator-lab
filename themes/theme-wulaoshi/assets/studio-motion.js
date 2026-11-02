(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const main = document.querySelector('#main');
  if (!main) return;

  const revealSelector = [
    '.person-visual', '.person-copy > *', '.ha-selected .ha-heading', '.ha-work',
    '.ha-process > *', '.ha-collaboration > *', '.ha-learning > *', '.ha-about > *',
    '.ha-notes > *', '.ha-contact > *',
    '.page-heading > *', '.about-header > *', '.service-proof > a',
    '.filters', '.archive-grid > .project', '.case-feature', '.notes-list article',
    '.editorial-layout > *', '.detail-meta', '.detail-cover', '.detail-tags',
    '.contact-layout > *', '.contact-band', '.archive-more', '.page-outline',
    '.prose > h2', '.prose > h3', '.prose > blockquote', '.prose > figure',
    '.prose > table', '.prose > ul', '.prose > ol'
  ].join(',');

  const targets = [...main.querySelectorAll(revealSelector)];
  targets.forEach((node, index) => {
    node.dataset.studioReveal = /img|figure|visual|image|portrait|cover/i.test(node.className || node.tagName)
      ? 'image'
      : 'content';
    const siblings = node.parentElement ? [...node.parentElement.children].filter(child => child.matches(revealSelector)) : [];
    const order = Math.max(0, siblings.indexOf(node));
    node.style.setProperty('--studio-delay', `${Math.min(order * 75, 300)}ms`);
  });

  const footerItems = document.querySelectorAll('.footer-top, .footer-bottom');
  footerItems.forEach((node, index) => {
    node.dataset.studioReveal = 'content';
    node.style.setProperty('--studio-delay', `${index * 90}ms`);
  });

  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-studio-reveal]').forEach(node => node.classList.add('studio-in-view'));
  } else {
    document.documentElement.classList.add('studio-motion-ready');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('studio-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-studio-reveal]').forEach(node => observer.observe(node));
  }

  const progress = document.createElement('div');
  progress.className = 'studio-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);
  let frame = 0;
  const updateProgress = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      frame = 0;
    });
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  if (window.matchMedia?.('(hover: hover) and (pointer: fine)').matches && !reduced) {
    main.querySelectorAll('.project-image, .case-visual, .service-proof a').forEach(frame => {
      frame.addEventListener('pointermove', event => {
        const bounds = frame.getBoundingClientRect();
        frame.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        frame.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      }, { passive: true });
    });
  }
})();
