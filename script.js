function init() {
  includeHTML();
  renderPkmnData()
}

function scrollDown() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}