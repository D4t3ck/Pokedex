/**
 * Initializes the application by including HTML, rendering Pokémon data, fetching API data, and setting up search functionality.
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 */
async function init() {
  showLoader();
  includeHTML();
  await renderPkmnData();
  searchForm();
  monitorInput();
  renderDexButtons();
  hideLoader();
}

/**
 * Sets the state of the modal.
 * @param {boolean} isOpen - Indicates whether the modal is open or closed.
 */
function setModalState(isOpen) {
  let isModalOpen = false;
  isModalOpen = isOpen;
  document.body.style.overflow = isModalOpen ? "hidden" : "auto";
}

/**
 * Scrolls the window to the bottom of the page smoothly.
 */
function scrollDown() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });
}

/**
 * Scrolls the window to the top of the page smoothly.
 */
function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/**
 * Closes the Pokémon detail card.
 */
function closeCard() {
  let card = document.getElementById("detailCard");
  card.classList.add("d_none");
  setModalState(false);
}

/**
 * Toggles between the front and back images of a Pokémon card.
 * @param {number} i - The index of the Pokémon card.
 * @param {Event} event - The event object.
 */
function turnPkmn(i, event) {
  event.stopPropagation();
  document.getElementById(`frontImg_${i}`).classList.toggle("d_none");
  document.getElementById(`backImg_${i}`).classList.toggle("d_none");
}

/**
 * Toggles between the regular and shiny images of a Pokémon.
 * @param {number} i - The index of the Pokémon.
 */
function showShiny(i) {
  let detailImg = document.getElementById(`detailImg_${i}`);
  let shinyImg = document.getElementById(`shinyImg_${i}`);

  if (detailImg && shinyImg) {
    detailImg.classList.toggle("d_none");
    shinyImg.classList.toggle("d_none");
  }
}

/**
 * Displays the loader by removing the "d_none" class from the loader element.
 * Logs an error if the loader element is not found.
 */
function showLoader() {
  let loader = document.getElementById("loader");
  if (loader) {
    loader.classList.remove("d_none");
  } else {
    console.error("Loader element not found");
  }
}

/**
 * Hides the loader by adding the "d_none" class to the loader element.
 * Logs an error if the loader element is not found.
 */
function hideLoader() {
  let loader = document.getElementById("loader");
  if (loader) {
    loader.classList.add("d_none");
  } else {
    console.error("Loader element not found");
  }
}

/**
 * Hides the "Load More" button by adding the "d_none" class.
 */
function hideLoadMoreBtn() {
  const button = document.getElementById("loadMore");
  button.classList.add("d_none");
}

/**
 * Shows the "Load More" button by removing the "d_none" class.
 */
function showLoadMoreBtn() {
  const button = document.getElementById("loadMore");
  button.classList.remove("d_none");
}
