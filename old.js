function init() {
  fetchApi();
  includeHTML();
  renderContent(limit);
}

let offset = 0;
let limit = 50;

async function loadMore() {
  offset += limit;
  await renderContent(limit);
}

async function fetchApi() {
  let url = "https://pokeapi.co/api/v2/pokemon/62";
  let response = await fetch(url);
  data = await response.json();
  // console.log(" %c Loaded pokemon", 'color: orange');
  // console.log(data);
}

async function renderContent(numberToLoad) {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${numberToLoad}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();

  for (let i = 0; i < data.results.length; i++) {
    let pokemon = data.results[i];
    let response = await fetch(pokemon.url);
    pkmn = await response.json();

    pokeName = pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1);
    pokeId = `#${pkmn.id.toString().padStart(3, "0")}`;
    pokeImg = pkmn.sprites.front_default;
    pokeType1 = pkmn.types[0].type.name;
    pokeType2 = pkmn.types[1] ? pkmn.types[1].type.name : "";
    renderCards(pkmn, i);
  }

  // console.log('Dataload', data.results);
}

////////// RENDER OVERVIEW //////////

function renderCards(pkmn, i) {
  let backgroundColor1 = pkmnColor(pkmn, 0);
  let backgroundColor2 = pkmnColor(pkmn, 1);

  let pokeName = capitalizeNames(pkmn);
  let { primaryType, secondaryType } = capitalizeTypes(pkmn);
  let pokeId = `#${pkmn.id.toString().padStart(3, "0")}`;
  let pokeImg = pkmn.sprites.front_default;

  document.getElementById("content").innerHTML += overviewHTML(
    i,
    pokeId,
    pokeName,
    backgroundColor1,
    primaryType,
    backgroundColor2,
    secondaryType,
    pokeImg
  );
}

////////// RENDER DETAIL CARD //////////

let currentPkmn;

async function openPkmnCard(i) {
  let url = `https://pokeapi.co/api/v2/pokemon/${offset + i + 1}`;
  let response = await fetch(url);
  currentPkmn = await response.json();
  let backgroundColor1 = pkmnColor(currentPkmn, 0);
  let backgroundColor2 = pkmnColor(currentPkmn, 1);
  let { primaryType, secondaryType } = capitalizeTypes(currentPkmn);
  pokeName =
    currentPkmn.name.charAt(0).toUpperCase() + currentPkmn.name.slice(1);
  pokeId = `#${currentPkmn.id.toString().padStart(3, "0")}`;
  pokeImg = currentPkmn.sprites.other["official-artwork"].front_default;
  pokeType1 = currentPkmn.types[0].type.name;
  pokeType2 = currentPkmn.types[1] ? currentPkmn.types[1].type.name : "";

  document.getElementById("pkmnCard").style.display = "flex";
  document.getElementById("pkmnCard").innerHTML = createCardHTML(
    i,
    backgroundColor1,
    backgroundColor2,
    primaryType,
    secondaryType,
    pokeName,
    pokeId,
    pokeImg
  );

  if (currentPkmn.id == 1) {
    document.getElementById("toggleLeft").style.display = "none";
  }
  renderChart();
}

////////// HILFSFUNKTIONEN //////////

let pkmnColor = (pkmn, typeNumber) => {
  let type = pkmn.types[typeNumber] ? pkmn.types[typeNumber].type.name : "";
  let backgroundColor = typeColors2[type] || "#CCCCCC";
  return backgroundColor;
};

let capitalizeNames = (pkmn) => {
  let capName = pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1);
  return capName;
};

let capitalizeTypes = (pkmn) => {
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
};

function closeCard() {
  document.getElementById("pkmnCard").style.display = "none";
}

function doNotClose(event) {
  event.stopPropagation();
}

function switchLeft(i) {
  if (i > 0) {
    openPkmnCard(i - 1);
  }
}

function switchRight(i) {
  if (i < limit - 1 && i < offset + limit - 1) {
    openPkmnCard(i + 1);
  }
}

function searchAlert() {
  alert("Das sind nicht die Androiden die Du suchst!");
}

{
  return /* html */ `
            <section class="pkmn_card" style="background-color: ${backgroundColor1}" onclick="openPkmnCard(${i})">
                <div class="pkmn_id">${pokeId}</div>
                <div class="pkmn_info_container">
                    <div class="pkmn_info">
                        <p>${pokeName}</p>
                        <div style="background-color: ${backgroundColor1}">${primaryType}</div>
                        ${
                          pokeType2
                            ? `<div style="background-color: ${backgroundColor2}">${secondaryType}</div>`
                            : ""
                        }
                    </div>
                    <img src="${pokeImg}" alt="Pokemon">
                </div>
            </section>
            `;
}
