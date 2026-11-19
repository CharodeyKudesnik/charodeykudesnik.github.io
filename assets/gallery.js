for (const gallery of document.querySelectorAll('.case-gallery')) {
  const track = gallery.querySelector('.frames');
  const slides = Array.from(track.querySelectorAll('figure'));
  if (slides.length < 2) continue;

  const previews = document.createElement('div');
  previews.className = 'gallery-previews';
  previews.setAttribute('role', 'group');
  previews.setAttribute('aria-label', document.documentElement.lang === 'ru' ? 'Выбрать скриншот' : 'Choose a screenshot');

  function select(index) {
    track.scrollLeft = slides[index].offsetLeft - slides[0].offsetLeft;
    markCurrent(index);
  }

  function markCurrent(index) {
    Array.from(previews.children).forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      slides[i].querySelector('a').tabIndex = i === index ? 0 : -1;
    });
  }

  slides.forEach((slide, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', (index + 1) + ' / ' + slides.length + ' · ' + slide.querySelector('figcaption').textContent);
    const thumb = document.createElement('img');
    thumb.src = slide.querySelector('img').getAttribute('src');
    thumb.alt = '';
    thumb.loading = 'lazy';
    button.append(thumb);
    button.addEventListener('click', () => select(index));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') select(index);
    });
    button.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      const next = (index + (event.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length;
      select(next);
      previews.children[next].focus();
    });
    previews.append(button);
  });

  gallery.append(previews);
  gallery.classList.add('carousel');
  markCurrent(0);
  track.addEventListener('scroll', () => {
    if (track.clientWidth) markCurrent(Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / track.clientWidth))));
  }, {passive: true});
}
