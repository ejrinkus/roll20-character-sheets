
  const fields = ['selectvitals', 'selectinventory', 'selectstatus', 'selectabilities', 'selectspellcasting'];
  on(fields.map(f => `clicked:repeating_heroes:${f}`).join(' '), function(eventInfo) {
      const trigger = eventInfo.sourceAttribute.split('_');
      const thisfield = trigger[3];
      const output = {};
      fields.forEach(f => {
          output['repeating_heroes_' + f] = false;
      });
      output['repeating_heroes_' + thisfield] = true;
      setAttrs(output);
  });