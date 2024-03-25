document.addEventListener("DOMContentLoaded", () => {
    const scrollAboutUs = document.querySelector('.about-link'); //get .about-links
    
    scrollAboutUs.addEventListener("click", e => { //click event to all links
        e.preventDefault();
        const target = scrollAboutUs.getAttribute('href').substring(1); //targets the href attribute but removes the string before
        const targetElement = document.getElementById(target); //targets the element

        if (targetElement) { //if element exist
            targetElement.scrollIntoView({ behavior: "smooth" }); //scroll to element
        }
    })
})

const input = document.querySelectorAll('.form-control'); //get all inputs

input.forEach(input => { //iterates over all elements of input array
    input.addEventListener('input', (event) => { //for each element, theres event listener
        const currentInput = event.target; //references the event
        const currentLabel = currentInput.nextElementSibling; // references the next sibling aka label

        if (currentInput.value.trim() === '') currentLabel.style.display = 'block'; // if no input return label being visible
        else currentLabel.style.display = 'none'; //else hide it
    })
})

//Code of Tic Tac Toe

class createPlayer {
    constructor(name, mark) {
        this.name = name;
        this.mark = mark;
    }
}


let player = new createPlayer('Player', 'X');
let computer = new createPlayer('Computer', 'O');
const gridContainer = document.querySelector('.grid')
const status = document.querySelector('.game-status');
let gameBoard = [];
let winner = false;
let currentPlayer = player;
let turns = 0;

const createGrid = (() => {
    for (let i = 0; i < 9; i++) {
        const grid = document.createElement('div');
        gridContainer.appendChild(grid);
        grid.setAttribute('class', 'cell')
        gameBoard.push('')
    }
})();

function getComputerSelection () {
    let number = Math.floor(Math.random() * 9);
}

function game () { //game logic
    const cell = document.querySelectorAll('.cell');

    cell.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (cell.innerHTML === '' && cell.innerHTML !== 'O' && winner === false && currentPlayer === player) {
                cell.innerHTML = player.mark;
                currentPlayer = computer;
                turns++;
                status.innerHTML = 'Computers turn!'
                gameBoard.splice(index, 1, player.mark) // change the elements index of the cell with the players mark on the array
            } else if (cell.innerHTML === '' && cell.innerHTML !== 'X' && winner === false && currentPlayer === computer) {
                cell.innerHTML = computer.mark;
                currentPlayer = player;
                turns++;
                status.innerHTML = 'Players turn!'
                gameBoard.splice(index, 1, computer.mark)
            } else if (turns === 9) status.innerHTML = 'Tie!'
        })
    })

}

function checkWinner () {
    const winPossibilities = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];

    winPossibilities.forEach(index => {
        if (gameBoard[index[0]] === player.mark && gameBoard[index[1]] === player.mark && gameBoard[index[2]] === player.mark) {
            status.innerHTML === `${player.name} won the game`
            winner = true;
        }
    })
}

game();