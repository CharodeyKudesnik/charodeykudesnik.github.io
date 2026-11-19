const homeTitle = document.title;
function updateTitle() {
  const selected = document.querySelector('.case:target');
  document.title = selected ? selected.querySelector('h1').textContent + ' · Андрей Липский' : homeTitle;
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
