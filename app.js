// both players scores are going into 1 variable, so we put them into an array
var scores = [0,0];
var roundScore = 0;

// because both player scores are going into an array, active player 1 = 0, active player 2 = 1
// by default, we want the first player to be active player [0].
var activePlayer = 0;

// we select the element holding the score for both players w/ the class name "current-0" or "current-1"
// we change its text w/ the .textContent = ''; property, to be equal to the value of the dice variable.
// we use a variable to determine who the active player is.
// when the active player is active player 1, their value changes to 0,
// this is combined w/ the text "current-", so that when active player = 1, current-1,
// because 2 elements share the class name "current-", we use type coercion to combine it w/ the value of active player
// document.querySelector('#current-' + activePlayer).textContent = dice;

// the game starts w/ the dice image hidden
document.querySelector('.dice').style.display = 'none';

// when the game starts, all values start at 0
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

// we select the button through its class "btn-roll", attach an Event Listener to it.
// when the button is 'clicked' (EL is called), the function is called
document.querySelector('.btn-roll').addEventListener('click', function() {

	// 
	// creates a new variable called 'dice', its value is a random whole number multiplied by 6 and adding 1
	var dice = Math.floor( Math.random() * 6 ) + 1;
	
	// display the result

	// 1. the dice image becomes visible again when clicked
	document.querySelector('.dice').style.display = 'block';

	// 2. we match the dice image with the value of the dice variable
	// we use the HTML DOM Image src property to change the image
	// like above, multiple files share the same name
	// so we use type coercion to match the image w/ the dice value
	// we change the name of the image src to be, "dice- + whatever the value of the dice variable is"
	// when the die lands on 3, dice- + dice, becomes dice-"3".
	// .src = '';
	// inside the property, we put the name of the src: 'dice-1.png'
	// using TYPE COERCION, we create a string that will change based on the value of the dice variable
	// instead of (dice-1.png) => ('dice-' + dice + '.png')
	// when dice = 1 => 'dice-' + dice + '.png' = 'dice-1'
	// when dice = 2 => 'dice-' + dice + '.png' = 'dice-2'
	// we add a variable that changes into the string, when the variable changes, it changes that part of the string.
	document.querySelector('.dice').src = 'dice-' + dice + '.png';
	
	// 3. display the result
	// JS reads right-to-left. current roundScore + dice is evaluated first, then added to the roundScore, manipulating it.
	// activePlayer will = 0 or 1. 
	// thanks to 'current-' + activePlayer = current-(value of activePlayer)
	// the roundScore in JS will change, BUT we have to tell JS to change the text in the HTML
	if (dice > 1) { 
					// JS assigns values from right to left
					// the new value of the roundScore = the current roundScore + value of the dice variable
					// roundScore(10) = roundScore(7) + dice(3);
					roundScore = roundScore + dice;
		
					// we tell the DOM to change the text of the HTML ELEMENT w/ the id attribute name 'current-' to be the value of the roundScore
					// roundScore = 10; => <div id="current-0">10</div>
					// roundScore = 45; => <div id="current-1">45</div>
					document.querySelector('#current-' + activePlayer).textContent = roundScore; 
	
	}
	
	// if the value of dice is NOT GREATER THAN 1
	else { 
			
			// if the current active player is Player 1
			if (activePlayer === 0) {

					// the text of the current activePlayer becomes 0
					// the order of code DOES MATTER WITHIN the SCOPE CHAIN
					// the text is changed first
					// THEN the activePlayer is changed
					// w/o changing the text, the player will switch, the roundScore will reset, but the text won't display the reset
					document.querySelector('#current-' + activePlayer).textContent = '0';
				
					// makes the value of the roundScore resets back to 0
					roundScore = 0;

					// removes the "active" part of the class "player-0-panel"
					document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

					// the value of the activePlayer variable becomes 1 (aka Player 2)
					activePlayer = 1;
				
					// adds the "active" part of to class "player-1-panel"
					document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
			}
		
			// if the current active player is Player 2
			else if (activePlayer === 1) {
				
				// changes the text for "current" for the active player to 0
				document.querySelector('#current-' + activePlayer).textContent = '0';

				roundScore = 0;
				
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				
				activePlayer = 0;
				
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
			}
	}

});
