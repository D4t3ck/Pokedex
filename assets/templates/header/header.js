function searchForm() {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      search();
    });
  } else {
    console.error("Search form not found.");
  }
}

async function search() {
  const searchInput = document
    .getElementById("search")
    .value.trim()
    .toLowerCase();

  if (!searchInput) {
    return alert("Please enter a Pokémon name or number.");
  }

  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchInput}`
    );

    if (!response.ok) {
      throw new Error("Pokémon not found");
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
  let input = document.getElementById("suggestions");
  const card = document.getElementById("detailCard");
  card.classList.remove("d_none");
  card.innerHTML = openDetailCard(pkmnData, pkmnData.id);
  setModalState(true);
  input.classList.add("d_none");

  currentCard = pkmnData;
  renderChart();
}

async function monitorInput() {
  const searchInput = document.getElementById("search");
  const suggestionsContainer = document.getElementById("suggestions");

  searchInput.addEventListener("input", async function () {
    const searchValue = this.value.trim().toLowerCase();

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

      suggestionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("suggestion")) {
          searchInput.value = event.target.textContent;
          search();
        }
      });
    } catch (error) {
      console.error("Error retrieving Pokémon names:", error);
    }
  });
}

function clearSearch() {
  document.getElementById("suggestions").classList.add("d_none");
  document.getElementById("search").value = "";
}

function toggleSuggestionBox() {
  let input = document.getElementById("search");
  if (input.value !== "") {
    document.getElementById("suggestions").classList.remove("d_none");
  }
}
