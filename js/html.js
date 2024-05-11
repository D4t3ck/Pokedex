function pkmnCard(pkmnData, i) {
  return /* html */ `
    <section class="pkmn_card" style="background-color: ${pkmnColor(
      pkmnData,
      0
    )}" onclick="openCard(${i})">
      <div class="pkmn_id">${pkmnId(pkmnData)}</div>
  
      <div class="pkmn_info_container">
        <div class="pkmn_info">
          <span class="pkmn_name">${pkmnName(pkmnData)}</span>
          <div class="pkmn_type" style="background-color: ${pkmnColor(
            pkmnData,
            0
          )}">${pkmnTypes(pkmnData).primaryType}</div>
          <div>${
            pkmnTypes(pkmnData).secondaryType !== ""
              ? `<div class="pkmn_type" style="background-color: ${pkmnColor(
                  pkmnData,
                  1
                )}">${pkmnTypes(pkmnData).secondaryType}</div>`
              : ""
          } 
          </div>
        </div>
  
        <img id="frontImg_${i}" class="pkmn_img_front" src="${pkmnImg(
    pkmnData
  )}" alt="Pokemon Front Picture" onclick="toggleImages(${i}, event)" />
        
        <img id="backImg_${i}" class="pkmn_img_back d_none" src="${pkmnImgBack(
    pkmnData
  )}" alt="Pokemon Back Picture" onclick="toggleImages(${i}, event)" >

     </div>
    </section>
      `;
}

function openDetailCard(currentCard) {
  return /* html */ `
  <section style="background-color: ${pkmnColor(currentCard, 0)}" class="detail_container" onclick="doNotClose(event)">
  
    <img class="close" src="assets/img/close.png" alt="Close" onclick="closeCard()">

    <div class="detail_info_container">
      <div class="detail_info">
        <div class="detail_name">${pkmnName(currentCard)}</div>
        <div class="detail_id">${pkmnId(currentCard)}</div>
      </div>

      <div class="type_container" style="border: solid 1px red">
        <div class="detail_type" style="background-color: ${pkmnColor(
        currentCard,
        0
        )}">${pkmnTypes(currentCard).primaryType}</div>
        <div>${
        pkmnTypes(currentCard).secondaryType !== ""
          ? `<div class="detail_type" style="background-color: ${pkmnColor(
              currentCard,
              1
            )}">${pkmnTypes(currentCard).secondaryType}</div>`
          : ""} </div>
      </div>
    
      
    </div>

    <img class="detail_img" src="${pkmnImg2(currentCard)}">

  </section>
  `;
}
