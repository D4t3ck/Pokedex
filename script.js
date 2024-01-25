let offset = 0;
let limit = 50;

function init() {
  includeHTML();
  loadPokemon(limit);
  myModal();
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
  let pokedexContainer = document.getElementById("pokedexContainer");
  let capname = pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1);
  let primaryType = pkmn.types.length > 0 ? pkmn.types[0].type.name : "";
  let backgroundColor = typeColors[primaryType] || "#CCCCCC";

  pokedexContainer.innerHTML += overviewContent(pkmn, capname, backgroundColor);
}

function capitalizeTypes(pkmn) {
  let primaryType =
    pkmn.types.length > 0
      ? pkmn.types[0].type.name.charAt(0).toUpperCase() +
        pkmn.types[0].type.name.slice(1)
      : "";
  let secondaryType =
    pkmn.types.length > 1
      ? pkmn.types[1].type.name.charAt(0).toUpperCase() +
        pkmn.types[1].type.name.slice(1)
      : "";

  return { primaryType, secondaryType };
}

function renderModal() {
  let modal = document.getElementById('myModal');
  
}

function myModal() {
  let modal = document.getElementById("myModal");

  let btn = document.getElementById("pokedexContainer");

  let span = document.getElementsByClassName("close")[0];

  btn.onclick = () => {
    modal.style.display = "block";
  };

  span.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
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
