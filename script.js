const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let turn = 0;
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
    if (turn == 0) {
      turn = 1;
    } else {
      turn = 0;
    }
  };

  //event listener for squares

  const squares = document.querySelectorAll(".square");
  console.table(squares);
  const playerPlay = (e) => {
    if (getTurn() == 0) {
      setBoardX(e);
      drawBoard.updateBoard()
    }
    if (getTurn() == 1) {
      setBoardO(e);
      drawBoard.updateBoard()
    }
    nextTurn();
  };
  const checkVictory = () => {
    if (getBoardO().length > 2 && getBoardO().reduce((a, b) => a + b) == 15) {
      return alert("PLAYER O WINS");
    }
    if (getBoardX().length > 2 && getBoardX().reduce((a, b) => a + b) == 15) {
      return alert("PLAYER X WINS");
    }
    if (getBoardX().length + getBoardO().length == 9)
      return alert("TIE GAME DUDES");
  };

  const reset = () => {
    turn = 0;
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
      console.log(e.dataset.sq);
      gameBoard.playerPlay(+e.dataset.sq);
      e.style.pointerEvents = "none";
      gameBoard.checkVictory();
    });
  });
  return {
    clearBoard,
    updateBoard,
  };
})();
