let score = 0;
let timeLeft = 60; // remis à 60
let gameRunning = true;
let displayIntervalId = null;

const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("sc");


function nbre_hs() {
    return Math.floor(Math.random() * 10)+1;
}

function c_display(){
    if (displayIntervalId !== null) {
        clearInterval(displayIntervalId);
    }

    displayIntervalId = setInterval(function(){
        if (timeLeft > 0 && gameRunning){
            const nbre_rand = nbre_hs();
            document.getElementById("nbre").textContent = nbre_rand;
        }
    }, 500);

}

function updateTimer() {
    timerEl.textContent = "timer: " + timeLeft;
}

function startCountdown() {
    updateTimer();
    const intervalId = setInterval(function() {
        timeLeft = timeLeft - 1;
        if (timeLeft < 0) {
            clearInterval(intervalId);
            timerEl.textContent = "timer: 0";
            disableButtons();
            showGameOver();
            return;
        }
        updateTimer();
    }, 1000);
}

function disableButtons() {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(button => button.disabled = true);
}

function showGameOver() {
    gameRunning = false;
    document.getElementById("final-score").textContent = score;
    document.getElementById("game-over").classList.remove("hidden");
}

function restart() {
    score = 0;
    timeLeft = 60;
    gameRunning = true;
    scoreEl.textContent = "score: 0";
    timerEl.textContent = "timer: 60";
    document.getElementById("game-over").classList.add("hidden");
    enableButtons();
    lets_go();
}

function enableButtons() {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(button => button.disabled = false);
}

function check(a) {
    const value = Number(document.getElementById("nbre").textContent);
    if (timeLeft < 0) {
        return;
    }
    if (a === value) {
        score = score + 1;
        scoreEl.textContent = "score: " + score;
    }
}

function lets_go(){
    startCountdown();
    c_display();
}

window.onload = lets_go;
