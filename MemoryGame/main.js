const cards = document.querySelectorAll('.card');

cards.forEach(card => card.addEventListener('click', flipCard));

let firstCard;
let secondCard;
let isFlipped = false;

// 'this' inside eventListener callback refers to the element which you are attaching the event to (which fired the event, card div in this case).
function flipCard() {
    this.classList.toggle('flipped');

    if (!isFlipped) {
        isFlipped = true;
        firstCard = this;
        console.log(firstCard.dataset.logo);
    } else {
        isFlipped = false;
        secondCard = this;
        console.log(secondCard.dataset.logo);

        if (firstCard.dataset.logo === secondCard.dataset.logo) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 1000);
        }
    }
}