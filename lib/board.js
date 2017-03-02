import pokeCell from './poke_cell';

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
        this.grid[i].push(new pokeCell())
      }
    }
  }

  draw(stage, offset, numPokes, squareSize){
    let offsetX = (this.numRows - Math.floor(numPokes[0] - numPokes[0] % 2)) / 2;
    let offsetY = (this.numCols - Math.floor(numPokes[1] - numPokes[1] % 2)) / 2;
    
    this.grid.forEach( (row, idx) => {
      row.forEach( (pokeCell, idx2 ) => {
        let cell = new createjs.Shape();

        cell.graphics.beginFill(pokeCell.color).drawRect((idx - offsetX) * squareSize + offset[0], (idx2 - offsetY) * squareSize + offset[1], squareSize, squareSize);

        stage.addChild(cell);
        stage.update();
      })
    })

  }

  resetBoard(){
    this.grid = [];
    this.cycle = [];
    this.generateGrid();
  }


}
