/**
 * Renders a specific region of the Pokedex.
 * 
 * @param {number} start - The starting index of the Pokedex entries to render.
 * @param {number} end - The ending index of the Pokedex entries to render.
 * @param {boolean} [showLoadMore=false] - Whether to show the "Load More" button after rendering.
 */
async function renderDexRegion(start, end, showLoadMore = false) {
    showLoader();
    clearContent();
    await renderDex(start, end);
    hideLoader();
    if (showLoadMore) {
      showLoadMoreBtn();
    } else {
      hideLoadMoreBtn();
    }
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
  