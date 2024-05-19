async function init() {
  includeHTML();
  await renderPkmnData();
  fetchApi();
  searchForm();
  monitorInput();
}

function searchForm() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      search();
    });
  } else {
    console.error("Suchformular nicht gefunden.");
  }
}

async function search() {
  const searchInput = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();

  if (searchInput === "") {
    alert("Bitte geben Sie einen Pokémon-Namen ein.");
    return;
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    );

    if (!response.ok) {
      throw new Error("Pokémon nicht gefunden");
    }

    const pkmnData = await response.json();
    displaySearchResult(pkmnData);

    document.getElementById("search").value = "";
    document.getElementById("suggestions").innerHTML = "";
  } catch (error) {
    alert(error.message);
  }
}

function displaySearchResult(pkmnData) {
  const card = document.getElementById("detailCard");
  card.classList.remove("d_none");
  card.innerHTML = openDetailCard(pkmnData, pkmnData.id);

  currentCard = pkmnData;
  renderChart();
}

function monitorInput() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", async function () {
    const searchValue = this.value.trim().toLowerCase();
    const suggestionsContainer = document.getElementById("suggestions");

    if (!searchValue) {
      suggestionsContainer.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0`
      );
      const data = await response.json();

      const filteredNames = data.results.filter((pokemon) =>
        pokemon.name.includes(searchValue)
      );

      const suggestionsList = filteredNames
        .map((pokemon) => `<div class="suggestion">${pokemon.name}</div>`)
        .join("");

      suggestionsContainer.innerHTML = suggestionsList;

      const suggestionElements = document.querySelectorAll(".suggestion");
      suggestionElements.forEach((element) => {
        element.addEventListener("click", function () {
          searchInput.value = this.textContent;
          search();
        });
      });
    } catch (error) {
      console.error("Fehler beim Abrufen der Pokémon-Namen:", error);
    }
  });
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
  card.innerHTML = "";
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
