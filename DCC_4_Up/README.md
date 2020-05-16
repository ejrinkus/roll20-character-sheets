# DCC 4 Up Roll20 character sheet
This character sheet provides the ability to manage 4 level-0 characters from a single character sheet.  This character sheet is primarily intended for the purposes of playing DCC funnels.  For level 1+ play, there are other fully fledged character sheets on Roll20 that players can use :)

# For contributors
Note: you will need a Roll20 Pro subscription to test this character sheet.

This project uses Pug (formerly known as Jade) as an HTML templating engine, and SASS for character sheets.  Ensure both of these frameworks are installed (preferably with Jade) before working on this sheet to ensure you can test your changes.

For Pug in particular, it's recommended to also ensure you have pug-cli installed.  This will allow you to run the following command to automatically watch for and compile changes to the Pug files (make sure you run from the DCC_4_Up directory):

```
> pug -w ./DCC_4_Up.pug -o ./
```

SASS has a similar tool that installs with the framework by default:

```
> sass --watch ./DCC_4_Up.scss ./DCC_4_Up.css
```

The easiest way to test your changes is to use a Roll20 sandbox game.  Start up a new sandbox, and you will see a window in the game allowing you to load in HTML and CSS.  Use each of those options to load in the DCC_4_Up.html and DCC_4_Up.css files (you can only load in one HTML and one CSS file at a time).  Then create a new character and try out your changes!