
  function deadHandlers(charI) {
    on(`clicked:dead_${charI}`, function() {
      getAttrs([`dead_${charI}`], function(values) {
        var val = "";
        if (values[`dead_${charI}`] == "alive") {
          val = "dead";
        } else {
          val = "alive";
        }
        setAttrs({
          [`dead_${charI}`]: val
        });
      });
    });
  }