
  // Constant prefix due to the fact that all attributes are inside a repeating section.
  const prefix = "repeating_heroes";

  // List of the 6 primary ability scores.
  const abilityScores = ["strength",
    "stamina",
    "agility",
    "personality",
    "intelligence",
    "luck"];

  // List of all the birth augur descriptions, indexed by the d30 roll that they're mapped to.
  const birthAugurs = [
    "<-- Enter your birth augur roll",
    "Harsh winter: All attack rolls",
    "The bull: Melee attack rolls",
    "Fortunate date: Missile fire attack rolls",
    "Raised by wolves: Unarmed attack rolls",
    "Conceived on horseback: Mounted attack rolls",
    "Born on the battlefield: Damage rolls",
    "Path of the bear: Melee damage rolls",
    "Hawkeye: Missile fire damage rolls",
    "Pack hunter: Attack and damage rolls for 0-level starting weapon",
    "Born under the loom: Skill checks (including thief skills)",
    "Fox’s cunning: Find/disable traps",
    "Four-leafed clover: Find secret doors",
    "Seventh son: Spell checks",
    "The raging storm: Spell damage",
    "Righteous heart: Turn unholy checks",
    "Survived the plague: Magical healing*",
    "Lucky sign: Saving throws",
    "Guardian angel: Savings throws to escape traps",
    "Survived a spider bite: Saving throws against poison",
    "Struck by lightning: Reflex saving throws",
    "Lived through famine: Fortitude saving throws",
    "Resisted temptation: Willpower saving throws",
    "Charmed house: Armor Class",
    "Speed of the cobra: Initiative",
    "Bountiful harvest: Hit points (applies at each level)",
    "Warrior’s arm: Critical hit tables**",
    "Unholy house: Corruption rolls",
    "The Broken Star: Fumbles**",
    "Birdsong: Number of languages",
    "Wild child: Speed (each +1/-1 = +5’/-5’ speed)"
  ]
  
  // Stat modifiers, indexed by the score value.  Note that the table in the rules goes
  // from 3-18, so additional -3 mods are prepended at positions 0, 1, and 2 to faciliitate
  // simpler logic.
  // Anything below 0 is -3.
  // Anything above 18 follows this formula: floor((value - 18) / 2) + 3
  var modList = [-3, -3, -3, -3, -2, -2, -1, -1, -1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 3];

  // Each of these attributes are input attributes: they are tied to editable inputs on
  // the character sheet.  Nothing should automatically update these attributes.  Rather,
  // if any of them are changed by the user, then the sheet gets recalculated based on
  // the current values of these attributes.
  //
  // Exceptions:
  //  - 'hp': This field must remain in the range [0, hpmax].  If it goes outside that
  //    range, it will be updated to be either 0 (if negative) or hpmax (if greater than
  //    hpmax)
  //  - 'augurroll': Same as HP, but the range is [0, 30].  Note that 0 indicates no
  //    augur has been selected.
  const inputAttributes = [
    "level", "movement",
    "basehp0", "basehp1", "basehp2", "basehp3", "basehp4", "basehp5",
    "basehp6", "basehp7", "basehp8", "basehp9", "basehp10", "hp",
    "augurmod", "augurroll",
    "strengthbase", "staminabase", "agilitybase", "personalitybase", "intelligencebase", "luckbase",
    "strengthbonus", "staminabonus", "agilitybonus", "personalitybonus", "intelligencebonus", "luckbonus",
  ];
  // If any of the above attributes changes, we need to recalculate the sheet.  Additionally,
  // we should recalculate when the sheet is opened too.
  const recalcEvents = inputAttributes.map(attr => `change:${prefix}:${attr}`).join(' ');
  // We also need to retrieve the current values of all of the above attributes to properly
  // recalculate the sheet.
  const inputKeys = inputAttributes.map(attr => `${prefix}_${attr}`);

  // Converts an ability score to the correct modifier.
  function toMod(score) {
    if (score < 0) {
      return modList[0];
    } else if (score > 18) {
      return Math.floor((score - 18) / 2) + 3;
    } else {
      return modList[score];
    }
  }

  // Listener for any of the base attributes changing.  Note that any numbers coming from
  // the |values| object are sanitized using `parseInt(value)||0`.  This ensures they are
  // correctly treated as numbers and not strings.
  //
  // This same technique is not used when retrieving numbers from the |updates| object,
  // because those values get properly sanitized before entering them into the object.
  on(recalcEvents, function () {
    getAttrs(inputKeys, function (values) {
      var updates = {};

      // The very first thing we handle is the birth augur, since this could impact many
      // other parts of the sheet.
      var augur = parseInt(values[`${prefix}_augurroll`])||0;
      var augurMod = parseInt(values[`${prefix}_augurmod`])||0;
      if (augur < 0) {
        augur = 0;
        updates[`${prefix}_augurroll`] = augur;
      } else if (augur > 30) {
        augur = 30;
        updates[`${prefix}_augurroll`] = augur;
      }
      updates[`${prefix}_augur`] = birthAugurs[augur];

      // Recalc the ability scores and modifiers.
      abilityScores.forEach(function (as) {
        var newScore = (parseInt(values[`${prefix}_${as}base`])||0) +
                       (parseInt(values[`${prefix}_${as}bonus`])||0);
        updates[`${prefix}_${as}`] = newScore;
        updates[`${prefix}_${as}mod`] = toMod(newScore);
      });

      // Now that the stamina modifier is known, we can calculate HP.
      updates[`${prefix}_basehptotal`] = [...Array(11).keys()]
                                          .map(i => `${prefix}_basehp${i}`)
                                          .map(key => parseInt(values[key])||0)
                                          .reduce((sum, val) => sum + val);
      var newMaxHp = updates[`${prefix}_basehptotal`] + updates[`${prefix}_staminamod`];
      if (augur == 25) {
        var level = parseInt(values[`${prefix}_level`])||0;
        newMaxHp += augurMod * (level+1)
      }
      if (newMaxHp < 1) { newMaxHp = 1; }
      updates[`${prefix}_hpmax`] = newMaxHp;

      // If the current hp is greater than the new hpmax, reduce hp to match hpmax.
      var current = parseInt(values[`${prefix}_hp`])||0;
      if (current > newMaxHp) { updates[`${prefix}_hp`] = newMaxHp; }
      if (current < 1) { updates[`${prefix}_hp`] = 0; }

      // And we can also update AC and INI based on the agility modifier
      updates[`${prefix}_ac`] = updates[`${prefix}_agilitymod`] + 10;
      if (augur == 23) { updates[`${prefix}_ac`] += augurMod; }

      updates[`${prefix}_initiative`] = updates[`${prefix}_agilitymod`];
      if (augur == 24) { updates[`${prefix}_ac`] += augurMod; }

      // Saves are based on the stamina, agility, and personality modifiers.
      updates[`${prefix}_refsave`] = updates[`${prefix}_agilitymod`];
      if (augur == 17 || augur == 20) { updates[`${prefix}_refsave`] += augurMod; }

      updates[`${prefix}_forsave`] = updates[`${prefix}_staminamod`];
      if (augur == 17 || augur == 21) { updates[`${prefix}_forsave`] += augurMod; }

      updates[`${prefix}_wilsave`] = updates[`${prefix}_personalitymod`];
      if (augur == 17 || augur == 22) { updates[`${prefix}_wilsave`] += augurMod; }

      // Only sheet attribute remaining that the birth augur could affect is movement.
      if (augur == 30) {
        updates[`${prefix}_movement`] = 30 + (augurMod * 5);
      }

      // And finally, we can commit the recalculations.
      setAttrs(updates);
    });
  });
