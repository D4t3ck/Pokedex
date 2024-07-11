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
  
  async function renderAll() {
    await renderDexRegion(1, 51, true);
  }
  
  async function renderKantoDex() {
    await renderDexRegion(1, 152);
  }
  
  async function renderJohtoDex() {
    await renderDexRegion(152, 252);
  }
  
  async function renderHoennDex() {
    await renderDexRegion(252, 387);
  }
  
  async function renderSinnohDex() {
    await renderDexRegion(387, 495);
  }
  
  async function renderUnovaDex() {
    await renderDexRegion(495, 650);
  }
  
  async function renderKalosDex() {
    await renderDexRegion(650, 722);
  }
  
  async function renderAlolaDex() {
    await renderDexRegion(722, 810);
  }
  
  async function renderGalarDex() {
    await renderDexRegion(810, 906);
  }
  
  async function renderPaldeaDex() {
    await renderDexRegion(906, 1026);
  }
  