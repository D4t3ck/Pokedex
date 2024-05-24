/**
 * Sets up the search functionality.
 */
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

/**
 * Searches for a Pokémon based on the input value.
 */
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

/**
 * Displays the search result in the detail card.
 * @param {Object} pkmnData - The Pokémon data object.
 */
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

/**
 * Monitors the input for search suggestions.
 */
async function monitorInput() {
  const searchInput = document.getElementById("search");
  const suggestionsContainer = document.getElementById("suggestions");

  searchInput.addEventListener("input", async function () {
    const searchValue = this.value.trim().toLowerCase();

    if (!searchValue) {
      return (suggestionsContainer.innerHTML = "");
    }

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0`);
      const data = await response.json();

      const filteredNames = data.results.filter((pokemon) => {
        const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
        return pokemon.name.includes(searchValue) || pokemonId.includes(searchValue);
      });

      const suggestionsList = filteredNames.map((pokemon) => {
        const pokemonId = pokemon.url.split("/").filter(Boolean).pop();
        return `<div class="suggestion">#${pokemonId} ${pokemon.name}</div>`;
      }).join("");

      suggestionsContainer.innerHTML = suggestionsList;

      suggestionsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("suggestion")) {
          const selectedText = event.target.textContent;
          const selectedName = selectedText.substring(selectedText.indexOf(' ') + 1);
          searchInput.value = selectedName;
         /*  search(); */
        }
      });
    } catch (error) {
      console.error("Error retrieving Pokémon names:", error);
    }
  });
}

/**
 * Clears the search input and hides the suggestions.
 */
function clearSearch() {
  document.getElementById("suggestions").classList.add("d_none");
  document.getElementById("search").value = "";
}

/**
 * Toggles the visibility of the search suggestions.
 */
function toggleSuggestionBox() {
  let input = document.getElementById("search");
  if (input.value !== "") {
    document.getElementById("suggestions").classList.remove("d_none");
  }
}
