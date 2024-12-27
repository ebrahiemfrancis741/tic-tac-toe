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

  return {grid, markCell, isMarked, matchFound};

})();

function createPlayer(name, mark, score){
  return {name, mark, score};
}

function main(){
  console.log(gameBoard.grid);
}

main();