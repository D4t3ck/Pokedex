const typeColors = {
    grass: "#78c850",
    fire: "#f08030",
    water: "#6890f0",
    bug: "#a8b820",
    flying: "#a890f0",
    normal: "#a8a878",
    electric: "#f8d030",
    ice: "#98d8d8",
    fighting: "#c03028",
    poison: "#a040a0",
    ground: "#e0c068",
    psychic: "#f85888",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc",
    stellar: "#35ace7",
};

const pokedexContainer = document.getElementById('pokedex-container');

async function loadPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'; // Begrenze auf die ersten 151 Pokémon
    const response = await fetch(url);
    const data = await response.json();

    const pokemonList = data.results;

    pokemonList.forEach(async pokemon => {
        const pokemonData = await getPokemonData(pokemon.url);
        renderPokemonCard(pokemonData);
    });
}

async function getPokemonData(url) {
    const response = await fetch(url);
    return await response.json();
}

function renderPokemonCard(pokemon) {
    // Finde den deutschen Namen im Array
    const germanNameObj = pkmnNames.find(item => Object.keys(item)[0] === pokemon.name);

    // Verwende den deutschen Namen oder den englischen Namen, wenn kein deutscher Name gefunden wurde
    const germanName = germanNameObj ? Object.values(germanNameObj)[0] : pokemon.name;
    const capitalizedGermanName = germanName.charAt(0).toUpperCase() + germanName.slice(1);

    // Finde den primären Typ des Pokémon (falls vorhanden)
    const primaryType = pokemon.types.length > 0 ? pokemon.types[0].type.name : '';

    // Verwende eine Funktion, um die Hintergrundfarbe basierend auf dem Typ zu bestimmen
    const backgroundColor = typeColors[primaryType] || '#CCCCCC';

    const cardHTML = `
        <div class="pokemon-card" style="background-color: ${backgroundColor};">
            <img src="${pokemon.sprites.front_default}" alt="${germanName}">
            <p>${capitalizedGermanName}</p>
            <p>Nr. ${pokemon.id}</p>
        </div>
    `;

    pokedexContainer.innerHTML += cardHTML;
}
async function loadAndRenderPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    const response = await fetch(url);
    const data = await response.json();

    // Sortiere die Pokémon-Daten nach ihrer Nummer
    const sortedPokemonList = data.results.sort((a, b) => a.url.split('/').slice(-2, -1) - b.url.split('/').slice(-2, -1));

    for (const pokemon of sortedPokemonList) {
        const pokemonData = await getPokemonData(pokemon.url);
        renderPokemonCard(pokemonData);
    }
}

// Verwende die Funktion wie zuvor
loadAndRenderPokemon();