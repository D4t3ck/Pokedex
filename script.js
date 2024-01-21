let pokedexContainer = document.getElementById("pokedex-container");

function init() {
  includeHTML();
  loadPokemon();
}

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/?limit=151";
  let response = await fetch(url);
  let data = await response.json();

  // Sortiere die Pokémon-Daten nach ihrer Nummer
  let sortedList = sortPkmnByNumber(data.results);

  for (let i = 0; i < sortedList.length; i++) {
    let pokemon = sortedList[i];
    let response = await fetch(pokemon.url);
    let pokemonData = await response.json();
    renderPokemonCard(pokemonData);
  }
}

function sortPkmnByNumber(pokemonList) {
  return pokemonList.sort(
    (a, b) => a.url.split("/").slice(-2, -1) - b.url.split("/").slice(-2, -1)
  );
}

/* async function getPokemonData(url) {
  let response = await fetch(url);
  return await response.json();
} */

function renderPokemonCard(pokemon) {
  // Finde den deutschen Namen im Array
  let germanNameObj = pkmnNames.find(
    (item) => Object.keys(item)[0] === pokemon.name
  );

  // Verwende den deutschen Namen oder den englischen Namen, wenn kein deutscher Name gefunden wurde
  let germanName = germanNameObj
    ? Object.values(germanNameObj)[0]
    : pokemon.name;
  let capitalizedGermanName =
    germanName.charAt(0).toUpperCase() + germanName.slice(1);

  // Finde den primären Typ des Pokémon (falls vorhanden)
  let primaryType = pokemon.types.length > 0 ? pokemon.types[0].type.name : "";

  // Verwende eine Funktion, um die Hintergrundfarbe basierend auf dem Typ zu bestimmen
  let backgroundColor = typeColors[primaryType] || "#CCCCCC";

  pokedexContainer.innerHTML += overviewContent(
    pokemon,
    germanName,
    capitalizedGermanName,
    backgroundColor
  );
}

////////// GENERIERTES HTML //////////

function overviewContent(
  pokemon,
  germanName,
  capitalizedGermanName,
  backgroundColor
) {
  return /* html */ `
    <div class="pokemon-card" style="background-color: ${backgroundColor};">
      <img src="${pokemon.sprites.front_default}" alt="${germanName}">
      <p>${capitalizedGermanName}</p>
      <p>Nr. ${pokemon.id}</p>
    </div>
  `;
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html'); // 'includes/header.html'
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}