const restartBtn = document.querySelector('.restart');
restartBtn.addEventListener('click', () => { // code to reload a page, used for restarting games
    location.reload()
})

const numberGuessing = (() => {
    const feedback = document.querySelector('.feedback');//fetch stuff

    const minInput = document.querySelector('#min-number');
    const maxInput = document.querySelector('#max-number');

    const submitParameters = document.querySelector('.submit-parameters');

    const parameterForm = document.querySelector('.parameters')
    const guessingForm = document.querySelector('.number-guessing');
    
    const submitGuess = document.querySelector('.submit-guess');
    const numberInput = document.querySelector('.number-input');

    let randomNumber;

    submitParameters.addEventListener('click', (e) => { //logic for what happens after clicking the button for submitting parameters
        randomNumber = guessNumberLogic(minInput.value, maxInput.value) //randomNumber = to the function that has min input and max inputs values passed in as parameters
        console.log(randomNumber);
        e.preventDefault(); //prevents the default refreshing of the page after submitting a form
        parameterForm.style.display = 'none'
        guessingForm.style.display = 'flex'; //changes styles
    });

    submitGuess.addEventListener('click', (e) => { //logic for submitting guess
        e.preventDefault();
        if (numberInput.value < randomNumber) return feedback.innerHTML = 'Guess higher!'
        if (numberInput.value > randomNumber) return feedback.innerHTML = 'Guess lower!'
        if (numberInput.value == randomNumber) {
            restartBtn.style.display = 'block'
            return feedback.innerHTML = 'You guessed right!' //the game logic with guess
        }
    })



    function guessNumberLogic(min, max) {
        
        return Math.floor(Math.random() * (max - min) + min) //generates number between specified values
    }

})();