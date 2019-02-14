//BlackJack code here

let newGameButton = document.getElementById('New-Game'),
    hitButton = document.getElementById('Hit'),
    stayButton = document.getElementById('Stay');

newGameButton.style.visibility = 'visible';
hitButton.style.visibility = 'hidden';
stayButton.style.visibility = 'hidden';

newGameButton.addEventListener('click',function(){
    hitButton.style.visibility = 'visible';
    stayButton.style.visibility = 'visible';
});
