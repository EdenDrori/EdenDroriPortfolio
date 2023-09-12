const getRandomIntInclusive = (min, max) => {
  /*
    generate random number between min and max 
    */
  min = Math.ceil(min); //round up
  max = Math.floor(max); //round down
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};
let countClick = [];
let popup = document.querySelector("#popup");

game12Arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
game18Arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
game24Arr = [
  1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12,
];

const fillCards = (array) => {
  let cards = document.querySelectorAll(".cardDiv");
  for (let i = 0; i < array.length; i++) {
    let rn = getRandomIntInclusive(0, array.length - 1);
    let temp = array[i];
    array[i] = array[rn];
    array[rn] = temp;
  }
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = array[i];
  }

  playGame(cards);
};
window.addEventListener("load", () => {
  howManycards();
});

const howManycards = () => {
  let btn12 = document.querySelector("#btn12");
  let btn18 = document.querySelector("#btn18");
  let btn24 = document.querySelector("#btn24");
  let cardsContainer = document.querySelector("#cardsContainer");
  if (!btn12 && !btn18 && !btn24 && !cardsContainer) {
    return;
  }
  btn12.addEventListener("click", () => {
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 12; i++) {
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }
    fillCards(game12Arr);
    popup.style.display = "none";
  });
  btn18.addEventListener("click", () => {
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }
    fillCards(game18Arr);
    popup.style.display = "none";
  });
  btn24.addEventListener("click", () => {
    cardsContainer.innerHTML = "";
    for (let i = 0; i < 24; i++) {
      let card = document.createElement("div");
      card.className = "cardDiv";
      cardsContainer.appendChild(card);
    }
    fillCards(game24Arr);
    popup.style.display = "none";
  });
};
const playGame = (allCardsArr) => {
  for (let i of allCardsArr) {
    i.id = i.innerHTML;
    i.innerHTML = "";

    i.addEventListener("click", () => {
      i.innerHTML = i.id;
      countClick.push(i);
      if (countClick.length == 2) {
        checkClick();
      }
    });
  }
};

const checkClick = () => {
  if (
    countClick[0].innerHTML == countClick[1].innerHTML &&
    countClick[0].innerHTML != ""
  ) {
    setTimeout(() => {
      countClick[0].className = "remove";
      countClick[1].className = "remove";
      countClick[1].innerHTML = "";
      countClick[0].innerHTML = "";
      countClick[1].id = "";
      countClick[0].id = "";
      countClick = [];
      endGame();
    }, 500);
  } else {
    setTimeout(() => {
      countClick[0].innerHTML = "";
      countClick[1].innerHTML = "";
      countClick = [];
    }, 500);
  }
};
const endGame = () => {
  let cards = document.querySelectorAll("#cardsContainer>div");
  let allCards = 0;
  for (let i of cards) {
    if (i.className == "remove") {
      allCards++;
    }
  }
  if (cards.length == allCards) {
    popup.style.display = "block";
  }
};
