const rulesButtonElement = document.querySelector(".rules-button");
const closeButtonElement = document.querySelector(".close");
const modalBoxElement = document.querySelector(".modal");

rulesButtonElement.addEventListener("click", () => {
  modalBoxElement.classList.toggle("hidden");
});
closeButtonElement.addEventListener("click", () => {
  modalBoxElement.classList.toggle("hidden");
});

const paperItemElement = document.querySelector(".paper");
const scissorsItemElement = document.querySelector(".scissors");
const rockItemElement = document.querySelector(".rock");
const spockItemElement = document.querySelector(".spock");
const lizardItemElement = document.querySelector(".lizard");
const boardSelectElement = document.querySelector(".select");
const boardResultElement = document.querySelector(".result");
const itemSelectedElement = document.querySelector(".item-selected");
const itemComputerElement = document.querySelector(".item-computer");

function showHiddenDiv() {
  boardSelectElement.classList.toggle("hidden");
  boardResultElement.classList.toggle("hidden");
  rulesButtonElement.classList.toggle("hidden");
}

const itemsArray = ["paper", "rock", "scissors"];
const url = window.location.href;

if (url.includes("advanced")) {
  itemsArray.push("spock", "lizard");
  spockItemElement.addEventListener("click", e => {
    selectItem("spock");
  });
  lizardItemElement.addEventListener("click", e => {
    selectItem("lizard");
  });
}

const randomItem = array => array[Math.floor(Math.random() * array.length)];

let actualClass;
const selectItem = item => {
  showHiddenDiv();
  const computerItem = randomItem(itemsArray);
  const dirItemSelected = `assets/icon-${item}.svg`;
  const dirComputerItem = `assets/icon-${computerItem}.svg`;
  itemSelectedElement.children[0].src = dirItemSelected;
  itemComputerElement.children[0].src = dirComputerItem;
  itemSelectedElement.classList.add(item);
  itemComputerElement.classList.add(computerItem);
  actualClass = item;
  actualComputerClass = computerItem;
  game(item, computerItem);
  setTimeout(() => {
    itemSelectedElement.classList.add("grow");
    itemComputerElement.classList.add("grow");
  }, 100);
};
paperItemElement.addEventListener("click", e => {
  selectItem("paper");
});
scissorsItemElement.addEventListener("click", e => {
  selectItem("scissors");
});
rockItemElement.addEventListener("click", e => {
  selectItem("rock");
});

const playAgainButtonElement = document.querySelector(".result-text button");
playAgainButtonElement.addEventListener("click", () => {
  showHiddenDiv();
  itemSelectedElement.classList.remove(actualClass, "grow");
  itemComputerElement.classList.remove(actualComputerClass, "grow");
});

const gameRules = {
  paper: { scissors: false, rock: true, spock: true, lizard: false },
  scissors: { paper: true, rock: false, spock: false, lizard: true },
  rock: { paper: false, scissors: true, spock: false, lizard: true },
  spock: { paper: false, scissors: true, rock: true, lizard: false },
  lizard: { paper: true, scissors: false, rock: false, spock: true },
};
const resultTextElement = document.querySelector(".result-text > span");
const yourScoreElement = document.querySelector(".my-points");
const computerScoreElement = document.querySelector(".computer-points");

const game = (item, computerItem) => {
  yourScore = yourScoreElement.textContent;
  computerScore = computerScoreElement.textContent;

  if (item === computerItem) {
    resultTextElement.textContent = "DRAW";
  } else if (gameRules[item][computerItem]) {
    resultTextElement.textContent = "YOU WIN";
    yourScore++;
  } else {
    resultTextElement.textContent = "YOU LOSE";
    computerScore++;
  }
  yourScoreElement.textContent = yourScore;
  computerScoreElement.textContent = computerScore;
};
// gameRules[userOption][pcOption];
