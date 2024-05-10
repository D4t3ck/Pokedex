let pkmnDataArray = [];
let currentCard = [];
let count = 51;
let startCount = 1;

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
  card.classList.add("d_flex");

  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentCard = await response.json();

  card.innerHTML += /* html */ `
    <section style="background-color: ${pkmnColor(
      currentCard,
      0
    )}" class="card_container" onclick="doNotClose(event)">
    
    <img src="assets/img/close.png" alt="Close" onclick="closeCard()">

    <div class="pkmn_info_container">
      <div class="pkmn_info">
        <div class="pkmn_name">${pkmnName(currentCard)}</div>
        <div class="pkmn_id">${pkmnId(currentCard)}</div>
      </div>

      <div>
        <div class="pkmn_type" style="background-color: ${pkmnColor(
          currentCard,
          0
        )}">${pkmnTypes(currentCard).primaryType}</div>
        <div>${
          pkmnTypes(currentCard).secondaryType !== ""
            ? `<div class="pkmn_type" style="background-color: ${pkmnColor(
                currentCard,
                1
              )}">${pkmnTypes(currentCard).secondaryType}</div>`
            : ""
        } 
        </div>
      </div>
      
      <img src="${pkmnImg2(currentCard)}">

    </div>

    </section>
    `;
}

async function loadMore() {
  count += 50;
  startCount += 50;
  await renderPkmnData();
}

function doNotClose(e) {
  e.stopPropagation();
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

let pkmnImg2 = (pkmnData) => {
  return pkmnData.sprites.other["official-artwork"].front_default
};
