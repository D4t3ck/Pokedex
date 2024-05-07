let pkmnDataArray = [];
let count = 52;
let startCount = 1;

async function loadMore() {
  count += 50;
  startCount += 50;
  console.log("aktueller Count", count);
  await renderPkmnData();
}

async function renderPkmnData() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = startCount; i < count; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    let pkmnData = await response.json();
    pkmnDataArray.push(pkmnData);

    content.innerHTML += /* html */ `
    <section class="pkmn_card_container"
    style="background-color: ${pkmnColor(pkmnData, 0)}"
    >
      <div class="pkmn_id">${pkmnId(pkmnData)}</div>
      <div class="pkmn_card">

      <span>${pkmnName(pkmnData)}</span>

      <div class="type1" style="background-color: ${pkmnColor(pkmnData, 0)}">
      ${pkmnType1(pkmnData)}
      </div>
      
      <div class="type2" style="background-color: ${pkmnColor(pkmnData, 1)}">
      ${pkmnType2(pkmnData)}
      </div>

      <img src="${pkmnImg(pkmnData)}" alt="Pokemon">
    
      </div>

    </section>
    `;
  }
}

// HILFSFUNKTIONEN //

let pkmnId = (pkmnData) => {
  return `#${pkmnData.id.toString().padStart(3, "0")}`;
};

let pkmnName = (pkmnData) => {
  return pkmnData.name.charAt(0).toUpperCase() + pkmnData.name.slice(1);
};

let capitalizeTypes = (pkmnData) => {
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

let pkmnColor = (pkmnData, typeNumber) => {
  let type = pkmnData.types[typeNumber]
    ? pkmnData.types[typeNumber].type.name
    : "";
  let backgroundColor = typeColors[type] || "#CCCCCC";
  return backgroundColor;
};

let pkmnImg = (pkmnData) => {
  return pkmnData.sprites.front_default;
};

let pkmnType1 = (pkmnData) => {
  return pkmnData.types[0].type.name;
};

let pkmnType2 = (pkmnData) => {
  return pkmnData.types[1] ? pkmnData.types[1].type.name : "";
};
