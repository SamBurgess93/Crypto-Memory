
/* ---------- game variables ---------- */
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameOn = false;
let playerScore = 0;
let highScore = 0;
let matches = 0;

/* ---------- Local Storage ---------- */
let localStorageBestScore = localStorage.getItem("lastRoundScore", playerScore);

/* ---------- counting moves variables ---------- */
let counter = document.getElementById('moves');
var moves = 0;

const timeHour = document.getElementById('timer');

/* ---------- Sound clips ---------- */
var flipSound = new Audio('assets/audio/flipCard.mp3');
var matchSound = new Audio('assets/audio/correct.mp3');
var rainSound = new Audio('assets/audio/rain.mp3');
flipSound.volume = 0.5;
matchSound.volume = 0.6;
rainSound.volume = 0.2;
var playPauseIcon = document.getElementById('play-pause');
var count = 0;


/* ---------- Last Round Score ---------- */
$("#highScore").text(localStorageBestScore);


function flipCard() {

  flipSound.play();
  flipSound.currentTime = 0;

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

  // coded with help from https://www.youtube.com/watch?v=wffK2OIt8u0
  function playPauseIt() {
  if (count == 0) {
      count = 1;
      rainSound.play();
      playPauseIcon.className = "fas fa-volume-up";
  } else {
      count = 0;
      rainSound.pause();
      playPauseIcon.className = "fas fa-volume-mute";
  }
}
 
  function checkForMatch() {
    if (firstCard.dataset.coin === secondCard.dataset.coin) {
      updateScore(50);
      disableCards();
      matches = matches + 1;
      matchSound.play();
      matchSound.currentTime = 0;
        if (matches == 6) {
            console.log("hey");
            localStorage.setItem("lastRoundScore", playerScore);
        }
    } 
     else{
      updateScore(-20);
      unflipCards();
      
      }
      if (matches === 6) {
        $("#winModal").modal("show");
    }
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
      flipSound.play();
      resetBoard();
    }, 1500);
  }



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
          if (matches == 6) {
            clearInterval(time);
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

  //Instructions Modal   
  $("#how-to").click(function () {
    $("#myModal").modal('show');
  });

  $(".close").click(function () {
    $('#myModal').modal('hide');
  });

  $(".close-button").click(function () {
    $('#myModal').modal('hide');
  });


  //Feedback Modal  
  $("#feedback").click(function () {
    $('#addFeed').modal('show');
  });

  $('.submit').click(function() {
    setTimeout(function() {$('#addFeed').modal('hide');}, 1000);
  });

  $(".close").click(function () {
    $('#addFeed').modal('hide');
  });


  

  function updateScore(scoreMod) {
    playerScore = playerScore + scoreMod;

    let score = document.getElementById("currentScore");
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