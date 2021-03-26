const player = (() => {
  function Avatar(emoji, description, datasq) {
    this.emoji = emoji
    this.description = description
    this.datasq = datasq
  }
  const fec = new Avatar("💩", "Foul", 0)
  const x = new Avatar("❌", "The classic", 8)
  const toilet = new Avatar('🚽', "Powerflush", 1)
  const taco = new Avatar("🌮", "The anti-hero", 6)
  const stoneguy = new Avatar("🗿", "The stone guy", 3)
  const guitar = new Avatar("🎸", "🤘🤘🤘🤘🤘", 5)
  const peach = new Avatar("🍑", "Peachy", 7)
  const beer = new Avatar("🍻", "Cheers!", 4)
  const lit = new Avatar("🔥", "Lit", 9)
  const nope = new Avatar("🚫", "Nope", 2)
  let currentAvatar = x
  const getAvatarList = () => {
    return [x, toilet, taco, stoneguy, guitar, peach, beer, lit, nope]
  }
  const setCurrentAvatar = (dataav) => {
    currentAvatar = getAvatarList().find(obj => obj.datasq == dataav)
    
    
  }
  const getCurrentAvatar = () => {
    return currentAvatar
  }
  const getOpponentAvatar = () => {
    return fec
  }
  return {
    
    getAvatarList,
    setCurrentAvatar,
    getCurrentAvatar,
    getOpponentAvatar,
  }
})()

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
          return alert("PLAYER " + getTurn() + " WINS!")
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
  let squares = document.querySelectorAll(".square");
  const clearBoard = () => {
    squares.forEach((e) => {
      e.textContent = "";
      e.removeAttribute("style")
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
        .textContent =  player.getOpponentAvatar().emoji
    }
    for (let j = 0; j < gameBoard.getBoardX().length; j++) {
      document.querySelector(`[data-sq="${gameBoard.getBoardX()[j]}"]`)
        .textContent =  player.getCurrentAvatar().emoji;
    }
  };

   
  
  
  
  
  
  const avatarSel = () => {
  
    gameBoard.reset()    
    for (let i = 0; i < player.getAvatarList().length; i++) {//loop to create 
      let innerSquare = document.createElement("div")        //selection squares
      innerSquare.setAttribute(`data-av`, `${player.getAvatarList()[i].datasq}`)
      innerSquare.classList.add("innerSquare")
      innerSquare.innerText = `${player.getAvatarList()[i].emoji}`
      
      document.querySelector(`[data-sq="${player.getAvatarList()[i].datasq}"]`).appendChild(innerSquare)
    }
    let innerSquare = document.querySelectorAll(".innerSquare")
    innerSquare.forEach((e) => {
      e.addEventListener("click", () => {
        player.setCurrentAvatar(+e.dataset.av)
        console.log(player.getCurrentAvatar())
      })
    })
    
  }

  squares.forEach((e) => { //regular gameplay listener
    e.addEventListener("click", () => {
      gameBoard.playerPlay(+e.dataset.sq);
      e.style.pointerEvents = "none";
    });
  });
  const getSquares = () => {
    return (squares)
  }
  return {
    getSquares,
    clearBoard,
    updateBoard,
    lockBoard,
    avatarSel,

   
  };
})();
