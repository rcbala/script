const diceImages = [
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png",
];

let player1Score = 0;
let player2Score = 0;
const highScore = 30;
let gameFinished = false;
let currentPlayer;

function setStartingPlayer() {
  currentPlayer = Math.random() < 0.5 ? 1 : 2;
  console.log(`Player ${currentPlayer} starts!`);
  toggleRollButton();
  updateCurrentPlayerText(); 
}

window.onload = setStartingPlayer;

function rollDice(player) {
  if (!gameFinished && currentPlayer === player) {
    const result = Math.floor(Math.random() * 6) + 1;
    displayDiceResult(result, `player${player}Dice`);

    if (player === 1) {
      player1Score += result;
    } else if (player === 2) {
      player2Score += result;
    }

    if (player1Score >= highScore || player2Score >= highScore) {
      endGame();
    }

    updateScores();
    switchPlayer();
    toggleRollButton();
    updateCurrentPlayerText(); 
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function displayDiceResult(result, playerDiceId) {
  const diceDiv = document.getElementById(playerDiceId);
  diceDiv.style.backgroundImage = `url(${diceImages[result - 1]})`;
}

function updateScores() {
  document.getElementById("player1Score").textContent = player1Score;
  document.getElementById("player2Score").textContent = player2Score;
}

function toggleRollButton() {
  const player1Button = document.getElementById("player1RollBtn");
  const player2Button = document.getElementById("player2RollBtn");

  if (currentPlayer === 1) {
    player1Button.disabled = false;
    player2Button.disabled = true;
  } else {
    player1Button.disabled = true;
    player2Button.disabled = false;
  }
}

function updateCurrentPlayerText() {
  const currentPlayerText = document.getElementById("currentPlayer");
  currentPlayerText.textContent = `Player- ${currentPlayer} to play`;
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  gameFinished = false;
  document.getElementById("player1Dice").style.backgroundImage = "";
  document.getElementById("player2Dice").style.backgroundImage = "";
  updateScores();
  setStartingPlayer(); 
  toggleRollButton();
  updateCurrentPlayerText();
}

