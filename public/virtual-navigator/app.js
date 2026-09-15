(() => {
  'use strict';
  const room = document.querySelector('.room');
  const modeButtons = [...document.querySelectorAll('[data-mode]')];
  const targetButtons = [...document.querySelectorAll('.scene-target')];
  const targetHeading = document.getElementById('selected-target');
  const guidance = document.getElementById('guidance-description');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let mode = 'object';
  let selected = 'cup';
  let pulseTimeout;
  const labels = {
    object: { cup: 'Cup', plant: 'Plant', book: 'Book' },
    image: { cup: 'Cup image', plant: 'Plant image', book: 'My notebook' }
  };

  function update(animate = false) {
    room.dataset.target = selected;
    modeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    targetButtons.forEach(button => {
      const name = labels[mode][button.dataset.target];
      const active = button.dataset.target === selected;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `Select ${name.toLowerCase()} in illustration`);
      button.querySelector('.target-label').textContent = name;
    });
    targetHeading.textContent = labels[mode][selected];
    guidance.textContent = mode === 'image'
      ? 'Orient toward a registered reference image.'
      : 'Orient toward the selected object.';
    clearTimeout(pulseTimeout);
    room.classList.remove('pulse');
    if (animate && !reduceMotion.matches) {
      requestAnimationFrame(() => {
        room.classList.add('pulse');
        pulseTimeout = setTimeout(() => room.classList.remove('pulse'), 1650);
      });
    }
  }

  modeButtons.forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode;
    if (mode === 'image') selected = 'book';
    update(true);
  }));
  targetButtons.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.target;
    update(true);
  }));
  update();

  // A short, silent original recording plays once on first view. Native controls
  // remain available; reduced-motion users get the still poster until playback.
  const demo = document.getElementById('original-demo');
  if (demo && !reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        demo.play().catch(() => {});
      }
    }, { threshold: 0.5 });
    observer.observe(demo);
  }
})();
