function overviewContent(pkmn, capName, backgroundColor, capitalizedTypes) {
  return /* html */ `
    <div class="pkmn_card" style="background-color: ${backgroundColor};">
      <img class="pkmn_img" src="${pkmn.sprites.front_default}" alt="${capName}">
      <div class="pkmn_info">
        <p class="pkmn_id">#${pkmn.id}</p>
        <p>|</p>
        <p class="pkmn_name">${capName}</p>
      </div>
      <div class="pkmn_types">
        <p style="background-color: ${backgroundColor}">${capitalizedTypes.primaryType}</p>
        ${capitalizedTypes.secondaryType ? `<p>${capitalizedTypes.secondaryType}</p>` : ""}
      </div>
    </div>
  `;
}