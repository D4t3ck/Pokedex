async function init() {
  includeHTML();
  await renderPkmnData();
  fetchApi();
  searchForm();
  monitorInput();
}

function setModalState(isOpen) {
  let isModalOpen = false;
  isModalOpen = isOpen;
  document.body.style.overflow = isModalOpen ? "hidden" : "auto";
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
  card.classList.add("d_none");
  setModalState(false);
}

function turnPkmn(i, event) {
  event.stopPropagation();
  document.getElementById(`frontImg_${i}`).classList.toggle("d_none");
  document.getElementById(`backImg_${i}`).classList.toggle("d_none");
}

function showShiny(i) {
  let detailImg = document.getElementById(`detailImg_${i}`);
  let shinyImg = document.getElementById(`shinyImg_${i}`);

  if (detailImg && shinyImg) {
    detailImg.classList.toggle("d_none");
    shinyImg.classList.toggle("d_none");
  }
}
