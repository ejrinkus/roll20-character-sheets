
  const characterIndices = ["1", "2", "3", "4"];
  const alignmentRadioValues = ["lawful","neutral","chaotic"];

  characterIndices.forEach(function(charI) {
    alignmentRadioValues.forEach(function(value) {
      on(`clicked:alignment_${value}_${charI}`, function() {
        setAttrs({
          [`alignment_${charI}`]: value
        });
      });
    })
  });