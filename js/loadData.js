let pkmnDataArray = [];
let currentCard = [];
let count = 51;
let startCount = 1;
let i = 0;

/**
 * Renders Pokémon data onto the webpage.
 */
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

/**
 * Opens a detailed view of a Pokémon card.
 * @param {number} i - The index of the Pokémon card.
 */
async function openCard(i) {
  let card = document.getElementById("detailCard");
  card.classList.remove("d_none");
  setModalState(true);

  let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  let response = await fetch(url);
  currentCard = await response.json();

  card.innerHTML = openDetailCard(currentCard, i);
  renderChart();
  stopSwitchLeft(i);
}

/**
 * Asynchronous function to load more Pokémon data.
 * Increases the count by 50, renders the Pokémon data, and enables the load more button after rendering.
 * @async
 * @returns {Promise<void>} A Promise that resolves once the Pokémon data is rendered.
 */
async function loadMore() {
  let button = document.getElementById("loadMore");
  button.classList.add("hidden");
  count += 50;
  startCount += 50;
  await renderPkmnData();
  button.classList.remove("hidden");
}

/**
 * Hides the left arrow if the provided index is 1.
 * @param {number} i - The index to determine whether to hide the left arrow.
 * @returns {void}
 */
function stopSwitchLeft(i) {
  if (i === 1) {
    document.getElementById("arrowLeft").classList.add("hidden");
  }
}

/**
 * Switches to the left adjacent Pokémon card.
 * @param {number} i - The index of the current Pokémon card.
 */
function switchLeft(i) {
  openCard(--i);
}

/**
 * Switches to the right adjacent Pokémon card.
 * @param {number} i - The index of the current Pokémon card.
 */
function switchRight(i) {
  openCard(++i);
}

/**
 * Prevents the Pokémon card detail from closing when clicked.
 * @param {Event} e - The event object.
 */
function doNotClose(e) {
  e.stopPropagation();
}

// Data Functions //

/**
 * Retrieves the Pokémon ID.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The Pokémon ID.
 */
let pkmnId = (pkmnData) => {
  return `#${pkmnData.id.toString().padStart(3, "0")}`;
};

/**
 * Retrieves the Pokémon name.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The Pokémon name.
 */
let pkmnName = (pkmnData) => {
  return pkmnData.name.charAt(0).toUpperCase() + pkmnData.name.slice(1);
};

/**
 * Retrieves the color associated with the Pokémon type.
 * @param {Object} pkmnData - The Pokémon data object.
 * @param {number} typeNumber - The index of the type.
 * @returns {string} The color associated with the Pokémon type.
 */
let pkmnColor = (pkmnData, typeNumber) => {
  let type = pkmnData.types[typeNumber]
    ? pkmnData.types[typeNumber].type.name
    : "";
  let backgroundColor = typeColors[type] || "#CCCCCC";
  return backgroundColor;
};

/**
 * Retrieves the Pokémon types.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {Object} An object containing the primary and secondary Pokémon types.
 */
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

/**
 * Retrieves the front image URL of the Pokémon.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The URL of the front image of the Pokémon.
 */
let pkmnImg = (pkmnData) => {
  return pkmnData.sprites.front_default;
};

/**
 * Retrieves the back image URL of the Pokémon.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The URL of the back image of the Pokémon.
 */
let pkmnImgBack = (pkmnData) => {
  return pkmnData.sprites.back_default;
};

/**
 * Retrieves the official artwork front image URL of the Pokémon.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The URL of the official artwork front image of the Pokémon.
 */
let pkmnImg2 = (pkmnData) => {
  return pkmnData.sprites.other["official-artwork"].front_default;
};

/**
 * Retrieves the shiny front image URL of the Pokémon.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The URL of the shiny front image of the Pokémon.
 */
let pkmnImgShiny = (pkmnData) => {
  return pkmnData.sprites.other["official-artwork"].front_shiny;
};

/**
 * Retrieves the GIF image URL of the Pokémon.
 * @param {Object} pkmnData - The Pokémon data object.
 * @returns {string} The URL of the GIF image of the Pokémon.
 */
let pkmnImgGif = (pkmnData) => {
  return pkmnData.sprites.other.showdown.front_default;
};
