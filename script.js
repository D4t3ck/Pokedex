let offset = 0;
let limit = 50;

function init() {
  includeHTML();
  loadPokemon(limit);
}

async function loadMorePokemon(event) {
  event.preventDefault();

  offset += limit;
  await loadPokemon(limit);
}


async function loadPokemon(numberToLoad) {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberToLoad}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    let pokemon = data.results[i];
    let response = await fetch(pokemon.url);
    let pkmnData = await response.json();
    renderPokemonCard(pkmnData);
  }
}

///////////////////////////////////////////////

function renderPokemonCard(pkmn) {
  let pokedexContainer = document.getElementById("pokedex-container");
  let capname = pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1);

  let primaryType = pkmn.types.length > 0 ? pkmn.types[0].type.name : "";
  let backgroundColor = typeColors[primaryType] || "#CCCCCC";

  pokedexContainer.innerHTML += overviewContent(pkmn, capname, backgroundColor);
}

////////// GENERIERTES HTML //////////

function overviewContent(pkmn, capName, backgroundColor) {
  let primaryType = pkmn.types.length > 0 ? pkmn.types[0].type.name : "";
  let secondaryType = pkmn.types.length > 1 ? pkmn.types[1].type.name : "";

  return /* html */ `
    <div class="pkmn_card" style="background-color: ${backgroundColor};">

        <img class="pkmn_img" src="${
          pkmn.sprites.front_default}" alt="${capName}">
        <div class="pkmn_info">
          <p class="pkmn_id">#${pkmn.id}</p>
          <p>|</p>
          <p class="pkmn_name">${capName}</p>
        </div>
        <div class="pkmn_types">
          <p style="background-color: ${backgroundColor}">${primaryType}</p>
          ${secondaryType ? `<p>${secondaryType}</p>` : ""}
        </div>
    </div>
  `;
}

////////// W3 INCLUDE HTML //////////

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html"); // 'includes/header.html'
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}
