
  function getMod(val) {
    if (val >= 18) {
      return 3;
    }
    if (val >= 16) {
      return 2;
    }
    if (val >= 13) {
      return 1;
    }
    if (val >= 9) {
      return 0;
    }
    if (val >= 6) {
      return -1;
    }
    if (val >= 4) {
      return -2;
    }
    return -3;
  }
  
  function equipHandlers(charI) {
    attributes.forEach(function(attr) {
      on(`change:${attr}_${charI} sheet:opened`, function() {
        getAttrs([`${attr}_${charI}`], function(values) {
          setAttrs({
            [`${attr}_${charI}_mod`]: getMod(values[`${attr}_${charI}`])
          });
        });
      });
    })
  }