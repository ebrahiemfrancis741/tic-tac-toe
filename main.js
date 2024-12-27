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

  const gridHasSpace = ()=>{
    for(let i = 0; i < grid.length; i++){
      if(grid[i] == ""){
        return true;
      }
    }
    return false;
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

  return {grid, markCell, isMarked, matchFound, resetGrid, gridHasSpace};

})();

const players = (function(){
  const createPlayer = (name, mark, score) =>{
    const increaseScore = function(){
      this.score++;
    }
    return {name, mark, score, increaseScore};
  }
  
  const player1 = createPlayer("player 1", "x", 0);
  const player2 = createPlayer("player 2", "o", 0);
  return {player1, player2};
})();

const UIManager = (function(){

  const setupEventHandlers = (() =>{
    const gameBoardElement = document.querySelector(".game-board");
    const restartBtn = document.querySelector(".restart-btn");

    gameBoardElement.addEventListener("click", (e)=>{
      const cell = e.target;
      const cellIndex = cell.id.split("-")[1];
      if( !gameBoard.isMarked(cellIndex)){
        gameBoard.grid[cellIndex] = Round.getCurrentPlayer().mark;
        cell.textContent = Round.getCurrentPlayer().mark;
        if(gameBoard.matchFound(Round.getCurrentPlayer())){
          Round.getCurrentPlayer().increaseScore();
          announce(Round.getCurrentPlayer().name + " is the winner");
          updatePlayerInfo();
          return;
        }
        if(!gameBoard.gridHasSpace()){
          announce("This round is a draw!");
          return;
        }
        Round.switchPlayer();
      }
    });

    restartBtn.addEventListener("click", (e)=>{
      Round.startRound();     
    });
  })();

  const announce = (message)=>{
    let announceElement = document.querySelector(".announcements");
    announceElement.textContent = message;
  }


  const updatePlayerInfo = ()=>{
    const playerInfoContainer = document.querySelector(".player-info-container");
    playerInfoContainer.children[0].children[0].textContent = players.player1.mark;
    playerInfoContainer.children[0].children[1].textContent = players.player1.name;
    playerInfoContainer.children[0].children[2].textContent = players.player1.score;

    playerInfoContainer.children[1].children[0].textContent = players.player2.mark;
    playerInfoContainer.children[1].children[1].textContent = players.player2.name;
    playerInfoContainer.children[1].children[2].textContent = players.player2.score;
  }

  const resetGridUI = ()=>{
    const gameBoardElement = document.querySelector(".game-board");
    for(let i = 0; i < gameBoardElement.children.length; i++){
      gameBoardElement.children[i].textContent = "";
    }
  }

  return {resetGridUI, announce, updatePlayerInfo};
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
    UIManager.announce(`${getCurrentPlayer().name}'s turn`);
  }

  const startRound = () =>{
    numRounds++;
    assignRandomMark();
    gameBoard.resetGrid();
    UIManager.resetGridUI();
    UIManager.announce(`${getCurrentPlayer().name}'s turn`);
    UIManager.updatePlayerInfo();
  }

  return {getNumRounds, getCurrentPlayer, startRound, switchPlayer};

})();

function main(){
  Round.startRound();
  console.log(Round.getCurrentPlayer().name + " starts first");
}

main();