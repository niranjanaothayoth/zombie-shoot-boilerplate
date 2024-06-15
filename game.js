// Iteration 1: Declare variables required for this game
let zombies = [];
let lives = 4;
let timeLeft = 60;
let gameInterval;
let zombieInterval;
const shotgunSound = new Audio('./assets/shotgun.wav');
const backgroundMusic = new Audio('./assets/bgm.mp3');

// Elements
const gameBody = document.getElementById('game-body');
const timerElement = document.getElementById('timer');
const livesElement = document.getElementById('lives');

// Iteration 2: Write a function to make a zombie
function createZombie() {
    const zombie = document.createElement('img');
    zombie.src = `./assets/zombie-${Math.floor(Math.random() * 6) + 1}.png`;
    zombie.classList.add('zombie-image');
    zombie.style.left = `${Math.random() * 90}vw`; // Random horizontal position
    zombie.onclick = () => destroyZombie(zombie);
    gameBody.appendChild(zombie);
    zombies.push(zombie);

    // Check if the player missed the zombie
    setTimeout(() => {
        if (zombies.includes(zombie)) {
            missZombie(zombie);
        }
    }, 5000); // Time for zombie to move up
}

// Iteration 3: Write a function to check if the player missed a zombie
function missZombie(zombie) {
    gameBody.removeChild(zombie);
    zombies = zombies.filter(z => z !== zombie);
    lives--;
    livesElement.style.width = `${(lives / 4) * 100}%`;

    if (lives === 0) {
        endGame(false);
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function destroyZombie(zombie) {
    shotgunSound.play();
    gameBody.removeChild(zombie);
    zombies = zombies.filter(z => z !== zombie);
}

// Iteration 5: Creating timer
function startTimer() {
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            endGame(true);
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    backgroundMusic.loop = true;
    backgroundMusic.play();
    startTimer();
    createZombie();
    zombieInterval = setInterval(createZombie, 2000); // Create a new zombie every 2 seconds
}

// Iteration 7: Write the helper function to get random integer
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = MyMath.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    livesElement.style.width = '100%';
    startGame();
});

function endGame(win) {
    clearInterval(gameInterval);
    clearInterval(zombieInterval);
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    if (win) {
        location.href = './win.html';
    } else {
        location.href = './game-over.html';
    }
}
