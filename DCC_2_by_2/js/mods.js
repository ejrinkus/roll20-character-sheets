
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

  function modHandlers(charI) {
    attributes.forEach(function(attr) {
      on(`change:${attr}_cur_${charI} sheet:opened`, function() {
        getAttrs([`${attr}_cur_${charI}`], function(values) {
          setAttrs({
            [`${attr}_mod_${charI}`]: getMod(values[`${attr}_cur_${charI}`])
          });
        });
      });
    })
  }