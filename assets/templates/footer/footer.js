/**
 * Toggles the visibility of the imprint container.
 */
function toggleImprint() {
  document.getElementById("imprintContainer").classList.remove("d_none");
  setModalState(true);
}

/**
 * Closes the imprint container.
 */
function closeImprint() {
  document.getElementById("imprintContainer").classList.add("d_none");
  setModalState(false);
}