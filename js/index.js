
/* ---------- game variables ---------- */
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


/* ---------- counting moves variables ---------- */
let counter = document.getElementById('moves');
var moves = 0;

const timeHour = document.getElementById('timer');
let timeSecond = 0;
timeHour.innerHTML = `00:0${timeSecond}`;


function flipCard() {
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
      disableCards();
      return;
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

  $(".start-game").on("click", function () {
  $(this).remove();
  // timer coded with help from https://www.youtube.com/watch?v=_a4XCarxwr8
  const timeCounter = setInterval(() => {
      timeSecond++;
      displayTime(timeSecond);
      if (matches == 8) {
          clearInterval(timeCounter);
          localStorage.setItem("lastRoundTime", timeHour.innerHTML);
      }
  }, 1000);

  // Time display function 
  function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeHour.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
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