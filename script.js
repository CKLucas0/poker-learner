const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function getRandomCard(exclude = []) {
  let card;
  do {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    card = `${rank}${suit}`;
  } while (exclude.includes(card));
  return card;
}

function generateHand() {
  const firstCard = getRandomCard();
  const secondCard = getRandomCard([firstCard]);

  const cardDisplay = document.getElementById('card-display');
  cardDisplay.textContent = `${firstCard}  ${secondCard}`;

  document.getElementById('result').textContent = '';
}

function handleDecision(decision) {
  const result = document.getElementById('result');
  result.textContent = `Je hebt gekozen voor: ${decision}`;
}

// Genereer eerste hand bij opstart
window.onload = generateHand;

