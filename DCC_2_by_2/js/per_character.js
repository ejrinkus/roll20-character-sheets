
  // Parent loop over all character sheets.  Sets up the various handlers for each sheet.
  characterIndices.forEach(function(charI) {
    // Defined in char_tabs.js
    tabHandlers(charI);

    // Defined in mods.js
    modHandlers(charI);

    // Defined in alignment.js
    alignmentHandlers(charI);

    // Defined in birth_augurs.js
    augurHandlers(charI);
  });