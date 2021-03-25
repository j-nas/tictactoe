const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let turn = "X";
  let boardO = [];
  let boardX = [];
  const getBoardO = () => boardO;
  const getBoardX = () => boardX;
  const setBoardO = (e) => {
    return boardO.push(e);
  };
  const setBoardX = (e) => {
    return boardX.push(e);
  };
  const getTurn = () => turn;
  const nextTurn = () => {
    if (turn == "X") {
      turn = "O";
    } else {
      turn = "X";
    }
  };
  
  
  const playerPlay = (e) => {
    if (getTurn() == "X") {
      setBoardX(e);
      drawBoard.updateBoard()
      gameBoard.checkVictory(getBoardX());
    }
    if (getTurn() == "O") {
      setBoardO(e);
      drawBoard.updateBoard()
      gameBoard.checkVictory(getBoardO());
    }
    nextTurn();
  };
  const checkVictory = (player) => {   
    for (let i = 0; i < winConds().length; i++) {
      let count = 0
      for (let j = 0; j < winConds()[i].length; j++) {
        if (player.includes(winConds()[i][j])) {
          count += 1
        }
        if (count == 3) {
          drawBoard.lockBoard()
          return alert("PLAYER " + getTurn() + "WINS!")
        }
      }
    }
    if (getBoardX().length + getBoardO().length == 9) {
      drawBoard.lockBoard()
      return alert("TIE GAME DUDES");
    }
  };
  const winConds = () => [
    [8, 5, 2],
    [8, 1, 6],
    [8, 3, 4],
    [3, 5, 7],
    [4, 9, 2],
    [1, 5, 9],
    [6, 7, 2],
    [6, 5, 4]
  ]
  
  const reset = () => { 
    turn = "X";
    boardO = [];
    boardX = [];
    drawBoard.clearBoard()
  };

  return {
    getBoardO,
    getBoardX,
    setBoardO,
    setBoardX,
    getTurn,
    nextTurn,
    playerPlay,
    checkVictory,
    winConds,
    reset,
  };
})();

const drawBoard = (() => {
  let playerX = "❌"
  let playerO = "⭕"
  let squares = document.querySelectorAll(".square");
  const clearBoard = () => {
    squares.forEach((div) => {
      div.textContent = "";
      div.removeAttribute("style")
    });
  };
  const lockBoard = () => {
    squares.forEach((div) => {
      div.style.pointerEvents = "none"

    })
  }
  const updateBoard = () => {
    for (let i = 0; i < gameBoard.getBoardO().length; i++) {
      document.querySelector(`[data-sq="${gameBoard.getBoardO()[i]}"]`)
        .textContent = playerO;
    }
    for (let j = 0; j < gameBoard.getBoardX().length; j++) {
      document.querySelector(`[data-sq="${gameBoard.getBoardX()[j]}"]`)
        .textContent = playerX;
    }
  };
  squares.forEach((e) => {
    e.addEventListener("click", () => {
      gameBoard.playerPlay(+e.dataset.sq);
      e.style.pointerEvents = "none";
    });
  });
  return {
    clearBoard,
    updateBoard,
    lockBoard
  };
})();
