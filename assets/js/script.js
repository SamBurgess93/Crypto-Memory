
/* ---------- game variables ---------- */
const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let gameOn = false;
let playerScore = 0;
let highScore = 0;
let matches = 0;

/* ---------- counting moves variables ---------- */
let counter = document.getElementById('moves');
var moves = 0;

/* ---------- timer variables ---------- */
const timeHour = document.getElementById('timer');

/* ---------- sound variables ---------- */
var flipSound = new Audio('assets/audio/flipCard.mp3');
var matchSound = new Audio('assets/audio/correct.mp3');
var rainSound = new Audio('assets/audio/rain.mp3');
flipSound.volume = 0.5;
matchSound.volume = 0.6;
rainSound.volume = 0.2;
var playPauseIcon = document.getElementById('play-pause');
var count = 0;

/* ---------- Local Storage ---------- */
let localStorageBestScore = localStorage.getItem("lastRoundScore", playerScore);


/* ---------- Last Round Score ---------- */
$("#highScore").text(localStorageBestScore);


//event listener for each card
cards.forEach(card => card.addEventListener('click', flipCard));

/* ---------- Card flip function  ---------- */
function flipCard() {

	flipSound.play();
	flipSound.currentTime = 0;

  //starts timer on first card click
	if (!gameOn) {
		gameOn = true;
		timer();
	}
  
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');

  //prevent double click of 1st card
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}
  //when second card is then clicked
	secondCard = this;
	checkForMatch();
	countMoves();

}

/* ---------- play/pause background music ---------- */
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

/* ---------- checks if chosen two cards match  ---------- */
function checkForMatch() {

  // if cards match disable cards, update score and moves
	if (firstCard.dataset.coin === secondCard.dataset.coin) {
		updateScore(50);
		disableCards();
		matches = matches + 1;
		matchSound.play();
		matchSound.currentTime = 0;
    //when all matches are found update last round score
		if (matches == 6) {
			localStorage.setItem("lastRoundScore", playerScore);
		}
    //if cards dont match update score and unflip the cards
	} else {
		updateScore(-20);
		unflipCards();

	}
  //when all matches are found show win modal 
	if (matches === 6) {
		$("#winModal").modal("show");
	}
}

//disables the cards
function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	resetBoard();
}

//flips the cards back around
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
	time = setInterval(function () {
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

//resets board
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

//shuffles the deck
(function shuffle() {
	cards.forEach(card => {
		let ramdomPos = Math.floor(Math.random() * 12);
		card.style.order = ramdomPos;
	});
})();

//how to play modal   
$("#how-to").click(function () {
	$("#myModal").modal('show');
});

$(".close").click(function () {
	$('#myModal').modal('hide');
});

$(".close-button").click(function () {
	$('#myModal').modal('hide');
});


//feedback Modal  
$("#feedback").click(function () {
	$('#addFeed').modal('show');
});

$('.submit').click(function () {
	if (!$('form input:invalid').length) {
		setTimeout(function () {
			$('#addFeed').modal('hide');
		}, 1000);
	}
});

$(".close").click(function () {
	$('#addFeed').modal('hide');
});

//updates the score 
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

// resets the game
function reset() {
	location.reload();
}


