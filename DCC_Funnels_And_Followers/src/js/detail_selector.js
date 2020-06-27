
  on("clicked:repeating_heroes:selectLevel0", function() {
    console.log("Clicked Level 0");
    setAttrs({
      repeating_heroes_selectLevel0: true,
      repeating_heroes_selectInventory: false,
      repeating_heroes_selectStatus: false,
      repeating_heroes_selectAbilities: false,
      repeating_heroes_selectSpellcasting: false
    });
  });

  on("clicked:repeating_heroes:selectInventory", function() {
    console.log("Clicked Inventory");
    setAttrs({
      repeating_heroes_selectLevel0: false,
      repeating_heroes_selectInventory: true,
      repeating_heroes_selectStatus: false,
      repeating_heroes_selectAbilities: false,
      repeating_heroes_selectSpellcasting: false
    });
  });

  on("clicked:repeating_heroes:selectStatus", function() {
    console.log("Clicked Status");
    setAttrs({
      repeating_heroes_selectLevel0: false,
      repeating_heroes_selectInventory: false,
      repeating_heroes_selectStatus: true,
      repeating_heroes_selectAbilities: false,
      repeating_heroes_selectSpellcasting: false
    });
  });

  on("clicked:repeating_heroes:selectAbilities", function() {
    console.log("Clicked Abilities");
    setAttrs({
      repeating_heroes_selectLevel0: false,
      repeating_heroes_selectInventory: false,
      repeating_heroes_selectStatus: false,
      repeating_heroes_selectAbilities: true,
      repeating_heroes_selectSpellcasting: false
    });
  });

  on("clicked:repeating_heroes:selectSpellcasting", function() {
    console.log("Clicked Spellcasting");
    setAttrs({
      repeating_heroes_selectLevel0: false,
      repeating_heroes_selectInventory: false,
      repeating_heroes_selectStatus: false,
      repeating_heroes_selectAbilities: false,
      repeating_heroes_selectSpellcasting: true
    });
  });