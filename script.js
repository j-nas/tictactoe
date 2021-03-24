const createPlayer = (name, marker) => {
  return { name, marker };
};

const gameBoard = (() => {
  let turn = 0
  let boardO = []
  let boardX = []
  const getBoardO = () => boardO
  const getBoardX = () => boardX
  const setBoardO = (e) => {return boardO.push(e)}
  const setBoardX = (e) => {return boardX.push(e)}
  const getTurn = () => turn
  const nextTurn = () => {
    if(turn == 0) {
      turn = 1;
      return 0
    } else {
      turn = 0;
      return 1
    }
  }
  
  //event listener for squares
  const squares = document.querySelectorAll(".square")
    squares.forEach((e) => {
    e.addEventListener('click', () => {
      console.log(e.dataset.sq)
      gameBoard.playerPlay(e.dataset.sq)
    })
  })
  console.table(squares)
  
  
  
  
  
  return {
    getBoardO,
    getBoardX,
    setBoardO,
    setBoardX,
    getTurn,
    nextTurn
  }
})();


const drawBoard = (() => {

})();