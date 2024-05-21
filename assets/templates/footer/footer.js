function toggleImprint() {
  document.getElementById("imprintContainer").classList.remove("d_none");
  setModalState(true);
}

function closeImprint() {
  document.getElementById("imprintContainer").classList.add("d_none");
  setModalState(false);
}
