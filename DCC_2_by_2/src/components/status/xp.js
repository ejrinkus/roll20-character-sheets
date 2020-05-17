
  function getLevel(xp) {
    if (xp < 10) {
      return 0;
    }
    if (xp < 50) {
      return 1;
    }
    if (xp < 110) {
      return 2;
    }
    if (xp < 190) {
      return 3;
    }
    if (xp < 290) {
      return 4;
    }
    if (xp < 410) {
      return 5;
    }
    if (xp < 550) {
      return 6;
    }
    if (xp < 710) {
      return 7;
    }
    if (xp < 890) {
      return 8;
    }
    if (xp < 1090) {
      return 9;
    }
    return 10;
  }

  function xpHandlers(charI) {
    on(`change:xp_${charI} sheet:opened`, function() {
      getAttrs([`xp_${charI}`], function(values) {
        setAttrs({
          [`level_${charI}`]: getLevel(values[`xp_${charI}`])
        });
      });
    });
  }