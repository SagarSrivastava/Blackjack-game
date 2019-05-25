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
let gameEnded = false;
let playerWon = false;
let deck = [];
let dealerCards = [];
let playerCards = [];
let playerValue = 0;
let dealerValue = 0;

function showStatus()
{
  if(!gameStarted)
  {
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    paragraph.innerText = "Let's Play\n";
  }
  else
  {
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';

    dealerValue = calculateTotal(dealerCards);
    playerValue = calculateTotal(playerCards);
    
    paragraph.innerText = "The Dealer's cards are -\n  "
    + displayCards(dealerCards) + "Dealer's score: "+ dealerValue + "\n\nThe Player's cards are -\n "
    + displayCards(playerCards) + "Player's score: " + playerValue + "\n\n";
    if(!gameEnded)
    {
      paragraph.innerText += "Please make your next move\n";
    }
    else
    {
      if(playerWon)
        paragraph.innerText += "PLAYER WINS!\n";
      else
        paragraph.innerText += "DEALER WINS!\n";
      
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';

      paragraph.innerText += "Please click the New Game button to play again!\n"
    }
  }
}

// Event handlers
newGameButton.addEventListener('click',function(){

  gameStarted = true;
  gameEnded = false;
  playerWon = false;
  deck = createDeck();
  shuffleDeck(deck);

  playerCards = [];
  dealerCards = [];

  // Cards given at the start of the game.
  playerCards.push(getNextCard());
  dealerCards.push(getNextCard());
  playerCards.push(getNextCard());
  dealerCards.push(getNextCard());

  showStatus();
});

hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  CheckGameResult();
  showStatus();
});

stayButton.addEventListener('click',function(){
  gameEnded = true;
  CheckGameResult();
  showStatus();
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

function getNextCard()
{
    return deck.shift();
}

function displayCards(cards)
{
  let cardText = ""
  for(let i = 0;i<cards.length;i++)
  {
      cardText += cards[i].value + " of " + cards[i].suit + "\n";
  }
  return cardText;
}

function calculateTotal(cards)
{
  let totalValue = 0;
    for(let i = 0;i<cards.length;i++)
      totalValue += addVal(cards[i].value);
  return totalValue; 
}

function addVal(value)
{
  switch(value)
  {
    case "Ace": return 1;
    case "Two": return 2;
    case "Three": return 3;
    case "Four": return 4;
    case "Five": return 5;
    case "Six": return 6;
    case "Seven":return 7;
    case "Eight": return 8;
    case "Nine": return 9;
    case "Ten": return 10;
    default: return 10;
  }
}

function updateScores()
{
   playerValue = 0,dealerValue = 0;
   for(let i = 0;i < playerCards.length;i++)
      playerValue += addVal(playerCards[i].value);
   for(let i = 0;i < dealerCards.length;i++)
      dealerValue += addVal(dealerCards[i].value);
}

function CheckGameResult()
{
  if(gameEnded == true)
  {
    while(dealerValue < 17)
    {
      dealerCards.push(getNextCard());
      updateScores();
    }
    if(dealerValue > 21)
      playerWon = true;
    else if(dealerValue < playerValue)
      playerWon = true;
    else
      playerWon = false;
  }
  else
  {
    updateScores();
    if(playerValue > 21)
    {
      gameEnded = true;
      playerWon = false;
    }
  }
}
showStatus();
