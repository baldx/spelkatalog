const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => { // code to reload a page, used for restarting games
    location.reload()
})

const ticTacToe = (() => {
    class createPlayer { //class for player
            constructor(name, mark, winner) {
                this.name = name;
                this.mark = mark;
                this.winner = winner;
            }
        }
    
    
    let player = new createPlayer('Player', 'X');// create players
    let computer = new createPlayer('Computer', 'O');
    const gridContainer = document.querySelector('.grid') //fetch from DOM
    const status = document.querySelector('.game-status');
    let gameBoard = []; //create variables
    let winner = false;
    let currentPlayer = player;
    let turns = 0;
    
    const createGrid = (() => {
        for (let i = 0; i < 9; i++) {
            const grid = document.createElement('div');
            gridContainer.appendChild(grid);
            grid.setAttribute('class', 'cell');
            gameBoard.push('');
        }
    })(); //syntax for IIFE (Immediately Invoked Function Expression)
    
    
    function getComputerSelection (board) { //create computer selection
        if (!board.some(cell => cell === '')) return null; // if the board does not match empty string return null
    
        let number = Math.floor(Math.random() * board.length); //generate random number between boards length
    
        
        if (board[number] === '') return number; //if board is empty, return the number
        else return getComputerSelection(board); //if not repeat the process
    }
    
    function displayStatuts() {
        if (turns === 9 && winner === false) {
            status.innerHTML = 'Tie!'
            restartBtn.style.display = 'block'
        }
        if (player.winner === true) return status.innerHTML = 'Player Won!'
        if (computer.winner === true) return status.innerHTML = 'Computer Won!'
    }
    
    const game = (() => { //game logic
        "use strict";
    
        const allCell = document.querySelectorAll('.cell');
    
        allCell.forEach((cell, index) => { //iterate through all cells
            cell.addEventListener('click', () => {
                if (cell.innerHTML === '' && cell.innerHTML !== 'O' && !winner && currentPlayer === player) {
                    gameBoard.splice(index, 1, player.mark) // change the elements index of the cell with the players mark on the array
                    cell.innerHTML = player.mark;
                    currentPlayer = computer;
                    turns++;
                    status.innerHTML = 'Computers turn!'
                    checkWinner();
                    displayStatuts();            } 
                
                if (!winner && currentPlayer === computer) {
                    setTimeout(() => {
                        const computerIndex = getComputerSelection(gameBoard); //get index
    
                        if (computerIndex !== null) {
                            gameBoard.splice(computerIndex, 1, computer.mark); //update gameBoard
                            allCell[computerIndex].innerHTML = computer.mark; //update DOM
                            currentPlayer = player;
                            turns++;
                            status.innerHTML = 'Players turn!'
                            checkWinner();
                            displayStatuts();                    }
                    },1000)
                }
                
                /*else if (cell.innerHTML === '' && cell.innerHTML !== 'X' && winner === false && currentPlayer === computer) {
                    gameBoard.splice(index, 1, computer.mark)
                    cell.innerHTML = computer.mark;
                    currentPlayer = player;
                    turns++;
                    status.innerHTML = 'Players turn!'
                    checkWinner()
                } else if (turns === 9) status.innerHTML = 'Tie!'*/ //logic for player vs player
            })
        })
    
    })(); //syntax for IIFE (Immediately Invoked Function Expression)
    
    function checkWinner () {
        const winPossibilities = [ //win combinations
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8]
        ];
    
        winPossibilities.forEach(index => { //iterate through all elements
            if (gameBoard[index[0]] === player.mark && gameBoard[index[1]] === player.mark && gameBoard[index[2]] === player.mark) { //checks condition if first, second, third element in child array have the same mark
                status.innerHTML === `${player.name} won the game`
                winner = true;
                player.winner = true;
                restartBtn.style.display = 'block'
            } else if (gameBoard[index[0]] === computer.mark && gameBoard[index[1]] === computer.mark && gameBoard[index[2]] === computer.mark) {
                status.innerHTML === `${computer.name} won the game`
                winner = true;
                restartBtn.style.display = 'block'
                computer.winner = true;
            }
        })
    }
})();