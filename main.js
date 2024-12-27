const gameBoard = (function(){
	const grid = ["","","","","","","","",""]

  const markCell = (index,player) => {
    if(!isMarked(index)){
      grid[index] = player;
    }
  }

  const isMarked = (index) => {
    if(grid[index] == ""){
      return true;
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

  return {grid, markCell, isMarked, matchFound, resetGrid};

})();

const players = (function(){
  const createPlayer = (name, mark, score) =>{
    return {name, mark, score};
  }
  
  const player1 = createPlayer("player1", "x", 0);
  const player2 = createPlayer("player2", "o", 0);
  return {player1, player2};
})();

const UIManager = (function(){

  const setupEventHandlers = () =>{
    const gameBoardElement = document.querySelector(".game-board");
    gameBoardElement.addEventListener("click", (e)=>{
      const cell = e.target;
      console.log(cell);
    });
  }

  return {setupEventHandlers};
})();

const Round = (function(){
  const numRounds = 0;
  let currentPlayer = players.player1;

  const assignRandomMark = ()=>{
    if(Math.ceil(Math.random() * 2) == 1){
      players.player1.mark = "x";
      players.player2.mark = "o";
    }
    else{
      players.player1.mark = "o";
      players.player2.mark = "x";
    }
  }

  return {numRounds, currentPlayer, assignRandomMark};

})();

function main(){
  UIManager.setupEventHandlers();
}

main();