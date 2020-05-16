
  function augurHandlers(charI) {
    on(`change:augur_${charI} sheet:opened`, function() {
      getAttrs([`augur_${charI}`], function(values) {
        augur = parseInt(values[`augur_${charI}`],10)||0;
        if (augur < 0) {
          augur = 0;
          setAttrs({
            [`augur_${charI}`]: augur,
            [`augur_desc_${charI}`]: birthAugurs[augur]
          });
        } else if (augur > 30) {
          augur = 30;
          setAttrs({
            [`augur_${charI}`]: augur,
            [`augur_desc_${charI}`]: birthAugurs[augur]
          });
        } else {
          setAttrs({
            [`augur_desc_${charI}`]: birthAugurs[augur]
          });
        }
      });
    });
  }