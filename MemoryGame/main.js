const containers = document.getElementsByClassName("container");

displayRandomCards();
const cards = document.querySelectorAll('.card');

function displayRandomCards() {
    let card_array = ['aurelia', 'angular', 'backbone', 'ember', 'react', 'vue'];
    let shuffledArray = shuffle(card_array);
    let result = '';

    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < shuffledArray.length; i++) {
            let card_string = `
            <div class="card" data-logo="${shuffledArray[i]}">
                <img class="front-face" src="./assets/${shuffledArray[i]}.svg" alt="">
                <img class="back-face" src="./assets/js-badge.svg" alt="">
            </div>`;
            result = result + card_string;
        }
    }
    containers[0].innerHTML = result;
}

cards.forEach(card => card.addEventListener('click', flipCard));
let firstCard;
let secondCard;
let isFlipped = false;

// 'this' inside eventListener callback refers to the element which fired the event, in 
//  this case specific card div).
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
            let sound = new Audio('./assets/match.wav');
            sound.play();

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
            }, 700);
        }
    }
}

function shuffle(arr) {
    let length = arr.length;
    for (const [index, value] of arr.entries()) {
        let random = Math.floor(Math.random() * length);
        let temp = value;
        arr[index] = arr[random];
        arr[random] = temp;
    }
    return arr;
}