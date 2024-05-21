let pkmnDataArray = [];
let currentCard = [];
let count = 51;
let startCount = 1;
let i = 0;

async function fetchApi() {
  let url = "https://pokeapi.co/api/v2/pokemon/1";
  let response = await fetch(url);
  data = await response.json();
  console.log(" %c Loaded pokemon", "color: orange");
  console.log(data);
}

async function renderPkmnData() {
  let content = document.getElementById("content");

  for (let i = startCount; i < count; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pkmnData = await response.json();

    pkmnDataArray.push(pkmnData);

    content.innerHTML += pkmnCard(pkmnData, i);
  }
}

async function openCard(i) {
  let card = document.getElementById("detailCard");
  card.classList.remove("d_none");
  setModalState(true);

  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentCard = await response.json();

  card.innerHTML = openDetailCard(currentCard, i);
  renderChart();
}

// Executable Functions //

async function loadMore() {
  count += 50;
  startCount += 50;
  await renderPkmnData();
}

function switchLeft(i) {
  openCard(--i);
}

function switchRight(i) {
  openCard(++i);
}

function doNotClose(e) {
  e.stopPropagation();
}

// Data Functions //

let pkmnId = (pkmnData) => {
  return `#${pkmnData.id.toString().padStart(3, "0")}`;
};

let pkmnName = (pkmnData) => {
  return pkmnData.name.charAt(0).toUpperCase() + pkmnData.name.slice(1);
};

let pkmnColor = (pkmnData, typeNumber) => {
  let type = pkmnData.types[typeNumber]
    ? pkmnData.types[typeNumber].type.name
    : "";
  let backgroundColor = typeColors3[type] || "#CCCCCC";
  return backgroundColor;
};

let pkmnTypes = (pkmnData) => {
  let primaryType =
    pkmnData.types.length > 0
      ? pkmnData.types[0].type.name.charAt(0).toUpperCase() +
        pkmnData.types[0].type.name.slice(1)
      : "";
  let secondaryType =
    pkmnData.types.length > 1
      ? pkmnData.types[1].type.name.charAt(0).toUpperCase() +
        pkmnData.types[1].type.name.slice(1)
      : "";

  return { primaryType, secondaryType };
};

let pkmnImg = (pkmnData) => {
  return pkmnData.sprites.front_default;
};

let pkmnImgBack = (pkmnData) => {
  return pkmnData.sprites.back_default;
};

let pkmnImg2 = (pkmnData) => {
  return pkmnData.sprites.other["official-artwork"].front_default;
};

let pkmnImgShiny = (pkmnData) => {
  return pkmnData.sprites.other["official-artwork"].front_shiny;
};

let pkmnImgGif = (pkmnData) => {
  return pkmnData.sprites.other.showdown.front_default;
};
