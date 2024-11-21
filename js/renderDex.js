/**
 * Renders a specific region of the Pokedex.
 *
 * @param {number} start - The starting index of the Pokedex entries to render.
 * @param {number} end - The ending index of the Pokedex entries to render.
 * @param {boolean} [showLoadMore=false] - Whether to show the "Load More" button after rendering.
 */
async function renderDexRegion(start, end, showLoadMore = false) {
  showLoader();

  if (!isLoadingMore) {
    clearContent();
  }

  await renderDex(start, end);
  hideLoader();
  if (showLoadMore) {
    showLoadMoreBtn();
  } else {
    hideLoadMoreBtn();
  }
}

/**
 * Initializes the app when the DOM content has fully loaded.
 * - Renders the dex buttons.
 * - Sets the default active button.
 * - Renders the complete Pokémon data.
 */
/* document.addEventListener("DOMContentLoaded", () => {
  renderDexButtons();
  setDefaultActiveButton();
  renderAll();
}); */

/**
 * Renders the dex buttons for each Pokémon region and adds event handlers.
 */
function renderDexButtons() {
  const buttons = document.getElementById("btnContainer");

  const regions = [
    { name: "All", handler: "renderAll" },
    { name: "Kanto", handler: "renderKantoDex" },
    { name: "Johto", handler: "renderJohtoDex" },
    { name: "Hoenn", handler: "renderHoennDex" },
    { name: "Sinnoh", handler: "renderSinnohDex" },
    { name: "Unova", handler: "renderUnovaDex" },
    { name: "Kalos", handler: "renderKalosDex" },
    { name: "Alola", handler: "renderAlolaDex" },
    { name: "Galar", handler: "renderGalarDex" },
    { name: "Paldea", handler: "renderPaldeaDex" },
  ];

  buttons.innerHTML = regions
    .map(
      (region, index) =>
        `<button class="dex_buttons ${index === 0 ? "active" : ""}" onclick="${
          region.handler
        }(); setActiveClass(this);">${region.name}</button>`
    )
    .join("");
}

/**
 * Sets the default active button to the first button in the dex buttons list.
 */
function setDefaultActiveButton() {
  const allButton = document.querySelector(".dex_buttons:first-child");
  allButton.classList.add("active");
}

/**
 * Sets the given button as active and removes the active class from the previously active button.
 * @param {HTMLElement} button - The button element to be set as active.
 */
function setActiveClass(button) {
  const current = document.querySelector(".dex_buttons.active");
  if (current) {
    current.classList.remove("active");
  }
  button.classList.add("active");
}

/**
 * Renders the first 50 entries of the Pokedex and shows the "Load More" button.
 */
async function renderAll() {
  await renderDexRegion(1, 51, true);
}

/**
 * Renders the Kanto region Pokedex entries (1-151) and hides the "Load More" button.
 */
async function renderKantoDex() {
  await renderDexRegion(1, 152);
}

/**
 * Renders the Johto region Pokedex entries (152-251) and hides the "Load More" button.
 */
async function renderJohtoDex() {
  await renderDexRegion(152, 252);
}

/**
 * Renders the Hoenn region Pokedex entries (252-386) and hides the "Load More" button.
 */
async function renderHoennDex() {
  await renderDexRegion(252, 387);
}

/**
 * Renders the Sinnoh region Pokedex entries (387-494) and hides the "Load More" button.
 */
async function renderSinnohDex() {
  await renderDexRegion(387, 495);
}

/**
 * Renders the Unova region Pokedex entries (495-649) and hides the "Load More" button.
 */
async function renderUnovaDex() {
  await renderDexRegion(495, 650);
}

/**
 * Renders the Kalos region Pokedex entries (650-721) and hides the "Load More" button.
 */
async function renderKalosDex() {
  await renderDexRegion(650, 722);
}

/**
 * Renders the Alola region Pokedex entries (722-809) and hides the "Load More" button.
 */
async function renderAlolaDex() {
  await renderDexRegion(722, 810);
}

/**
 * Renders the Galar region Pokedex entries (810-905) and hides the "Load More" button.
 */
async function renderGalarDex() {
  await renderDexRegion(810, 906);
}

/**
 * Renders the Paldea region Pokedex entries (906-1025) and hides the "Load More" button.
 */
async function renderPaldeaDex() {
  await renderDexRegion(906, 1026);
}
