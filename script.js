
let cardDeck = [];
let suits = ['hearts', 'diamonds', 'clubs', 'spades'];

let rankNames = ['','ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king'];
let playerHand = [];
let computerHand = [];
let counterNumber = "";
var doneButton = document.querySelector("#done-button");

var myImages = {
  win: '<img src = "https://media3.giphy.com/media/VzH7r2UUqwas8HZ3jd/200.webp"/>',
  lose: '<img src = "https://media4.giphy.com/media/jTAkn6hKyy2esWjOOZ/200.webp"/>',
  tie: '<img src = "https://media4.giphy.com/media/h5WUsjFmE6329tkcAz/200.webp"/>',
  start: '<img src = "https://media4.giphy.com/media/9xcBrf9lGQBXNBkjno/200w.webp"/>',
  stop: '<img src = "https://media2.giphy.com/media/uBn5A3rxwD7N8nZvlw/200.webp"/>',
  No: '<img src = "https://media3.giphy.com/media/oy9hVQl8Hq7o8T3tER/200w.webp"/>',
  work: '<img src = "https://media0.giphy.com/media/9PwWklO9tSELtIhBka/200w.webp"/>',
  end: '<img src = "https://media1.giphy.com/media/xBzJL8IAjDktZywKee/200.webp"/>',
};

doneButton.addEventListener("click", function () {
  var result = evaluateHands();
  displayResult(result);
});

function displayResult(result) {
  var output = document.querySelector("#output-div");
  output.innerHTML = result;
}


var main = function () {
  if (cardDeck.length == 0 && (playerHand.length == 0) && (computerHand.length == 0)) {
    cardDeck = makeDeck ();
    shuffleDeck (cardDeck);
    console.log (cardDeck);
    return `card deck has been generated and shuffled. Press "card deck" to draw cards. <br> ${myImages.start}`

  }
  
  else if ((cardDeck.length !==0) && (playerHand.length == 0) && (computerHand.length == 0)) {
      playerHand = playerDraws (2);
      computerHand = computerDraws (2);

      if ((calculateHandSum (computerHand)) <14) {
        while ((calculateHandSum (computerHand)) <14) {
        let cdrawnCards = computerDraws(1); 
        computerHand = computerHand.concat(cdrawnCards);
        console.log("Computer's hand:", getHandInfo(computerHand)); 
        }
        console.log (cardDeck);
      return `Both players cards are drawn, your cards are ${getHandInfo (playerHand)}! Press "card deck" if you wish to draw another card. Otherwise press "done" to compare hands. <br> ${myImages.No}`
    }
    else {
      console.log("Computer's hand:", getHandInfo(computerHand));
      console.log (cardDeck);
      return `Both players cards are drawn, your cards are ${getHandInfo (playerHand)}! Press "card deck" if you wish to draw another card. Otherwise press "done" to compare hands. <br> ${myImages.No}`

    }
  }
  else if ((cardDeck.length !==0) && (cardDeck !== 0) && (playerHand.length !== 0)) {

      let pdrawnCards = playerDraws(1); 
      playerHand = playerHand.concat(pdrawnCards);
    
    return `Your current cards are ${getHandInfo (playerHand)}, if you are happy with your hand, please press "done" to compare hands. Otherwise, please press "card deck" again to draw another card. <br> ${myImages.No}`
  }

  else if ((cardDeck.length == 0) && (cardDeck !== 0) && (playerHand.length !== 0)) {
    return `Wtf you doing? There aint any more cards in the deck. <br> ${myImages.stop}`

  }


  return `Your current cards are ${getHandInfo (playerHand)}, if you are happy with your hand, please press "done" to compare hands. Otherwise, please press "card deck" again to draw another card. <br> ${myImages.work}`

  }


function makeDeck() {

  for (let currentSuit of suits) {
    for (let rankCounter = 1; rankCounter <= 13; rankCounter++) {
      let cardName = rankNames[rankCounter];

      let card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      cardDeck.push(card);
    }
  }

  return cardDeck;
}


function shuffleDeck() {
  for (let x = cardDeck.length - 1; x > 0; x--) {
    let y = Math.floor(Math.random() * (x + 1));
    [cardDeck[x], cardDeck[y]] = [cardDeck[y], cardDeck[x]];
  }
}


function playerDraws (counterNumber){
  let PdrawnCards = []

  for (var i = 0; i < counterNumber; i++) {
    PdrawnCards.push (cardDeck.pop ());
    console.log (cardDeck);
    }
  return PdrawnCards
}

function computerDraws (counterNumber){
  let CdrawnCards = []

  for (var i = 0; i < counterNumber; i++) {
    CdrawnCards.push (cardDeck.pop ());
    console.log (cardDeck);
    }
  return CdrawnCards
}

function calculateHandSum(hand) {
  let sum = 0;
  let numAces = 0; 

  for (let card of hand) {
    if (card.rank >= 10) {
      sum += 10;
    } else if (card.rank == 1) {
      sum += 11;
      numAces++;
    } else {
      sum += card.rank;
    }
  }

  while (sum > 21 && numAces > 0) {
    sum -= 10;
    numAces--;
  }

  return sum;
}

function evaluateHands () {

  let playerSum = calculateHandSum(playerHand);
  let computerSum = calculateHandSum(computerHand);
 if ((playerHand.length !== 0) && (computerHand.length !== 0)){

  if (playerSum > 21) {
    if (computerSum > 21 || computerSum == playerSum) {
      var results =  `It's a tie. Both players busted. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.tie}`;
      playerHand = [];
      computerHand = [];
      cardDeck = [];
      return results;
    }
    else {

      var results =  `You lost. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.lose}`;
      playerHand = [];
      computerHand = [];
      cardDeck = [];
      return results;
    }
  } 
  else if (computerSum > 21) {
    var results = `You won. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.win}`
    playerHand = [];
    computerHand = [];
    cardDeck = [];
    return results;
  }

    else if (playerSum > computerSum) {
    var results = `You won. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.win}`;
    playerHand = [];
    computerHand = [];
    cardDeck = [];
    return results;
  } 
  
  else if (computerSum > playerSum) {
    var results = `You lost. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.lose}`;
    playerHand = [];
    computerHand = [];
    cardDeck = [];
    return results;
  }
  else if (computerSum == playerSum){
    var results = `It's a tie. Your cards are ${getHandInfo(playerHand)} and computer cards are ${getHandInfo(computerHand)} <br> ${myImages.tie}`;
    playerHand = [];
    computerHand = [];
     cardDeck = [];
    return results;

  }
}
else {
  return `Round has ended, press "Card deck" to start new round. <br> ${myImages.end}`

}
}

function getHandInfo(hand) {
  let handInfo = [];

  for (const card of hand) {
    let cardInfo = `${card.name} of ${card.suit}`;
    handInfo.push(cardInfo);
  }

  return handInfo.join(", ");
}

