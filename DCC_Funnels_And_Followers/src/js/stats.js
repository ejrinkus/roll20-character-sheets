
  
  const attributes = ["strength",
    "stamina",
    "agility",
    "personality",
    "intelligence",
    "luck"];
  const attrKeys = attributes.map(attr => `repeating_heroes_${attr}`);
  const attrEvents = attributes.map(attr => `change:repeating_heroes:${attr}`).join(' ') + " sheet:opened";
  const hpKeys = [...Array(11).keys()].map(i => `repeating_heroes_basehp${i}`);
  const hpEvents = [...Array(11).keys()].map(i => `change:repeating_heroes:basehp${i}`).join(' ');
  
  // Stat modifiers, indexed by the score value.  Note that the table in the rules goes
  // from 3-18, so additional -3 mods are prepended at positions 0, 1, and 2 to faciliitate
  // simpler logic.
  // Anything below 0 is -3.
  // Anything above 18 follows this formula: floor((value - 18) / 2) + 3
  var modList = [-3, -3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3];
  function getMod(attr, values) {
    var value = parseInt(values[`repeating_heroes_${attr}`]) || 0;
    if (value < 0) {
      return modList[0];
    } else if (value > 18) {
      return Math.floor((value - 18) / 2) + 3;
    } else {
      return modList[value];
    }
  }

  // Updates the hp, hpmax, and basehptotal attributes based on the current state of the sheet.
  function updateHp() {
    getAttrs(hpKeys.concat(["repeating_heroes_stamina",
                            "repeating_heroes_hp",
                            "repeating_heroes_hpmax"]), function (values) {
      var updates = {};

      var staMod = getMod("stamina", values);
      var baseTotal = hpKeys.map(key => parseInt(values[key])||0).reduce((sum, val) => sum + val);
      updates["repeating_heroes_basehptotal"] = baseTotal;

      var newMax = baseTotal + staMod;
      if (newMax < 1) newMax = 1;
      updates["repeating_heroes_hpmax"] = newMax;

      var current = parseInt(values["repeating_heroes_hp"]) || 0;
      var oldMax = parseInt(values["repeating_heroes_hpmax"]) || 0;
      current += (newMax - oldMax);
      if (current < 0) current = 0;
      if (current > newMax) current = newMax;
      updates["repeating_heroes_hp"] = current;

      setAttrs(updates);
    });
  }

  // Updates the ac attribute based on the current state of the sheet.
  function updateAc() {
    getAttrs(["repeating_heroes_agility"], function (values) {
      var updates = {};
      updates["repeating_heroes_ac"] = 10 + getMod("agility", values);
      setAttrs(updates);
    });
  }

  // Updates the initiative attribute based on the current state of the sheet.
  function updateIni() {
    getAttrs(["repeating_heroes_agility"], function (values) {
      var updates = {};
      updates["repeating_heroes_initiative"] = getMod("agility", values);
      setAttrs(updates);
    });
  }

  // Updates the three saves based on the current state of the sheet.
  function updateSaves() {
    getAttrs(["repeating_heroes_stamina",
              "repeating_heroes_agility",
              "repeating_heroes_personality"], function (values) {
      var updates = {};
      updates["repeating_heroes_forsave"] = getMod("stamina", values);
      updates["repeating_heroes_refsave"] = getMod("agility", values);
      updates["repeating_heroes_wilsave"] = getMod("personality", values);
      setAttrs(updates);
    });
  }

  // Listener for any of the base attributes changing.
  on(attrEvents, function () {
    getAttrs(attrKeys, function (values) {
      var updates = {};

      // Modifier updates
      attributes.forEach(attr => updates[`repeating_heroes_${attr}mod`] = getMod(attr, values));

      setAttrs(updates);
    });
    updateHp();
    updateAc();
    updateIni();
    updateSaves();
  });

  // Listener for any of the base HP rolls being entered.
  on(hpEvents, function () {
    updateHp();
  });