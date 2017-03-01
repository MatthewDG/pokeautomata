export default class Board{
  constructor(options = {}){
    this.cycle = 0;
    this.numRows = options.numRows || 8;
    this.numCols = options.numCols || 10;
    this.grid = [];
    this.generateGrid();
  }

  generateGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(var j = 0; j < this.numCols; j++){
        this.grid[i].push("p")
      }
    }
  }

  resetBoard(){
    this.grid = [];
    this.cycle = [];
    this.generateGrid();
  }


}
