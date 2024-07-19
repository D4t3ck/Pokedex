/**
 * Generates HTML markup for a Pokémon card.
 * @param {Object} pkmnData - The Pokémon data object.
 * @param {number} i - The index of the Pokémon card.
 * @returns {string} The HTML markup for the Pokémon card.
 */
function pkmnCard(pkmnData, i) {
  return /* html */ `
    <section class="pkmn_card" style="background-color: ${pkmnColor(
      pkmnData,
      0
    )}" >
      <img class="open_card" onclick="openCard(${i})" src="assets/img/open_card.png" alt="Open Card">
      <div class="card_head">
        <div class="pkmn_id">${pkmnId(pkmnData)}</div>
      </div>
  
      <div class="pkmn_info_container">
        <div class="pkmn_info">
          <span onclick="openCard(${i})" class="pkmn_name">${pkmnName(pkmnData)}</span>
          <div class="pkmn_type" style="background-color: ${pkmnColor(
            pkmnData,
            0
          )}">${pkmnTypes(pkmnData).primaryType}</div>
            ${
              pkmnTypes(pkmnData).secondaryType !== ""
                ? `<div class="pkmn_type" style="background-color: ${pkmnColor(
                    pkmnData,
                    1
                  )}">${pkmnTypes(pkmnData).secondaryType}</div>`
                : ""
            } 
        </div>
  
        <img id="frontImg_${i}" class="pkmn_img_front" src="${pkmnImg(
    pkmnData
  )}" alt="Pokemon Front Picture" onclick="turnPkmn(${i}, event)" />
        
        <img id="backImg_${i}" class="pkmn_img_back d_none" src="${pkmnImgBack(
    pkmnData
  )}" alt="Pokemon Back Picture" onclick="turnPkmn(${i}, event)" >

      </div>
    </section>
  `;
}

/**
 * Generates HTML markup for the detailed view of a Pokémon card.
 * @param {Object} currentCard - The Pokémon data object for the current card.
 * @param {number} i - The index of the Pokémon card.
 * @returns {string} The HTML markup for the detailed view of the Pokémon card.
 */
function openDetailCard(currentCard, i) {
  return /* html */ `
    <section style="background-color: ${pkmnColor(
      currentCard,
      0
    )}" class="detail_container" onclick="doNotClose(event)">
      <div class="close" src="assets/img/close.png" alt="Close" onclick="closeCard()">&#x0058;</div>
      <div class="detail_info_container">
        <div class="detail_head">
          <div class="detail_id">${pkmnId(currentCard)}</div>
          <div class="detail_name">${pkmnName(currentCard)}</div>
        </div>
        <div class="type_container">
          <div class="detail_type" style="background-color: ${pkmnColor(
            currentCard,
            0
          )}">${pkmnTypes(currentCard).primaryType}</div>
            ${
              pkmnTypes(currentCard).secondaryType !== ""
                ? `<div class="detail_type" style="background-color: ${pkmnColor(
                    currentCard,
                    1
                  )}">${pkmnTypes(currentCard).secondaryType}</div>`
                : ""
            }
          <img class="shiny_btn" src="assets/img/shiny_icon.png" onclick="showShiny(${i})">
        </div>
      </div>

      <hr>

      <div class="img_container">
        <div id="arrowLeft" class="${switchLeft}" onclick="switchLeft(${i})">&lt;</div>

        <img id="detailImg_${i}" class="detail_img" src="${pkmnImg2(
    currentCard
  )}" alt="Pokemon Image">

        <img id="shinyImg_${i}" class="detail_img d_none" src="${pkmnImgShiny(
    currentCard
  )}" alt="Pokemon Shiny Image">

        <div id="arrowRight" onclick="switchRight(${i})">&gt;</div>
      </div>

      <div class="statsContainer">
      <canvas id="myChart" ></canvas>
      </div>

    </section>`;
}
