
  characterIndices.forEach(function(charI) {
    alignments.forEach(function(alignment) {
      on(`clicked:alignment_${alignment}_${charI}`, function() {
        setAttrs({
          [`alignment_${charI}`]: alignment
        });
      });
    })
  });