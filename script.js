function init() {
  includeHTML();
  renderPkmnData();
  fetchApi();
}

function scrollDown() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function closeCard() {
  let card = document.getElementById("detailCard");
  card.classList.remove("d_flex");
  card.classList.add("d_none");
  card.innerHTML = "";
}
