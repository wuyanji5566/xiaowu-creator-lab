const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  navigation?.classList.toggle('is-open', open);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', '打开导航菜单');
  });
});

const dialog = document.querySelector('#qr-dialog');
const qrTriggers = document.querySelectorAll('#open-qr, .qr-preview');
let lastTrigger = null;

qrTriggers.forEach((trigger) => trigger.addEventListener('click', () => {
  lastTrigger = trigger;
  if (dialog?.showModal) dialog.showModal();
}));
document.querySelector('#close-qr')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener('close', () => lastTrigger?.focus());

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const revealItems = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -30px 0px' });
  revealItems.forEach((item) => observer.observe(item));
  document.documentElement.classList.add('js-motion');
}

const feedbackLinks = [...document.querySelectorAll('[data-feedback-image]')];
const feedbackDialog = document.querySelector('#feedback-dialog');
const feedbackLarge = document.querySelector('#feedback-large');
const feedbackCount = document.querySelector('#feedback-count');
let feedbackIndex = 0;
let feedbackTrigger = null;

function showFeedback(index) {
  feedbackIndex = (index + feedbackLinks.length) % feedbackLinks.length;
  const link = feedbackLinks[feedbackIndex];
  feedbackLarge.src = link.href;
  feedbackLarge.alt = link.querySelector('img')?.alt || '真实反馈截图';
  feedbackCount.textContent = `${feedbackIndex + 1} / ${feedbackLinks.length}`;
}

feedbackLinks.forEach((link, index) => link.addEventListener('click', (event) => {
  if (!feedbackDialog?.showModal) return;
  event.preventDefault();
  feedbackTrigger = link;
  showFeedback(index);
  feedbackDialog.showModal();
}));

document.querySelector('#feedback-prev')?.addEventListener('click', () => showFeedback(feedbackIndex - 1));
document.querySelector('#feedback-next')?.addEventListener('click', () => showFeedback(feedbackIndex + 1));
document.querySelector('#feedback-close')?.addEventListener('click', () => feedbackDialog?.close());
feedbackDialog?.addEventListener('click', (event) => {
  if (event.target === feedbackDialog) feedbackDialog.close();
});
feedbackDialog?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showFeedback(feedbackIndex - 1);
  if (event.key === 'ArrowRight') showFeedback(feedbackIndex + 1);
});
feedbackDialog?.addEventListener('close', () => feedbackTrigger?.focus());
