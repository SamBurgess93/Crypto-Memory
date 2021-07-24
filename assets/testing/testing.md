# Testing

- [Go back to the project and README file](https://github.com/SamBurgess93/Crypto-Memory)
- [Go to the live project here!](https://github.com/SamBurgess93/Crypto-Memory)

## Table of Contents
1. [Automated Testing](#automated-testing)
2. [Manual Testing](#manual-testing)
3. [User Testing](#user-testing)
4. [Bugs found during development](#bugs-found-during-development)
5. [Bugs found while testing manually](#bugs-found-while-testing-manually)

## Automated Testing
- [W3C CSS Validation](https://jigsaw.w3.org/css-validator/)
    - Crypto memory project passed the W3C CSS Validator without any errors. 24th July - 2021
- [W3C Markup Validation](https://validator.w3.org/)
    - This project passed the W3C Markup Validator without any errors. 24th July - 2021
- [JSHint](https://jshint.com/)
    - This project was validated with JSHint validator on 24th July 2021 with
        - 22 warnings
        - Undefined variable
        - 4  unused variables

        - All of the 22 warnings was about the following:
        - 2 "const is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)"
        - 15 "let is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)"
        - 2 "destructuring assignment' is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)"
        - 3 "arrow function syntax is available in ES6 (use 'esversion: 6') or Mozilla JS extensions (use moz)"

        - To solve these warnings I simply put the folowing comment at the top of my script file /*jshint esversion: 6 */
        - The only undefined variable seen is the '$' symbol. This cannot be removed as its required for the jQuery code to function properly .

        - timeStart and highScore varaiables where used earlier in the development but have no use now so have been removed.
        - The two other unused variables according to JSHint was the following:
        - playPauseIt on line 71
        - reset on line 213
    - These two are onClick functions in the game, playPauseIt to make it possible to toggle the background music and
    the reset to make it possible to reload the page when the player click on the reset button on the score board. These are essential for 
    this functionality hence cannot be removed.


## Manual testing
All manual tests were done in the following browsers:
- Firefox
- Google Chrome
- Microsoft Edge
- Safari 

1. Firstly I would open each browser and confirm that the content loads correctly.

2. I would test the two main sections (cards and scoreboard) seperately on each browser
    
    - Card Section 
        - When the page is loaded click the first card and confirm the audio plays and card stays flipped over.
        - Confirm timer has started.
        - When clicking second card confirm audio fires:
            - If card matches both cards stay flipped and audio fires, move counter changes by one and +50 points added to score
            - If card doesnt match both cards flip back over and audio fires, move counter changes by one and -20 points to score.
        - Confirm that a third card cant be clicked on until unmatched cards flip back over, board is locked.
        - When all cards are matched, timer stops, modal pops up congratulating the player.

    - Scoreboard Section 
        - When the reset button is clicked all page reloads, counters go to zero and all cards flip back over.
        - When clicking on the speaker icon the background music starts playing and the icon changes to a speaker icon that is playing sound. 
        - When the speaker icon is clicked again the music stops.
        - When clicking the question mark icon the 'How to play' modal pops up. Check the close modal icon closes the modal.

All of the above tests were done in the Google Chrome Device Toolbar on the following devices:

- iPad
- iPad Pro
- iPhone 5/SE
- iPhone 6/7/8
- Galaxy S5

I also tested with other screens I have also;

Samsung S9 mobile
23.8" Desktop Screen (1920 x 1080)
Laptop 14" (1920 x 1080)

