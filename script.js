//perdi uma parte da minha alma para fazer isso :(
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCards = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedCards += 2;

  if (matchedCards === cards.length) {
    showCongratulationsScreen();
  }

  resetBoard();
}


function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));



//TELA DE PARABENS
function showCongratulationsScreen() {
 const congratsDiv = document.createElement('div');
 congratsDiv.classList.add('congratulations-screen');
 congratsDiv.innerHTML = `
 <h2>Parabéns!</h2>
 <p>Você completou o jogo da memória!</p>
 <button onclick="location.reload()">Jogar Novamente</button>
 `;
 document.body.appendChild(congratsDiv);
 // AAAAAAAAAAAAAAAAAAAAAAAAAAA ESSE NGC DEMOROU UMA DECADA PARA FUNCIONAR 
 congratsDiv.classList.add('show');
//teste
}
  