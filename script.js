const player = (() => {
  function Avatar(emoji, description, datasq) {
    this.emoji = emoji;
    this.description = description;
    this.datasq = datasq;
  }
  const fec = new Avatar("\u{1F4A9}", "Foul", 0);
  const x = new Avatar("\u{1F1FD}", "The classic", 8);
  const toilet = new Avatar("\u{1F6BD}", "Powerflush", 1);
  const taco = new Avatar("\u{1f32e}", "The anti-hero", 6);
  const stoneguy = new Avatar("\u{1f5ff}", "The stone guy", 3);
  const guitar = new Avatar("\u{1f3b8}", "\u{1f918}".repeat(5), 5);
  const peach = new Avatar("\u{1f351}", "Peachy", 7);
  const beer = new Avatar("\u{1f37b}", "Cheers!", 4);
  const lit = new Avatar("\u{1f525}", "Lit", 9);
  const nope = new Avatar("\u{1f6ab}", "The Noper", 2);
  let currentAvatar = x;
  const getAvatarList = () => {
    return [x, toilet, taco, stoneguy, guitar, peach, beer, lit, nope];
  };
  const setCurrentAvatar = (dataav) => {
    currentAvatar = getAvatarList().find((obj) => obj.datasq == dataav);
    
  };
  const getCurrentAvatar = () => {
    return currentAvatar;
  };
  const getOpponentAvatar = () => {
    return fec;
  };
  return {
    getAvatarList,
    setCurrentAvatar,
    getCurrentAvatar,
    getOpponentAvatar,
  };
})();

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
      messageArea.playerOturn()
      drawBoard.updateBoard();
      gameBoard.checkVictory(getBoardX());
    }
    if (getTurn() == "O") {
      setBoardO(e);
      messageArea.playerXturn()
      drawBoard.updateBoard();
      gameBoard.checkVictory(getBoardO());
    }
    nextTurn();
  };
  const checkVictory = (player) => {
    for (let i = 0; i < winConds().length; i++) {
      let count = 0;
      for (let j = 0; j < winConds()[i].length; j++) {
        if (player.includes(winConds()[i][j])) {
          count += 1;
        }
        if (count == 3) {
          drawBoard.lockBoard();
          if(getTurn() == "X") {return messageArea.playerXvictor()}
          if(getTurn() == "O") {return messageArea.playerOvictor()}
        }
      }
    }
    if (getBoardX().length + getBoardO().length == 9) {
      drawBoard.lockBoard();
      return messageArea.tieGame()
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
    [6, 5, 4],
  ];

  const reset = (b) => {
    turn = "X";
    boardO = [];
    boardX = [];
    drawBoard.clearBoard();
    if (b == "a") {
      messageArea.playerXturn()
    }

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
  
  let squares = document.querySelectorAll(".square");
  const clearBoard = () => {
    squares.forEach((e) => {
      e.textContent = "";
      e.removeAttribute("style");
    });
  };
  const lockBoard = () => {
    squares.forEach((div) => {
      div.style.pointerEvents = "none";
    });
  };
  const updateBoard = () => {
    for (let i = 0; i < gameBoard.getBoardO().length; i++) {
      document.querySelector(
        `[data-sq="${gameBoard.getBoardO()[i]}"]`
      ).textContent = player.getOpponentAvatar().emoji;
    }
    for (let j = 0; j < gameBoard.getBoardX().length; j++) {
      document.querySelector(
        `[data-sq="${gameBoard.getBoardX()[j]}"]`
      ).textContent = player.getCurrentAvatar().emoji;
    }
  };

  const avatarSel = () => {
    messageArea.writePlayerSelect()
    gameBoard.reset("b");
    for (let i = 0; i < player.getAvatarList().length; i++) {
      let innerSquare = document.createElement("div"); 
      innerSquare.setAttribute(`data-av`, `${player.getAvatarList()[i].datasq}`)
      innerSquare.setAttribute(`onclick`, "event.stopPropagation()")
      innerSquare.classList.add("innerSquare");
      innerSquare.innerText = `${player.getAvatarList()[i].emoji}`;
      document
        .querySelector(`[data-sq="${player.getAvatarList()[i].datasq}"]`)
        .appendChild(innerSquare);
    }
    let innerSquare = document.querySelectorAll(".innerSquare");
    innerSquare.forEach((e) => {
      e.addEventListener("click", () => {
        player.setCurrentAvatar(+e.dataset.av);
        messageArea.writeSelection()
      });
    });
  };

  squares.forEach((e) => {
    e.addEventListener("click", () => {
      gameBoard.playerPlay(+e.dataset.sq);
      e.style.pointerEvents = "none";
    });
  });
  const getSquares = () => {
    return squares;
  };
  return {
    getSquares,
    clearBoard,
    updateBoard,
    lockBoard,
    avatarSel,
  };
})();
const messageArea = (() => {
  const messages = document.querySelector(".messages")
  const writePlayerSelect = () => {
    messages.innerText = "Choose your fighter:"
  }
  const writeSelection = () => {
    messages.innerText = `${player.getCurrentAvatar().emoji} 
      ${player.getCurrentAvatar().description}. If you are
      happy with your selection, press play.`
  }

  const playerXvictor = () => {
    messages.innerText = `Player ${player.getCurrentAvatar().emoji} wins! Press
      play to play again.`
  }

  const playerOvictor = () => {
    messages.innerText = `Player ${player.getOpponentAvatar().emoji} wins! Press
      play to play again.`
  }

  const tieGame = () => {
    messages.innerText = `Game is tied. Press play to play again`
  }

  const playerXturn = () => {
    messages.innerText = `${player.getCurrentAvatar().emoji}'s turn.`
  }

  const playerOturn = () => {
    messages.innerText = `${player.getOpponentAvatar().emoji}'s turn`
  }

  return {
    writePlayerSelect,
    writeSelection,
    playerXvictor,
    playerOvictor,
    tieGame,
    playerXturn,
    playerOturn,
  }
})()