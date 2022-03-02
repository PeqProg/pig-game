"use strict";

const player1El = document.querySelector(".player--0");
const player2El = document.querySelector(".player--1");
const score1El = document.getElementById("score--0");
const score2El = document.querySelector("#score--1");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const diceEl = document.querySelector(".dice");

let scores, currentScore, activePlayer, playing;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score1El.textContent = 0;
  score2El.textContent = 0;

  diceEl.classList.add("hidden");
  btnRoll.style.cursor = "pointer";
  btnHold.style.cursor = "pointer";

  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");
  //* player 1 (player 0) begint het spel dus active
  player1El.classList.add("player--active");
  player2El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1El.classList.toggle("player--active");
  player2El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  //* only be able to roll dice if playing is true
  if (playing) {
    let dice = Math.floor(Math.random() * 6 + 1);
    console.log(dice);
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    if (dice === 1) {
      console.log("it is 1");
      //switch player
      switchPlayer();
    } else {
      console.log(" it is not 1");
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener("click", function () {
  //* only be able to press button if playing is true
  if (playing) {
    //*add score to score active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //*check if score player is >=100 to finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      btnRoll.style.cursor = "default";
      btnHold.style.cursor = "default";
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      //*switch player if game isn't finished
      switchPlayer();
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);
