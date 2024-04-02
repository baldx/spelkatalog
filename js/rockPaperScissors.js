const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => { // code to reload a page, used for restarting games
    location.reload()
})

const rockPaperScissors = (() => {

    class CreatePlayer { //create class for playes
        constructor(player, selection = null, score = 0) {
            this.player = player;
            this.selection = selection;
            this.score = score;
        }
    }

    const player = new CreatePlayer('Player')
    const computer = new CreatePlayer('Computer') //create players
    let currentPlayer = player;
    let winner = false;
    const playerScore = document.querySelector('.player-score') //fetch to display score
    const computerScore = document.querySelector('.computer-score')
    const gameFeedback = document.querySelector('.game-feedback');

    const allSelection = document.querySelectorAll('.selection-container > img'); // fetch all selections

    function getComputerSelection () { // create computer selection
        const getNumber = Math.floor(Math.random() * allSelection.length); //generate number between 1-3
        computer.selection = allSelection[getNumber].className //get the item

        return computer;
    }

    allSelection.forEach((e, index) => { //logic for when player selects a card
        e.addEventListener('click', () => {
            if (winner === false && currentPlayer === player && player.score < 5) {
                player.selection = allSelection[index].className; //sets player selection equals to the card they chose
                checkCondition(player, getComputerSelection()) //gives the parameters in and checks the condition, and returns something
                playerScore.innerHTML = player.score//change score
                computerScore.innerHTML = computer.score
                checkWinner() //check for winner after every play
            }
        })
    })

    function checkWinner () { //check for winner
        if (player.score === 5) {
            gameFeedback.innerHTML = 'Player won the game! :)'
            restartBtn.style.display = 'block'
            return winner = true;
        } 

        if (computer.score === 5) {
            gameFeedback.innerHTML = 'Computer won the game! :('
            restartBtn.style.display = 'block'
            return winner = true;
        } 
    }


    function checkCondition(player, computer) { //checks conditions
        if (player.selection === 'Rock' && computer.selection === 'Scissors') {
            gameFeedback.innerHTML = 'Won this round :)'
            return player.score++;
        } else if (player.selection === 'Scissors' && computer.selection === 'Paper') {
            gameFeedback.innerHTML = 'Scissors beats paper! :)'
            return player.score++;
        } else if (player.selection === 'Paper' && computer.selection === 'Rock') {
            gameFeedback.innerHTML = 'Going mad! :)'
            return player.score++;
        } else if (player.selection === 'Rock' && computer.selection === 'Paper') {
            gameFeedback.innerHTML = 'Oops, lost this time! :('
            return computer.score++;
        } else if (player.selection === 'Scissors' && computer.selection === 'Rock') {
            gameFeedback.innerHTML = 'Computer beats player! :('
            return computer.score++;
        } else if (player.selection === 'Paper' && computer.selection === 'Scissors') {
            gameFeedback.innerHTML = 'AI diff! :('
            return computer.score++;
        } else {
            return gameFeedback.innerHTML = 'Tied!';
        }
    }
})();