# DCC Funnels and Followers Roll20 character sheet
This character sheet provides the ability to manage a list of heroes and
followers for Dungeon Crawl Classics.  It's suitable for players participating
in level-0 funnels that need to manage multiple heroes, or for players in
higher level play that may have hirelings or other followers.

# For contributors
Note: you will need a Roll20 Pro subscription to test this character sheet.

This project uses Pug (formerly known as Jade) as an HTML templating engine,
and SASS for character sheets.  Ensure both of these frameworks are installed
(preferably with Jade) before working on this sheet to ensure you can test your
changes.

For Pug in particular, it's recommended to also ensure you have pug-cli
installed.  This will allow you to run the following command to automatically
watch for and compile changes to the Pug files (make sure you run from the
DCC_Funnels_And_Followers directory):

```
> pug -w ./DCC_Funnels_And_Followers.pug -o ./ -P
```

SASS has a similar tool that installs with the framework by default:

```
> sass --watch ./DCC_Funnels_And_Followers.scss ./DCC_Funnels_And_Followers.css
```

The easiest way to test your changes is to use a Roll20 sandbox game.  Start up
a new sandbox, and you will see a window in the game allowing you to load in
HTML and CSS.  Use each of those options to load in the
DCC_Funnels_And_Followers.html and DCC_Funnels_And_Followers.css files (you can
only load in one HTML and one CSS file at a time).  Then create a new character
and try out your changes!

# Credits

Image credits (all images were resized and re-colored using the built in icon editor at https://game-icons.net):
 - Delapouite: https://delapouite.com/
   - 'Alarm clock icon' by Delapouite under CC BY 3.0: https://game-icons.net/1x1/delapouite/alarm-clock.html
   - 'Body balance icon' by Delapouite under CC BY 3.0: https://game-icons.net/1x1/delapouite/body-balance.html
   - 'Lovers icon' by Delapouite under CC BY 3.0: https://game-icons.net/1x1/delapouite/lovers.html
   - 'Lungs icon' by Delapouite under CC BY 3.0: https://game-icons.net/1x1/delapouite/lungs.html
 - Lorc: https://lorcblog.blogspot.com/
   - 'Brain icon' by Lorc under CC BY 3.0: https://game-icons.net/1x1/lorc/brain.html
   - 'Clover icon' by Lorc under CC BY 3.0: https://game-icons.net/1x1/lorc/clover.html
   - 'Run icon' by Lorc under CC BY 3.0: https://game-icons.net/1x1/lorc/run.html
 - sbed: https://opengameart.org/content/95-game-icons
   - 'Shield icon' by sbed under CC BY 3.0: https://game-icons.net/1x1/sbed/shield.html
 - Skoll: https://game-icons.net/
   - 'Hearts icon' by Skoll under CC BY 3.0: https://game-icons.net/1x1/skoll/hearts.html

All of the above images underwent size and color transformations.