// we declare variables that we will define later
var scores, roundScores, activePlayer, gamePlaying;

// at the start of the game, the newGame() function is called, resetting everthing
newGame();

// creates an EVENT LISTENER for the ROLL DICE button, when clicked, an ANONYMOUS FUNCTION is executed
document.querySelector('.btn-roll').addEventListener('click', function () {
	
	if (gamePlaying) {

	// 1. creates a variable called 'dice'
	// 2. the value of the dice variable is the outcome of a method
	// 3. the method generates a random #, multiplies it by 6, another method rounds it down to a whole #, adds 1
	var dice = Math.floor( Math.random() * 6 ) + 1;
	
	// to avoid repeating document.querySelector('.dice'), we put the code into a variable
	var diceDOM = document.querySelector('.dice');
	
	// 4. stops hiding the dice image
	diceDOM.style.display = 'block';
	
	// 5. the dice image displayed matches the current value of the dice var
	diceDOM.src = 'dice-' + dice + '.png';
	
	// 6. the text in the current box, for the active player, matches the value of the dice var
	document.querySelector('#current-' + activePlayer).textContent = dice;

	// if the value of the dice var is strict DIFFERENT
	if ( dice !== 1 ) {
		
		// the new current score is = to the old current score + the value of the dice var
		roundScore += dice;
		
		// changes the text for the current box to match the round score
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}  
	
	// the player rolls a 1
	else {
		
		// switches to the next player
		nextPlayer();
	}
	
	}
});

// creates an EVENT LISTENER for the HOLD button, when clicked, an ANONYMOUS FUNCTION is executed
document.querySelector('.btn-hold').addEventListener('click', function () {

	if (gamePlaying) {
		
		// 1. change the current score (roundScore) to global score (scores[])
		scores[activePlayer] += roundScore;
	
		// update the UI
		document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
	
		// check if player won the game (instea dof repeating the code from above, use a function)
		if (scores[activePlayer] >= 10) {
			
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			// hides the dice image
			document.querySelector('.dice').style.display = 'none';
			
			gamePlaying = false;

		}

		else {	
			
			// switches to the next player
			nextPlayer();

		}
	}
});

// creates an EVENT LISTENER for the NEW GAME button, when clicked, an ANONYMOUS FUNCTION is executed
document.querySelector('.btn-new').addEventListener('click', newGame);

// to avoid repeating ourselves, we put this block of code into a CALLBACK function for our EL to call
function nextPlayer() {
	
	// use a ternarty operator: if activePlayer = 0, then activeplayer becomes 1, else activePlayer becomes 0
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	
	// then the text is reset back to 0
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
		
	// the player holding the 'active' class toggles (if added, its removed. if removed, its added.)
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	
	// hides the dice image
	document.querySelector('.dice').style.display = 'none';

};

// resets the game back to the start
	function newGame() {

		// variable for the roundScore the player HOLDs. player 1 will be scores[0], player 2 will be scores[1]
		scores = [0,0];

		// variable that holds the current value for each player's round score
		roundScore = 0;

		// variable that decides the active player
		activePlayer = 0;

		// resets the player names back to their original text
		document.getElementById('name-0').textContent = 'Player 1';
		document.getElementById('name-1').textContent = 'Player 2';

		// 2. adds inline css to the dice, and hides it at the start of the game.
		document.querySelector('.dice').style.display = 'none';

		// when the game starts, all values start at 0
		document.getElementById('score-0').textContent = '0';
		document.getElementById('score-1').textContent = '0';
		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		// player 1 becomes the active player again. active class is removed from player 2.
		// document.querySelector('.player-0-panel').classList.add('active');
		// document.querySelector('.player-1-panel').classList.remove('active');
		
		// removes the winner class from player 1 and 2
		document.querySelector('.player-0-panel').classList.remove('winner');
		document.querySelector('.player-1-panel').classList.remove('winner');
		
		// player 1 becomes the active player again. active class is removed from player 2.
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.player-0-panel').classList.add('active');
		
		gamePlaying = true;

	};
