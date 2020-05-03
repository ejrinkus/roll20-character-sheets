
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