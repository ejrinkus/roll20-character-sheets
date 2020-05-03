
  // Set tab text to the name of the corresponding character.
  function tabNames(charI) {
    on(`change:name_${charI} sheet:opened`, function() {
      getAttrs([`name_${charI}`], function(names) {
        console.log("got name " + names[`name_${charI}`]);
        setAttrs({
          [`${charI}_tab_text`]: names[`name_${charI}`]
        });
      });
    });
  }

  // Display the correct sheet.
  function tabHandlers(charI) {
    on(`clicked:${charI}_tab`, function() {
      getAttrs([`name_${charI}`], function(values) {
        setAttrs({
          ["character"]: charI
        });
      });
    });
  }