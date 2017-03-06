import pokeCell from './poke_cell';

const STARTER_TYPES = ["FIRE", "WATER", "GRASS"]



const FIRST_GEN_DISTRIBUTION = {
  "NORMAL" : (20/151),
  "WATER" : (18/151),
  "GRASS" : (13/151),
  "PSYCHIC" : (9/151),
  "FIRE" : (14/151),
  "ELECTRIC" : (7/151),
  "FLYING" : (10/151),
  "FIGHT" : (7/151),
  "BUG" : (13/151),
  "POISON" : (16/151),
  "GROUND" : (8/151),
  "DRAGON" : (3/151),
  "ROCK" : (11/151),
  "ICE" : (5/151),
  "ELECTRIC" : (3/151),
  "GHOST" : (3/151)
}

const SECOND_GEN_DISTRIBUTION = {
  "NORMAL" : (15/100),
  "WATER" : (15/100),
  "GRASS" : (9/100),
  "PSYCHIC" : (7/100),
  "FIRE" : (8/100),
  "ELECTRIC" : (7/100),
  "FLYING" : (3/100),
  "FIGHT" : (3/100),
  "BUG" : (2/100),
  "POISON" : (1/100),
  "GROUND" : (9/100),
  "ROCK" : (3/100),
  "ICE" : (5/100),
  "ELECTRIC" : (4/100),
  "GHOST" : (3/100),
  "DARK" : (8/100),
  "STEEL" : (5/100)
}

export default class Board{
  constructor(options = {}){
    this.cycle = 0;
    this.numRows = options.numRows || 8;
    this.numCols = options.numCols || 10;
    this.DELTAS = [ [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1] ];
    this.grid = [];
    this.initialState = "random"
    this.fillBoardType = "NORMAL"
    this.generateGrid();
  }

  generateGrid(){
    switch(this.initialState){
      case "random":
        this.generateRandomGrid();
        break;
      case "starterpokemon":
        this.generateStarterPokemonGrid();
        break;
      case "firstgen":
        this.generateFirstGenGrid();
        break;
      case "secondgen":
        this.generateSecondGenGrid();
        break;
      case "fillwithtype":
        this.fillBoardWithType(this.fillBoardType);
        break;
      case "empty":
        this.generateEmptyGrid();
      default:
        this.generateEmptyGrid();
    }
  }

  generateEmptyGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(let j = 0; j < this.numCols; j++){
        this.grid[i].push(new pokeCell("NONE"));
      }
    }
  }

  fillBoardWithType(type){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(let j = 0; j < this.numCols; j++){
        this.grid[i].push(new pokeCell(type));
      }
    }
  }

  generateRandomGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(let j = 0; j < this.numCols; j++){
        this.grid[i].push(new pokeCell())
      }
    }
  }

  generateStarterPokemonGrid(){
    for(let i = 0; i < this.numRows; i++){
      this.grid.push([]);
      for(let j = 0; j < this.numCols; j++){
        let sampleStarter = STARTER_TYPES[Math.floor(Math.random() * 3)];
        this.grid[i].push(new pokeCell(sampleStarter));
      }
    }
  }

  generateFirstGenGrid(){
    let gridDistribution = Object.assign({}, FIRST_GEN_DISTRIBUTION);
    let genOneTypes = Object.keys(gridDistribution);

    genOneTypes.forEach((type) => {
      return gridDistribution[type] = Math.ceil(gridDistribution[type] * this.numRows * this.numCols);
    })


    for(let i = 0; i < this.numRows; i++){
      this.grid.push([])
      for(let j = 0; j < this.numCols; j++){

        let sampleType = genOneTypes[Math.floor(Math.random() * genOneTypes.length)];
        while(gridDistribution[sampleType] <= 0){
          sampleType = Object.keys(gridDistribution)[Math.floor(Math.random() * genOneTypes.length)];
        }

        gridDistribution[sampleType] -= 1;
        this.grid[i].push(new pokeCell(sampleType));
      }
    }
  }

  generateSecondGenGrid(){
    let gridDistribution = Object.assign({}, SECOND_GEN_DISTRIBUTION);
    let genOneTypes = Object.keys(gridDistribution);

    genOneTypes.forEach((type) => {
      return gridDistribution[type] = Math.ceil(gridDistribution[type] * this.numRows * this.numCols);
    })


    for(let i = 0; i < this.numRows; i++){
      this.grid.push([])
      for(let j = 0; j < this.numCols; j++){

        let sampleType = genOneTypes[Math.floor(Math.random() * genOneTypes.length)];
        while(gridDistribution[sampleType] <= 0){
          sampleType = Object.keys(gridDistribution)[Math.floor(Math.random() * genOneTypes.length)];
        }

        gridDistribution[sampleType] -= 1;
        this.grid[i].push(new pokeCell(sampleType));
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
