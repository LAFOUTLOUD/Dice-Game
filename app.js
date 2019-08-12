/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// we start by creating variables to hold data
var activePlayer, roundScore, scores, gamePlaying;

// we create a function w/ all of the data set to what we want the game to start off with
newGame();
// once a function is called, it runs its code once, and ends. It only continues if applied to a loop or something.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// controls all the changes that happen when the 'ROLL DICE' btn is clicked
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    // establishes that, all of the below code only happens IF the game is playing
    if (gamePlaying) {
        
        // 1. Random number
        var dice = Math.floor( Math.random() * 6 ) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            
        //Add score
        roundScore += dice; // this updates our internal variable value
        document.querySelector('#current-' + activePlayer).textContent = roundScore; // this displays the outcome
        
        // 4. Switches to the next player
        } else { 
            nextPlayer(); 
        }
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// controls all the changes that happen when the HOLD btn is clicked
document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gamePlaying) {
        
        // Add CURRENT score to GLOBAL/Player- score => when you click 'hold' it stores your points
        scores[activePlayer] += roundScore;
    
        // Update the UI (User Interface)
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
        // Check if player won the game
        if (scores[activePlayer] >= 10) {
        
            // we change the player's name to 'WINNER!'
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        
            // We hide the dice image
            document.querySelector('.dice').style.display = 'none';
        
            // we change the color of the 'WINNER'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        
            // we remove the red dot
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
            // makes the HOLD button unusable if a player wins the game
            gamePlaying = false;
        } 
        
        // whenever we click the HOLD' button, it switches to next player, UNLESS, that player's score >= 100
        else {
            nextPlayer(); 
        }   
    }
    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Add functionality to the NEW GAME' button
document.querySelector('.btn-new').addEventListener('click', newGame);

// instead of using an anonymous function, we can create a new function
// the newGame() function becomes the 2nd parameter for our Event Listener
// we dont include the () for newGame() because that tells it to start the

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// We use this function (that controls what happens when the active player rolls a 1) to not repeat code and adhere to DRY
function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // if active player = 0, then active player will now = 1
    roundScore = 0; // resets the activePlayer's round score back to 0
    
    // displays the reset score as '0'
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active'); // toggle adds if missing and removes if present
    document.querySelector('.player-1-panel').classList.toggle('active'); // the 'active' element is what we are toggling
        
    // hides the dice img IF the active player rolls a 1
    document.querySelector('.dice').style.display = 'none';
        // You cannot use 'diceDOM.style.display = 'none';' outside of the function it was declared in
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// to stick to the DRY principle, we can write a function instead of repeating code
function newGame() {
    
    // what do we have to do to start a new game?
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    
    // hides the dice img
    document.querySelector('.dice').style.display = 'none';
    
    // changes all of the scores to 0 (score => the 'player 1 && 2' scores, current => the 'current' scores)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // changes the player names back
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    // returns the 'red dot' to its starting point w/ Player 1
    document.querySelector('.player-0-panel').classList.remove('active'); // we do this just to avoid having 2 potential active classes
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    // removes the red color from the winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

// what changes when we click the button 
// we can also remove the code from earlier and put it down here
// then we can call the function right from the beginning, which is active, but wont be called until we click the button
// all of the code that activates right when the application loads can be moved down here for cleaner code

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Review

// ('' + activePlayer)
/*
so whats happening in a nutshell it takes the current value of activePlayer at the time that line gets called tacks that onto score- and since activePlayer will be 0 or 1 it will always result in score-0 or score-1

and that result is what the query selector looks up

> if we have a button, and an event, then we need to 'listen' to that event, so we use an 'Event Listener'
    > 'click' is what we are 'listening' for
    > we follow that up w/ an anonymous function (a function w/ no name, and no parameters, that we cannot use again outside of this code)
    > we call the newGame function as soon as the application loads
    > after creating the newGame function, we can also just call it within our 'btn-new' event listener
        > we can also put the new function name into

// Review
    1. We access the DOM through JavaScript => document.
    2. We select specific elements through the DOM => querySelector('?').style.display = 'none';
    3. Any HTML element must have '' around it => document.querySelector('.dice')
    4. Classes must have => document.querySelector('.?')
    5. IDs must have => document.querySelector('#?')
    6. We can change the CSS of an element w/ => ('?').style
    7. Afterwards, comes the CSS element we want to change => ('?').style.? = ''
    8. In this case, its the display: => ('?').style.display = ''
    
    2. scores[activePlayer] += roundScore => scores[activePlayer] = 'current 'scores[activePlayer] + 'current' roundScore;
*/