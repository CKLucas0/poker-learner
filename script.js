const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
let currentHand = [];

function getRandomCard(exclude = []) {
  let card;
  do {
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];
    card = { rank, suit };
  } while (exclude.some(c => c.rank === card.rank && c.suit === card.suit));
  return card;
}

function generateHand() {
  const firstCard = getRandomCard();
  const secondCard = getRandomCard([firstCard]);
  currentHand = [firstCard, secondCard];

  const cardDisplay = document.getElementById('card-display');
  cardDisplay.textContent = `${formatCard(firstCard)}  ${formatCard(secondCard)}`;

  document.getElementById('result').textContent = '';
}

function formatCard(card) {
  return `${card.rank}${card.suit}`;
}

function handleDecision(playerDecision) {
  const result = document.getElementById('result');
  const suggested = getRecommendedAction(currentHand);
  if (playerDecision === suggested.action) {
    result.innerHTML = `✅ Goede keuze (${playerDecision})<br><small>${suggested.reason}</small>`;
  } else {
    result.innerHTML = `❌ Fout (${playerDecision})<br><strong>Correcte keuze:</strong> ${suggested.action}<br><small>${suggested.reason}</small>`;
  }
}

function getRecommendedAction([card1, card2]) {
  // Vergelijk op basis van rank en suitedness
  const suited = card1.suit === card2.suit;
  const r1 = card1.rank;
  const r2 = card2.rank;

  // Zet op volgorde (bijv. A-K in volgorde)
  const [high, low] = [r1, r2].sort((a, b) => ranks.indexOf(b) - ranks.indexOf(a));
  const handKey = `${high}${low}${suited ? 's' : 'o'}`;

  // Basis preflop aanbevelingen
  const raiseHands = ['AA', 'KK', 'QQ', 'JJ', 'AKs', 'AQs'];
  const callHands  = ['TT', '99', 'AJs', 'KQs'];
  
  if (raiseHands.includes(handKey)) {
    return { action: 'Raise', reason: 'Sterke premium hand – altijd raisen vanaf UTG.' };
  } else if (callHands.includes(handKey)) {
    return { action: 'Call', reason: 'Redelijke hand – soms playable vanaf UTG, meestal als call of fold afhankelijk van tafel.' };
  } else {
    return { action: 'Fold', reason: 'Zwakke start – fold aanbevolen in early position.' };
  }
}

// Init
window.onload = generateHand;
