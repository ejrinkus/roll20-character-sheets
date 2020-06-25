var statList = [
  "strength",
  "stamina",
  "agility",
  "personality",
  "intelligence",
  "luck"
];

// Stat modifiers, indexed by the score value.  Note that the table in the rules goes
// from 3-18, so additional -3 mods are prepended at positions 0, 1, and 2 to faciliitate
// simpler logic.
// Anything below 0 is -3.
// Anything above 18 follows this formula: floor((value - 18) / 2) + 3
var modList = [-3, -3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3];

statList.forEach((stat) => {
  on(`change:${stat} sheet:opened`, function() {
    getAttrs([stat], function(values) {
      var newVal = values[stat]||0;
      var newMod = 0;
      if (newVal < 0) {
        newMod = modList[0];
      } else if (newVal > 18) {
        newMod = Math.floor((value - 18) / 2) + 3;
      } else {
        newMod = modList[newVal];
      }
      setAttrs({
        [`${stat}-mod`]: newMod
      });
    });
  });
})