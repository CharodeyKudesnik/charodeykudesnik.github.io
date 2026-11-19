const homeTitle = document.title;
function updateTitle() {
  const target = document.getElementById(location.hash.slice(1));
  const selected = target?.matches('.case') ? target : null;
  document.title = selected ? selected.querySelector('h1').textContent + ' · ' + document.querySelector('meta[name=author]').content : homeTitle;
  if (selected) selected.focus({preventScroll:true});
}
window.addEventListener('hashchange', updateTitle);
updateTitle();

const viewer = document.querySelector('.screen-viewer');
document.addEventListener('click', event => {
  const link = event.target.closest('.case-gallery figure a');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  viewer.querySelector('img').src = link.href;
  viewer.querySelector('figcaption').textContent = link.closest('figure').querySelector('figcaption').textContent;
  viewer.showModal();
});
window.addEventListener('hashchange', () => {
  if (viewer.open) viewer.close();
});

const languageSwitch = document.querySelector('.language-switch');
if (languageSwitch) {
  const destination = new URL(languageSwitch.href);
  function updateLanguageLink() {
    destination.search = location.search;
    destination.hash = location.hash;
    languageSwitch.href = destination.href;
  }
  updateLanguageLink();
  window.addEventListener('hashchange', updateLanguageLink);
  languageSwitch.addEventListener('click', () => {
    try { localStorage.setItem('android-portfolio.language', languageSwitch.hreflang); } catch {}
  });
}
