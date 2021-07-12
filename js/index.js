
/* ---------- game variables ---------- */
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameOn = false;
let playerScore = 0;



/* ---------- counting moves variables ---------- */
let counter = document.getElementById('moves');
var moves = 0;

const timeHour = document.getElementById('timer');



function flipCard() {

  if (!gameOn) {
    gameOn = true;
    timer();
    }

    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
 
    secondCard = this;
    checkForMatch();
    countMoves();

  }
 
  function checkForMatch() {
    if (firstCard.dataset.coin === secondCard.dataset.coin) {
      updateScore(50);
      disableCards();
      return;
    } else {
      updateScore(-20);
    }
 
    unflipCards();
    
  }
 
  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }
 
  function unflipCards() {
    lockBoard = true;
    
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      resetBoard();
    }, 1500);
  }


  // When clicking on the play button the start-game div disappears. 
  // coded with help from https://stackoverflow.com/questions/5299895/jquery-detecting-and-removing-an-element-clicked



  // Time display function 
  let time;
  let minutes = 0;
  let seconds = 0;
  let timeStart = false;
  timeHour.innerHTML = minutes + " : " + seconds;
  
 
  function timer() {
      time = setInterval(function() {
          seconds++;
          if (seconds === 59) {
              minutes++;
              seconds = 0;
          }
          timeHour.innerHTML = minutes + " : " + seconds;
      }, 1000);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  (function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();



  function updateScore(scoreMod) {
    playerScore = playerScore + scoreMod;

    let score = document.getElementById("highscore");
    score.innerText = playerScore;

}

  // coded with help from https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript#toc-3-moves
  function countMoves() {
  moves++;
  counter.innerHTML = moves;
  }

  // resets the board
  function reset() {
    location.reload();
  }
    
cards.forEach(card => card.addEventListener('click', flipCard));