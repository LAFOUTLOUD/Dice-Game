// the 3 most important variables are created
var playerScores, currentScore, currentPlayer, six, winningScore, gameState;

// the newGame() function is called when the application loads
newGame();

// adds functionality to the ROLL DICE button // when the ROLL DICE button is CLICKED
document.querySelector('.btn-roll').addEventListener('click', function() {

	if (gameState) {

		// stops hiding the dice image
		document.querySelector('.dice').style.display = 'block';
		
		// stops hiding the 2nd dice image
		document.querySelector('.dice_2').style.display = 'block';
		
		// creates the 'dice' variable // generates a random number, adds its value to the dice variable
		var dice = Math.floor( Math.random() * 6 ) + 1;
		
		// creates a 2nd dice variable that ALSO generates a random number
		var dice2 = Math.floor( Math.random() * 6 ) + 1;
		
		// matches the dice image and the text of the current player to be equal to the value of the dice variable
		document.querySelector('.dice').src = 'dice-' + dice + '.png';
		document.getElementById('current-' + currentPlayer).textContent = dice;
		
		// matches the 2nd dice image to the dice2 variable
		document.querySelector('.dice_2').src = 'dice-' + dice2 + '.png';

		// IF the currentPlayer DOES NOT roll a 1, run the following code:
		if (dice != 1 && dice2 != 1 ) {
		
			// the NEW current score BECOMES equal to the OLD value of the current score + the value of the dice
			currentScore = currentScore + dice;
		
			// the TEXT of CURRENT is changed to match the current score
			document.getElementById('current-' + currentPlayer).textContent = currentScore;
			
			// IF the current player ROLLS A '6'
			if (dice === 6) {

				// the NEW value of the six variable BECOMES the CURRENT value of the six variable + 1
				six = six + 1;

				// the current player rolls 2 6's in a row (the value of the six var was '1' and increases by 1 again)
				if (six === 2) {
				
					// changes the player score to 0
					document.getElementById('score-' + currentPlayer).textContent = '0';
					document.getElementById('current-' + currentPlayer).textContent = '0';
					
					// the current player's player score AND current score become 0
					nextPlayer()
				}
			}
			
			else {
				
				// else the value of the six variable becomes 0 again
				six = 0;

			};

		}
	
		// if the current player DOES roll a 1
		else {
		
			// a function is created to avoid repeating code
			nextPlayer()

		};
	};
});

// adds functionality to the HOLD button
document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if (gameState) {

		// sets the player score for the current player BY adding the current score to the player scores
		playerScores[currentPlayer] = playerScores[currentPlayer] + currentScore;
	
		// changes the TEXT of the playerScore to match the current player score
		document.getElementById('score-' + currentPlayer).textContent = playerScores[currentPlayer];
	
		// resets the VALUE of currentScore back to 0
		currentScore = 0;

		// changes the TEXT of the current player to 0
		document.getElementById('current-' + currentPlayer).textContent = '0';

		// Hides the dice image
		document.querySelector('.dice').style.display = 'none';

		// determines the player score needed to be declared the winner
		if (playerScores[currentPlayer] >= winningScore) {

			// changes the text to Winner!
			document.getElementById('name-' + currentPlayer).textContent = 'Winner!';

			// adds the winner class to the player panel of the current player
			document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
			
			// sets the value of the input field at the end of the game to '0'
			document.getElementById('rule_3').value = '0';
		
			// makes the GAME STATE false
			gameState = false;

		}

		else {
		
			// a function is created to avoid repeating code
			nextPlayer()

		}
	}
});

// controls what happens when the player switches to the NEXT PLAYER 
function nextPlayer() {

	// resets the VALUE of currentScore back to 0
	currentScore = 0;

	// changes the TEXT of the current player to 0
	document.getElementById('current-' + currentPlayer).textContent = '0';
		
	// if the current player rolls a 1, the current player switches to the NEXT PLAYER
	currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0

	// toggles the highlighted side of the panel. // if 'active', becomes 'inactive'.
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	// Hides the dice image
	document.querySelector('.dice').style.display = 'none';
	
	// Hides the 2nd dice image
	document.querySelector('.dice_2').style.display = 'none';
	
	// the value of the six var becomes '0'
	six = 0;

};

// adds functionality to the SUBMIT button and INPUT FIELD
document.querySelector('.btn-submit').addEventListener('click', function () {

	// the submit button only works when the state variable is set to true
	if (gameState) {
	
		// adds an event listener to the submit button for the new input field
		// the value of the winingScore = is the value of the element w/ id of rule_3
		winningScore = document.getElementById('rule_3').value;
		
	}
});



// adds functionality to the NEW GAME button // the ANONYMOUS function newGame is made part of the EVENT LISTENER
document.querySelector('.btn-new').addEventListener('click', newGame);

function newGame() {

	// mutates the value of the playerScores, currentScore and currentPlayer variables back to '0'
	playerScores = [0,0];
	currentScore = 0;
	currentPlayer = 0;

	// Changes all of the text to '0'
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	// Hides the dice image
	document.querySelector('.dice').style.display = 'none';
	
	// Hides the 2nd dice image
	document.querySelector('.dice_2').style.display = 'none';
	
	// resets the player NAMES back to their original text
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	// removes the WINNER class from both players
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	// removes the ACTIVE class from the SECOND PLAYER and adds it back to the FIRST PLAYER
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');

	// the value of the six var starts at '0'
	six = 0;

	// sts the state variable to true, allowing the game to play
	gameState = true;
	
	// sets the winningScore at the start of the game to '100'
	winningScore = 100;
	
	// sets the value of the input field at the start of the game to '0'
	document.getElementById('rule_3').value = '0';
};
