const btn = document.querySelector("#animate");
const cards = document.querySelectorAll(".card");

btn.addEventListener("click", () => {
  cards.forEach(card => {
    card.classList.add("card_animated");
  })
});