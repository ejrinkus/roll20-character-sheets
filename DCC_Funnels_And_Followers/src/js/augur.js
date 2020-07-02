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

  on("change:repeating_heroes:augurroll sheet:opened", function() {
    getAttrs(["repeating_heroes_augurroll"], function(values) {
      var updates = {};
      augur = parseInt(values["repeating_heroes_augurroll"])||0;
      if (augur < 0) {
        augur = 0;
        updates["repeating_heroes_augurroll"] = augur;
      } else if (augur > 30) {
        augur = 30;
        updates["repeating_heroes_augurroll"] = augur;
      }
      updates["repeating_heroes_augur"] = birthAugurs[augur];
      setAttrs(updates);
    });
  });
