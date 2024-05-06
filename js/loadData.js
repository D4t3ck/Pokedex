let pkmnData;
let pkmnDataCard;
let count = 40;
let startCount = 1;

async function loadPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon/1";
  let response = await fetch(url);
  currentPokemon = await response.json();
  console.log("Loaded pokemon", currentPokemon);
}

function loadMore() {
  count += 40;
  startCount += 40;
  console.log("aktueller Count", count);
  renderPkmnData();
}

async function renderPkmnData() {
  for (let i = startCount; i < count; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    pkmnData = await response.json();
    pkmnName = pkmnData.name.charAt(0).toUpperCase() + pkmn.name.slice(1);
    pkmnId = `#${pkmnData.id.toString().padStart(3, "0")}`;
    pkmnImg = pkmnData.sprites.front_default;
    pkmnType1 = pkmnData.types[0].type.name;
    pkmnType2 = pkmnData.types[1] ? pkmn.types[1].type.name : "";
  }
}
