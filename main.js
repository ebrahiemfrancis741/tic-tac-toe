const gameBoard = (function(){
	const grid = ["","","","","","","","",""]

  const markCell = (index,player) => {
    if(!isMarked(index)){
      grid[index] = player;
    }
  }

  const isMarked = (index) => {
    if(grid[index] == ""){
      return false;
    }
    return true;
  }

  // this might not be needed
  const isMarkedByPlayer = (index, player) => {
    if(grid[index] == player.mark){
      return true;
    }
    return false;
  }

  const resetGrid = ()=>{
    for(let i = 0; i < grid.length; i++){
      grid[i] = "";
    }
  }

  const matchFound = (player) =>{
    if(isHorizontalMatch(player) || isVerticalMatch(player) || isDiagonalMatch(player)){
      return true;
    }
    else{
      return false;
    }
  }


  // very messy implementation for now
  const isHorizontalMatch =  (player) => {
    if(
      grid[0] == player.mark &&
      grid[1] == player.mark &&
      grid[2] == player.mark
    ){
      return true;
    }
    else if(
      grid[3] == player.mark &&
      grid[4] == player.mark &&
      grid[5] == player.mark
    ){
      return true;
    }
    else if(
      grid[6] == player.mark &&
      grid[7] == player.mark &&
      grid[8] == player.mark
    ){
      return true;
    }
    else{
      return false;
    }
  }

  // very messy implementation for now
  const isVerticalMatch =  (player) => {
    if(
      grid[0] == player.mark &&
      grid[3] == player.mark &&
      grid[6] == player.mark
    ){
      return true;
    }
    else if(
      grid[1] == player.mark &&
      grid[4] == player.mark &&
      grid[7] == player.mark
    ){
      return true;
    }
    else if(
      grid[2] == player.mark &&
      grid[5] == player.mark &&
      grid[8] == player.mark
    ){
      return true;
    }
    else{
      return false;
    }
  }

  const isDiagonalMatch =  (player) => {
    if(
      grid[0] == player.mark &&
      grid[4] == player.mark &&
      grid[8] == player.mark
    ){
      return true;
    }
    else if(
      grid[2] == player.mark &&
      grid[4] == player.mark &&
      grid[6] == player.mark
    ){
      return true;
    }
    else{
      return false;
    }
  }

  return {grid, markCell, isMarked, matchFound, resetGrid};

})();

const players = (function(){
  const createPlayer = (name, mark, score) =>{
    const increaseScore = function(){
      this.score++;
    }
    return {name, mark, score, increaseScore};
  }
  
  const player1 = createPlayer("player1", "x", 0);
  const player2 = createPlayer("player2", "o", 0);
  return {player1, player2};
})();

const UIManager = (function(){

  const setupEventHandlers = (() =>{
    const gameBoardElement = document.querySelector(".game-board");
    gameBoardElement.addEventListener("click", (e)=>{
      const cell = e.target;
      const cellIndex = cell.id.split("-")[1];
      if( !gameBoard.isMarked(cellIndex)){
        gameBoard.grid[cellIndex] = Round.getCurrentPlayer().mark;
        cell.textContent = Round.getCurrentPlayer().mark;
        if(gameBoard.matchFound(Round.getCurrentPlayer())){
          Round.getCurrentPlayer().increaseScore();
          console.log(Round.getCurrentPlayer().name + " is the winner");
        }
        Round.switchPlayer();
      }
    });
  })();

  const resetGridUI = ()=>{
    const gameBoardElement = document.querySelector(".game-board");
    for(let i = 0; i < gameBoardElement.children.length; i++){
      gameBoardElement.children[i].textContent = "";
    }
  }

  return {setupEventHandlers, resetGridUI};
})();

const Round = (function(){
  let numRounds = 0;
  let currentPlayer = players.player1;

  const getCurrentPlayer = () => currentPlayer;
  const getNumRounds = () => numRounds;
  const assignRandomMark = ()=>{
    if(Math.ceil(Math.random() * 2) == 1){
      players.player1.mark = "x";
      players.player2.mark = "o";
      currentPlayer = players.player1;
    }
    else{
      players.player1.mark = "o";
      players.player2.mark = "x";
      currentPlayer = players.player2;
    }
  }

  const switchPlayer = () =>{
    if(currentPlayer == players.player1){
      currentPlayer = players.player2;
    }
    else{
      currentPlayer = players.player1;
    }
  }

  const startRound = () =>{
    numRounds++;
    assignRandomMark();
    gameBoard.resetGrid();
    UIManager.resetGridUI();
  }

  return {getNumRounds, getCurrentPlayer, startRound, switchPlayer};

})();

function main(){
  Round.startRound();
  console.log(Round.getCurrentPlayer().name + " starts first");
}

main();