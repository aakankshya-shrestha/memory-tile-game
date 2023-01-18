const cardArray = [
  {
    name: "img1",
    img: "/images/img1.png",
  },
  {
    name: "img2",
    img: "/images/img2.png",
  },
  {
    name: "img3",
    img: "/images/img3.png",
  },
  {
    name: "img4",
    img: "/images/img4.png",
  },
  {
    name: "img5",
    img: "/images/img5.png",
  },
  {
    name: "img6",
    img: "/images/img6.png",
  },
  {
    name: "img1",
    img: "/images/img1.png",
  },
  {
    name: "img2",
    img: "/images/img2.png",
  },
  {
    name: "img3",
    img: "/images/img3.png",
  },
  {
    name: "img4",
    img: "/images/img4.png",
  },
  {
    name: "img5",
    img: "/images/img5.png",
  },
  {
    name: "img6",
    img: "/images/img6.png",
  },
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const resultDisplay = document.querySelector("#result");
const scoreLabel = document.querySelector("#scoreLabel");
let alertBox = document.querySelector(".alertBox");
let cardsChoosen = [];
let cardsChoosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "/images/tile.png");
    card.setAttribute("data-id", i);
    card.setAttribute("class", "image");
    card.addEventListener("click", flipCard);
    gridDisplay.appendChild(card);
  }
}
createBoard();
function showAlert() {
  alertBox.classList.add("active");
}

function hideAlert() {
  alertBox.classList.remove("active");
}

function checkMatch() {
  const cards = document.querySelectorAll(" #grid img");
  const optionOneId = cardsChoosenIds[0];
  const optionTwoId = cardsChoosenIds[1];

  if (optionOneId == optionTwoId) {
    // alert("You clicked on same image");
    alertBox.textContent = "You've clicked the same tile twice!";
    showAlert();
    setTimeout(hideAlert, 2500);
    cards[optionOneId].setAttribute("src", "/images/tile.png");
    cardsChoosen = [];
    cardsChoosenIds = [];
  } else if (cardsChoosen[0] == cardsChoosen[1]) {
    // alert("You found a match");
    alertBox.textContent = "You found a match!";
    showAlert();
    setTimeout(hideAlert, 2500);
    cards[optionOneId].setAttribute("src", "images/blank.png");
    cards[optionTwoId].setAttribute("src", "images/blank.png");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);
    cardsWon.push(cardsChoosen);
  } else {
    cards[optionOneId].setAttribute("src", "/images/tile.png");
    cards[optionTwoId].setAttribute("src", "/images/tile.png");
    // alert("Tiles did not match!");
    alertBox.textContent = "The tiles did not match!";
    showAlert();
    setTimeout(hideAlert, 2500);
  }
  console.log(cardsWon.length);
  resultDisplay.textContent = cardsWon.length;
  cardsChoosen = [];
  cardsChoosenIds = [];

  if (cardsWon.length == cardArray.length / 2) {
    hideAlert();
    scoreLabel.style.display = "none";
    resultDisplay.textContent = "Congratulation! You've matched all tiles.";
  }
}

function flipCard() {
  const cardId = this.getAttribute("data-id");

  cardsChoosen.push(cardArray[cardId].name);
  cardsChoosenIds.push(cardId);
  console.log(cardArray[cardId].name);
  this.setAttribute("src", cardArray[cardId].img);
  if (cardsChoosen.length == 2) {
    setTimeout(checkMatch, 500);
  }
}
