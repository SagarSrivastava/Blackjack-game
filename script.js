//
// Blackjack
// Intro to Javascript project
//


// Values
let suits = ["Spades","Hearts","Clubs","Diamonds"];
let values = ["Ace","Two","Three","Four","Five","Six","Seven","Eight",
"Nine","Ten","Jack","Queen","King"];

// DOM Variables
let newGameButton = document.getElementById('New-Game');
let hitButton = document.getElementById('Hit');
let stayButton = document.getElementById('Stay');
let paragraph = document.getElementById('text-area');

// Game variables

let gameStarted = false;
let deck = [];
let playerValue = 0;
let dealerValue = 0;

function showStatus()
{
  if(!gameStarted)
  {
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    paragraph.innerText = 
    "Welcome to Blackjack\n Press the New Game button To start playing";
  }
}
// Event handlers
newGameButton.addEventListener('click',function(){

  gameStarted = true;
  deck = createDeck();
  shuffleDeck(deck);

});

hitButton.addEventListener('click',function(){

});

stayButton.addEventListener('click',function(){

});


// Miscellaneous Methods
function createDeck()
{
  let deck = [];
    for(let i = 0;i< suits.length;i++)
    {
      for(let j = 0;j<values.length;j++)
      {
        let card = {
          suit:suits[i],
          value:values[j]
        };
        deck.push(card);
      }
    }
    return deck;
}


function getNextCard()
{
    return deck.shift();
}

function displayCard(card)
{
    let result = card.value + " of " + card.suit;
    return result;
}

function shuffleDeck(deck)
{
  for(let cardIdx = 0; cardIdx < deck.length;cardIdx++)
  {
    let shuffleIdx = Math.trunc(Math.random()*52);
    let temp = deck[shuffleIdx];
    deck[shuffleIdx] = deck[cardIdx];
    deck[cardIdx] = temp;
  }
}

let playerCards = [getNextCard(),getNextCard()];
