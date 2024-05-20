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
      return (suggestionsContainer.innerHTML = "");
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
      console.error("Error retrieving Pokémon names:", error);
    }
  });
}

function clearSearch() {
  document.getElementById("search").value = "";
}
