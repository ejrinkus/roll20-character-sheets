
  // Parent loop over all character sheets.  Sets up the various handlers for each sheet.
  characterIndices.forEach(function(charI) {
    // Defined in char_tabs.js
    tabNames(charI);
    tabHandlers(charI);

    // Defined in mods.js
    modHandlers(charI);

    // Defined in alignment.js
    alignmentHandlers(charI);
  });