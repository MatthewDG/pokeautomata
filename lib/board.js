import pokeCell from './poke_cell';


export default class Board{
  constructor(options = {}){
    this.cycle = 0;
    this.numRows = options.numRows || 8;
    this.numCols = options.numCols || 10;
    this.DELTAS = [ [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1] ];
    this.grid = [];
    this.initialState = "none"
    this.generateGrid();
  }

  generateGrid(){
    switch(this.initialState){
      case "random":
        this.generateRandomGrid();
      case "starterpokemon":
        this.generateStarterPokemonGrid();
      default:
        this.generateEmptyGrid();
    }
  }

  generateEmptyGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(var j = 0; j < this.numCols; j++){
        this.grid[i].push(new pokeCell("NONE"));
      }
    }
  }

  generateRandomGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(var j = 0; j < this.numCols; j++){
        this.grid[i].push(new pokeCell())
      }
    }
  }

  generateStarterPokemonGrid(){
    const STARTER_TYPES = ["FIRE", "WATER", "GRASS"]
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(var j = 0; j < this.numCols; j++){
        let sampleStarter = STARTER_TYPES[Math.floor(Math.random() * 3)];
        this.grid[i].push(new pokeCell(sampleStarter));
      }
    }
  }

  assignCell(cellX, cellY, type){
    this.grid[cellX][cellY] = new pokeCell(type);
  }

  battle(){
    this.cycle += 1;
    for(let rowIdx = 0; rowIdx < this.numRows; rowIdx++){
      for(let colIdx = 0; colIdx < this.numCols; colIdx++){
        let pokeCell = this.grid[rowIdx][colIdx];

        if(pokeCell.type === "NONE"){
          continue;
        }
        let currentPos = [rowIdx, colIdx];
        let pokeNeighbors = [];

        for(let deltaIdx = 0; deltaIdx < this.DELTAS.length; deltaIdx++){
          let delta = this.DELTAS[deltaIdx];
          let neighborPos = [currentPos[0] + delta[0], currentPos[1] + delta[1]];
          if(this.inBounds(neighborPos)){
            let neighbor = this.grid[neighborPos[0]][neighborPos[1]];
            pokeNeighbors.push(neighbor);
          }

        }

          pokeCell.battleNeighbors(pokeNeighbors);
        }
      }
    }

  inBounds(pos){
    if(pos[0] < 0 || pos[0] >= this.numRows){
      return false;
    }

    if(pos[1] < 0 || pos[1] >= this.numCols){
      return false;
    }

    return true;
  }

  drawCell(pokeCell, stage, squareSize, idx, idx2){
    let cell = new createjs.Shape();

    cell.graphics.beginFill(pokeCell.color)
    .drawRect(idx * squareSize, idx2 * squareSize, squareSize, squareSize);
    stage.addChild(cell);
  }

  draw(stage, offset, numPokes, squareSize){
    let offsetX = (this.numRows - Math.floor(numPokes[0] - numPokes[0] % 2)) / 2;
    let offsetY = (this.numCols - Math.floor(numPokes[1] - numPokes[1] % 2)) / 2;

    this.grid.forEach( (row, idx) => {
      row.forEach( (pokeCell, idx2 ) => {
        this.drawCell(pokeCell, stage, squareSize, idx, idx2)
      })
    })

  }

  resetBoard(){
    this.grid = [];
    this.cycle = [];
    this.generateGrid();
  }


}
