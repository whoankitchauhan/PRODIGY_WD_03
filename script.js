document.addEventListener("DOMContentLoaded", function () {
  const boxes = document.querySelectorAll(".box");
  const resetButton = document.querySelector(".reset");
  const toggleButton = document.querySelector(".toggle-computer");
  let turn = "X";
  let againstComputer = false;
  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let modeMessage = document.querySelector(".mode-message");

  function updateModeMessage() {
    modeMessage.textContent = againstComputer
      ? "Playing against Computer"
      : "Playing against Friend";

    modeMessage.classList.toggle("playing-computer", againstComputer);
    modeMessage.classList.toggle("playing-friend", !againstComputer);
  }

  updateModeMessage();

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      handleTurn(box);
      if (againstComputer && turn === "O" && !checkWin() && !checkTie()) {
        setTimeout(() => {
          computerMove();
        }, 1000);
      }
    });
  });

  resetButton.addEventListener("click", resetGame);
  toggleButton.addEventListener("click", () => {
    againstComputer = !againstComputer;
    updateModeMessage();
    resetGame();
  });

  function handleTurn(box) {
    if (!isBoxEmpty(box)) return;

    box.innerText = turn;
    box.disabled = true;

    if (checkWin()) {
      announceWinner(turn);
      return;
    }

    if (checkTie()) {
      displayMessage("It's a tie!");
      setTimeout(() => {
        resetGame();
        clearMessage();
      }, 2000);
      return;
    }

    toggleTurn();
  }

  function isBoxEmpty(box) {
    return box.innerText === "";
  }

  function toggleTurn() {
    turn = turn === "X" ? "O" : "X";
  }

  function checkWin() {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        boxes[a].innerText !== "" &&
        boxes[a].innerText === boxes[b].innerText &&
        boxes[a].innerText === boxes[c].innerText
      ) {
        return true;
      }
    }
    return false;
  }

  function checkTie() {
    return Array.from(boxes).every((box) => box.innerText !== "");
  }

  function announceWinner(winner) {
    displayMessage(`${winner} wins!`);
    setTimeout(() => {
      resetGame();
      clearMessage();
    }, 2000);
  }

  function displayMessage(message) {
    const messageArea = document.querySelector(".message");
    messageArea.innerHTML = message;
  }

  function clearMessage() {
    const messageArea = document.querySelector(".message");
    messageArea.innerHTML = "";
  }

  function resetGame() {
    boxes.forEach((box) => {
      box.innerText = "";
      box.disabled = false;
    });
    turn = "X";
    clearMessage();
  }

  function computerMove() {
    const emptyBoxes = Array.from(boxes).filter((box) => box.innerText === "");
    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const computerBox = emptyBoxes[randomIndex];
      computerBox.innerText = turn;
      computerBox.disabled = true;

      if (checkWin()) {
        announceWinner(turn);
      } else if (checkTie()) {
        displayMessage("It's a tie!");
        setTimeout(() => {
          resetGame();
          clearMessage();
        }, 2000);
      } else {
        toggleTurn();
      }
    }
  }
});
