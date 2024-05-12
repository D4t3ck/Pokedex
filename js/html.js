function pkmnCard(pkmnData, i) {
  return /* html */ `
    <section class="pkmn_card" style="background-color: ${pkmnColor(pkmnData, 0)}" onclick="openCard(${i})">
      <div class="pkmn_id">${pkmnId(pkmnData)}</div>
  
      <div class="pkmn_info_container">
        <div class="pkmn_info">
          <span class="pkmn_name">${pkmnName(pkmnData)}</span>
          <div class="pkmn_type" style="background-color: ${pkmnColor(pkmnData, 0)}">${pkmnTypes(pkmnData).primaryType}</div>
          ${
            pkmnTypes(pkmnData).secondaryType !== ""
              ? `<div class="pkmn_type" style="background-color: ${pkmnColor(pkmnData, 1)}">${pkmnTypes(pkmnData).secondaryType}</div>`
              : ""
          } 
        </div>
  
        <img id="frontImg_${i}" class="pkmn_img_front" src="${pkmnImg(pkmnData)}" alt="Pokemon Front Picture" onclick="toggleImages(${i}, event)" />
        
        <img id="backImg_${i}" class="pkmn_img_back d_none" src="${pkmnImgBack(pkmnData)}" alt="Pokemon Back Picture" onclick="toggleImages(${i}, event)" >
      </div>
    </section>
  `;
}


function openDetailCard(currentCard) {
  return /* html */ `
    <section style="background-color: ${pkmnColor(currentCard, 0)}" class="detail_container" onclick="doNotClose(event)">

      <div class="close" src="assets/img/close.png" alt="Close" onclick="closeCard()">&#x0058;</div>

      <div class="detail_info_container">
        <div class="detail_head">
          <div class="detail_id">${pkmnId(currentCard)}</div>
          <div class="detail_name">${pkmnName(currentCard)}</div>
        </div>

        <div class="type_container">
          <div class="detail_type" style="background-color: ${pkmnColor(currentCard, 0)}">${pkmnTypes(currentCard).primaryType}</div>
          ${
            pkmnTypes(currentCard).secondaryType !== ""
              ? `<div class="detail_type" style="background-color: ${pkmnColor(currentCard, 1)}">${pkmnTypes(currentCard).secondaryType}</div>`
              : ""
          }
          <img class="shiny_img" src="assets/img/shiny_icon.png">
        </div>
      </div>

      <div class="img_container">
        <img class="detail_img" src="${pkmnImg2(currentCard)}">
      </div>

    </section>`;
}

