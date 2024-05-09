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
  
        <img src="${pkmnImg(pkmnData)}" alt="Pokemon" />
     </div>
    </section>
      `;
}
