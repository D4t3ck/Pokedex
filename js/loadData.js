let pkmnDataArray = [];
let count = 51;
let startCount = 1;

async function renderPkmnData() {
  let content = document.getElementById("content");

  for (let i = startCount; i < count; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pkmnData = await response.json();
    pkmnDataArray.push(pkmnData);

    content.innerHTML += pkmnCard(pkmnData);
  }
}

async function loadMore() {
  count += 50;
  startCount += 50;
  renderPkmnData();
}

// HILFSFUNKTIONEN //

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
