// Board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

// Bird
let birdWidth = 34; // Width/height ratio = 17/12
let birdHeight = 24;
let birdX = boardWidth / 8;
let birdY = boardHeight / 2;
let birdImg;

let bird = {
    x: birdX,
    y: birdY,
    width: birdWidth,
    height: birdHeight
};

// Pipes
let pipeArray = [];
let pipeWidth = 64; // Width/height ratio = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

// Physics
let velocityX = -1; // Pipes moving left speed
let velocityY = 0; // Jump speed
let gravity = 0.05;

let gameOver = false;
let score = 0;

// Window onload event
window.onload = function () {
    // Board setup
    board = document.querySelector('#board');
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); // Used to draw on the board

    // Flappy bird drawing
    birdImg = new Image();
    birdImg.src = '../assets/flappybird.png';
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height); // Draws image on coordinates
    };

    // Load images for pipes
    topPipeImg = new Image();
    topPipeImg.src = '../assets/toppipe.png';

    bottomPipeImg = new Image();
    bottomPipeImg.src = '../assets/bottompipe.png';

    // Animation setup
    requestAnimationFrame(update);
    setInterval(placePipes, 1500); // Every 1.5 seconds

    // Event listener for bird movement
    document.addEventListener('keydown', moveBird);
};

// Update function for animation
function update() {
    requestAnimationFrame(update); // Update frame

    if (gameOver) return;

    context.clearRect(0, 0, board.width, board.height); // Clear frame

    // Bird
    velocityY += gravity;
    bird.y = Math.max(bird.y + velocityY, 0); // Apply gravity to current bird.y, limit the bird.y to top of the canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    if (bird.y > board.height) gameOver = true;

    // Pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score = score + 0.5; // Because there are 2 pipes
            pipe.passed = true;
        }

        if (detectCollision(bird, pipe)) {
            gameOver = true;
        }

        // Clear pipes for memory
        while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
            pipeArray.shift(); // Remove first element from array
        }
    }

    // Score
    context.fillStyle = 'white';
    context.font = "45px sans-serif";
    context.fillText(score, 5, 45);

    if (gameOver) {
        context.fillText('GAME OVER', 5, 90);
    }
}

// Function to place pipes
function placePipes() {
    if (gameOver) return;

    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight / 2); // Randomizes the height of the pipe
    let openingSpace = board.height / 4;

    let topPipe = {
        img: topPipeImg,
        x: pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };

    pipeArray.push(topPipe);

    let bottomPipe = {
        img: bottomPipeImg,
        x: pipeX,
        y: randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    };
    pipeArray.push(bottomPipe);
}

// Function to move the bird
function moveBird(e) {
    if (e.code == 'Space' || e.code == 'ArrowUp') {
        velocityY = -3;
    }
}

// Function to detect collision
function detectCollision(a, b) {
    return a.x < b.x + b.width && // a's top left corner doesn't reach b's top right corner
        a.x + a.width > b.x && // a's top right corner passes b's top left corner
        a.y < b.y + b.height && // a's top left corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; // a's bottom left corner passes b's top left corner
}
