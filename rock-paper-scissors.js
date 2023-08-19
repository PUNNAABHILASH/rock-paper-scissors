let score = JSON.parse(localStorage.getItem('updatedScore')) || { wins: 0, loss: 0, tie: 0 };
updatedScore();

document.querySelector('.js-rock-button').addEventListener('click', () => {
	playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
	playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
	playGame('scissors');
});

document.querySelector('.js-reset-button').addEventListener('click', reset);

document.querySelector('.js-autoplay-button').addEventListener('click', autoPlay);

document.body.addEventListener('keydown', event => {
	if (event.key === 'r') {
		playGame('rock');
	} else if (event.key === 'p') {
		playGame('paper');
	} else if (event.key === 's') {
		playGame('scissors');
	} else if (event.key === 'a') {
		autoPlay();
	} else if (event.key === 'Backspace') {
		reset();
	}
});

function playGame(playerMove) {
	let computerMove = pickComputerMove();
	let result = '';

	if (
		(computerMove === 'rock' && playerMove === 'rock') ||
		(computerMove === 'paper' && playerMove === 'paper') ||
		(computerMove === 'scissors' && playerMove === 'scissors')
	) {
		result = 'Tie.';
		score.tie++;
	} else if (
		(computerMove === 'rock' && playerMove === 'scissors') ||
		(computerMove === 'paper' && playerMove === 'rock') ||
		(computerMove === 'scissors' && playerMove === 'paper')
	) {
		result = 'You lose!';
		score.loss++;
	} else if (
		(computerMove === 'scissors' && playerMove === 'rock') ||
		(computerMove === 'rock' && playerMove === 'paper') ||
		(computerMove === 'paper' && playerMove === 'scissors')
	) {
		result = 'You Win!.';
		score.wins++;
	}

	localStorage.setItem('updatedScore', JSON.stringify(score));

	document.querySelector('.js-result').innerHTML = result;

	document.querySelector('.js-moves').innerHTML = `
				You <img class='move-icon' src='./images/${playerMove}-emoji.png' /> <img class='move-icon' src='./images/${computerMove}-emoji.png' /> computer
				`;

	updatedScore();
	return;
}

function pickComputerMove() {
	let randomNumber = Math.random();
	let computerMove = '';
	if (randomNumber >= 0 && randomNumber < 1 / 3) {
		computerMove = 'rock';
	} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
		computerMove = 'paper';
	} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
		computerMove = 'scissors';
	}
	return computerMove;
}

let autoPlaying = false;
let intervalId;
function autoPlay() {
	if (!autoPlaying) {
		intervalId = setInterval(() => {
			playGame(pickComputerMove());
		}, 1000);
		autoPlaying = true;
		document.querySelector('.js-autoplay-button').innerHTML = 'Stop Playing';
	} else {
		clearInterval(intervalId);
		autoPlaying = false;
		document.querySelector('.js-autoplay-button').innerHTML = 'Auto Play';
	}
}

function reset() {
	score = {
		wins: 0,
		loss: 0,
		tie: 0,
	};

	const resetOrNot = confirm('Are you sure you want to reset the score?');
	if (resetOrNot) {
		document.querySelector('.js-result').innerHTML = '';
		document.querySelector('.js-moves').innerHTML = '';
		updatedScore();
		localStorage.setItem('updatedScore', JSON.stringify(score));
	}
}

function updatedScore() {
	const paraElement = document.querySelector('.js-score');
	paraElement.innerHTML = `Wins:${score.wins},Losses:${score.loss},Ties:${score.tie}`;
	return;
}
