/* Accessible, dependency-free draggable preview for Halo work cards. */
(() => {
  const cards = document.querySelectorAll('.ha-work, .archive-grid > .project');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  cards.forEach(card => {
    const handle = card.querySelector('.work-drag-handle');
    if (!handle) return;

    handle.hidden = false;
    card.classList.add('has-drag-handle');
    let pointer = null;
    let keyboardOffset = { x: 0, y: 0 };
    let resetTimer;

    const reset = () => {
      clearTimeout(resetTimer);
      pointer = null;
      keyboardOffset = { x: 0, y: 0 };
      card.classList.remove('is-dragging', 'is-keyboard-lifted');
      card.style.transform = '';
    };

    const prepareCard = () => {
      window.gsap?.killTweensOf?.(card);
      card.classList.remove('reveal-in');
      card.style.opacity = '1';
    };

    handle.addEventListener('pointerdown', event => {
      if (event.button !== 0 || !event.isPrimary) return;
      event.preventDefault();
      clearTimeout(resetTimer);
      prepareCard();
      const rect = card.getBoundingClientRect();
      pointer = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        moved: false,
        minX: Math.min(0, 12 - rect.left),
        maxX: Math.max(0, window.innerWidth - 12 - rect.right)
      };
      card.classList.remove('is-keyboard-lifted');
      card.classList.add('is-dragging');
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener('pointermove', event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = Math.max(pointer.minX, Math.min(pointer.maxX, event.clientX - pointer.x));
      const dy = Math.max(-120, Math.min(120, event.clientY - pointer.y));
      if (Math.abs(dx) + Math.abs(dy) > 4) pointer.moved = true;
      if (!pointer.moved) return;
      const rotate = reducedMotion.matches ? 0 : Math.max(-5, Math.min(5, dx / 24));
      card.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${rotate}deg)`;
    });

    const finishPointer = event => {
      if (!pointer || pointer.id !== event.pointerId) return;
      const moved = pointer.moved;
      pointer = null;
      card.classList.remove('is-dragging');
      if (moved) {
        card.classList.add('is-returning');
        card.style.transform = '';
        resetTimer = window.setTimeout(() => card.classList.remove('is-returning'), reducedMotion.matches ? 0 : 400);
      } else card.style.transform = '';
    };
    handle.addEventListener('pointerup', finishPointer);
    handle.addEventListener('pointercancel', reset);

    handle.addEventListener('keydown', event => {
      const step = event.shiftKey ? 28 : 12;
      const delta = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[event.key];
      if (event.key === 'Escape') {
        reset();
        return;
      }
      if (!delta) return;
      event.preventDefault();
      prepareCard();
      keyboardOffset.x = Math.max(-144, Math.min(144, keyboardOffset.x + delta[0]));
      keyboardOffset.y = Math.max(-96, Math.min(96, keyboardOffset.y + delta[1]));
      card.classList.add('is-keyboard-lifted');
      card.style.transform = `translate3d(${keyboardOffset.x}px, ${keyboardOffset.y}px, 0)`;
    });

    handle.addEventListener('blur', () => {
      if (!pointer) reset();
    });
  });
})();
