
  function equipHandlers(charI) {
    on(`change:repeating_equipment${charI}:EquipType${charI}`, function() {
      getAttrs([`repeating_equipment${charI}_EquipType${charI}`], function(values) {
        setAttrs({
          [`repeating_equipment${charI}_EquipSelect${charI}`]: values[`repeating_equipment${charI}_EquipType${charI}`]
        });
      });
    });
  }