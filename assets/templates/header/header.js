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
    document.getElementById("clearBtn").classList.add("d_none");
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Displays the search result by updating the UI with the provided Pokémon data.
 * @param {Object} pkmnData - The Pokémon data to display.
 */
function displaySearchResult(pkmnData) {
  const input = document.getElementById("suggestions");
  const card = document.getElementById("detailCard");

  updateCardVisibility(card, pkmnData);
  toggleInputVisibility(input);
  setModalState(true);

  currentCard = pkmnData;
  renderChart();
}

/**
 * Updates the visibility of the detail card with the provided Pokémon data.
 * @param {HTMLElement} card - The detail card element.
 * @param {Object} pkmnData - The Pokémon data to display in the card.
 */
function updateCardVisibility(card, pkmnData) {
  card.classList.remove("d_none");
  card.innerHTML = openDetailCard(pkmnData, pkmnData.id);
}

/**
 * Toggles the visibility of the input element by adding a 'd_none' class.
 * @param {HTMLElement} input - The input element to hide.
 */
function toggleInputVisibility(input) {
  input.classList.add("d_none");
}

/**
 * Monitors the input field for Pokémon name searches and updates the suggestions.
 */
async function monitorInput() {
  const searchInput = document.getElementById("search");
  const suggestionsContainer = document.getElementById("suggestions");

  searchInput.addEventListener("input", handleInput);

  /**
   * Handles the input event for the search input field.
   */
  async function handleInput() {
    const searchValue = this.value.trim().toLowerCase();

    if (!searchValue) {
      clearSuggestions();
      return;
    }

    try {
      const data = await fetchPokemonData();
      const filteredNames = filterPokemonNames(data.results, searchValue);
      displaySuggestions(filteredNames);
    } catch (error) {
      console.error("Error retrieving Pokémon names:", error);
    }
  }

  /**
   * Clears the suggestions container.
   */
  function clearSuggestions() {
    suggestionsContainer.innerHTML = "";
  }

  /**
   * Fetches Pokémon data from the API.
   * @returns {Promise<Object>} The Pokémon data.
   */
  async function fetchPokemonData() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0`
    );
    return response.json();
  }

  /**
   * Filters the Pokémon names based on the search value.
   * @param {Array<Object>} pokemonList - The list of Pokémon data.
   * @param {string} searchValue - The search value to filter by.
   * @returns {Array<Object>} The filtered list of Pokémon.
   */
  function filterPokemonNames(pokemonList, searchValue) {
    return pokemonList.filter((pokemon) => {
      const pokemonId = getPokemonId(pokemon.url);
      return (
        pokemon.name.includes(searchValue) || pokemonId.includes(searchValue)
      );
    });
  }

  /**
   * Extracts the Pokémon ID from the URL.
   * @param {string} url - The URL of the Pokémon.
   * @returns {string} The Pokémon ID.
   */
  function getPokemonId(url) {
    return url.split("/").filter(Boolean).pop();
  }

  /**
   * Displays the filtered Pokémon suggestions.
   * @param {Array<Object>} pokemonList - The filtered list of Pokémon.
   */
  function displaySuggestions(pokemonList) {
    const suggestionsList = pokemonList
      .map((pokemon) => {
        const pokemonId = getPokemonId(pokemon.url);
        return /* html */ `<div class="suggestion">
        <div class="suggestions">#${pokemonId} ${pokemon.name}</div>
        </div>
        
        `;
      })
      .join("");

    suggestionsContainer.innerHTML = suggestionsList;
    suggestionsContainer.addEventListener("click", handleSuggestionClick);
  }

  /**
   * Handles the click event on a suggestion.
   * @param {Event} event - The click event.
   */
  function handleSuggestionClick(event) {
    if (event.target.classList.contains("suggestions")) {
      const selectedText = event.target.textContent;
      const selectedName = selectedText.substring(
        selectedText.indexOf(" ") + 1
      );
      searchInput.value = selectedName;
      search();
    }
  }
}

/**
 * Clears the search input and hides the suggestions and clear Button.
 */
function clearSearch() {
  document.getElementById("suggestions").classList.add("d_none");
  document.getElementById("clearBtn").classList.add("d_none");
  document.getElementById("search").value = "";
}

/**
 * Toggles the visibility of the search suggestions and clear Button.
 */
function toggleSuggestionBox() {
  let input = document.getElementById("search");
  if (input.value !== "") {
    document.getElementById("suggestions").classList.remove("d_none");
    document.getElementById("clearBtn").classList.remove("d_none");
  }
}
