let whoPlayNow; // Who is playing now?
let popup = document.querySelector("#popup");
let xScores = document.getElementById("xScores");
let oScores = document.getElementById("oScores");
xScores.innerHTML = 0;
oScores.innerHTML = 0;

const ifEndGame = () => {
  let whoWonTheGame;
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (!cells || cells.length !== 9) {
    return;
  }
  //*check vertical
  // console.log(cells);
  for (let i = 0; i <= 2; i++) {
    if (
      cells[i].innerHTML == cells[i + 3].innerHTML &&
      cells[i + 3].innerHTML == cells[i + 6].innerHTML &&
      cells[i].innerHTML
    ) {
      //one of the columns is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check horizontal
  for (let i = 0; i < 9; i += 3) {
    if (
      cells[i].innerHTML == cells[i + 1].innerHTML &&
      cells[i + 1].innerHTML == cells[i + 2].innerHTML &&
      cells[i].innerHTML
    ) {
      //one of the columns is equal
      whoWonTheGame = cells[i].innerHTML;
    }
  }
  //*check diagonal
  // \
  let i = 0;
  if (
    cells[i].innerHTML == cells[i + 4].innerHTML &&
    cells[i + 4].innerHTML == cells[i + 8].innerHTML &&
    cells[i].innerHTML
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  i = 2;
  if (
    cells[i].innerHTML == cells[i + 2].innerHTML &&
    cells[i + 2].innerHTML == cells[i + 4].innerHTML &&
    cells[i].innerHTML
  ) {
    whoWonTheGame = cells[i].innerHTML;
  }
  //*check if game end and someone won or even
  if (popup) {
    if (whoWonTheGame) {
      popup.style.display = "block";
      popup.innerHTML = `${whoWonTheGame} won the game`;
      if (whoWonTheGame == "x") {
        xScores.innerHTML++;
      } else if (whoWonTheGame == "o") {
        oScores.innerHTML++;
      }
    } else {
      for (let cell of cells) {
        if (!cell.innerHTML) {
          return; //stop here and continue the game
        }
      }
      popup.style.display = "block";
      popup.innerHTML = "no one won the game";
    }
  }
};

const handleClickXO = (myE) => {
  /*
    1) check if empty
    2) set innerHTML
    3) next turn
    4) end game
  */
  if (myE.target.innerHTML != "") {
    //the div has "" or o
    return; // stop here
  }
  //the div is empty and I can put in this div "" or o
  myE.target.innerHTML = whoPlayNow;
  whoPlayNow == "x" ? (whoPlayNow = "o") : (whoPlayNow = "x");
  ifEndGame();
};

const initPageLoad = () => {
  //set click on every cell
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (cells) {
    for (let myDiv of cells) {
      myDiv.addEventListener("click", handleClickXO);
    }
  }
};

const newGame = () => {
  whoPlayNow = "x"; // "" start first
  let cells = document.querySelectorAll("#gamerDiv > div"); // get all cells
  if (cells) {
    for (let cell of cells) {
      cell.innerHTML = "";
    }
    popup.style.display = "none";
  }
};

window.addEventListener("load", () => {
  initPageLoad();
  newGame();
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    newGame();
  });
});
