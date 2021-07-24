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
        - The two otherr unused variables according to JSHint was the following:
        - playPauseIt on line 71
        - reset on line 213
    - These two are onClick functions in the game, playPauseIt to make it possible to toggle the background music and
    the reset to make it possible to reload the page when the player click on the reset button on the score board. These are essential for 
    this functionality hence cannot be removed.
