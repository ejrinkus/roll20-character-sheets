
  function deadHandlers(charI) {
    on(`clicked:status_dead_${charI}`, function() {
      getAttrs([`dead_1`, `dead_2`, `dead_3`, `dead_4`, `total_living`], function(values) {
        // Figure out the new state for charI, since that's the one that changed.
        var val = "";
        if (values[`dead_${charI}`] == "alive") {
          val = "dead";
        } else {
          val = "alive";
        }
        // Then figure out the total count of living characters.
        var count = 0;
        if (val == "alive") count = 1;
        for (var c = 1; c <= 4; c++) {
          if (c == charI) continue;
          if (values[`dead_${c}`] == "alive") count += 1;
        }
        setAttrs({
          [`dead_${charI}`]: val,
          [`total_living`]: count
        });
      });
    });
  }