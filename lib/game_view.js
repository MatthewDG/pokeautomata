import Board from './board';

export default class GameView{


  constructor(stage){
    this.stage = stage;
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.squareSize = 10;
    this.numRows = this.DIM_X / this.squareSize;
    this.numCols = this.DIM_Y / this.squareSize;
    this.offset = [((this.numRows) % 2) / 2 * this.squareSize, ((this.numCols) % 2) / 2 * this.squareSize]
    this.offset = [0, 0];
    this.typeToAssign = "NORMAL";
    this.showGridLines = true;
    this.pokeBattlefield = new Board( { numRows: this.numRows, numCols: this.numCols } );
    this.keydown = false;
    this.installHandlers();
    this.drawBoard();
  }

  installHandlers(){
    this.stage.on('mouseover', this.handleAssign.bind(this))
    this.stage.on('click', this.handleAssign.bind(this))
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(){
    if(event.key === 'Alt'){
      this.keydown = true;
    }
  }

  handleKeyUp(){
    this.keydown = false;
  }

  handleAssign(){
    let clickPos = [this.stage.mouseX, this.stage.mouseY];

    let cellX = Math.floor((clickPos[0] - this.numRows % 2/2*this.squareSize)/this.squareSize);
    let cellY = Math.floor((clickPos[1] - this.numCols % 2/2*this.squareSize)/this.squareSize);

    if(this.keydown){
      this.processMassAssign(cellX, cellY);
    } else {
      this.processAssign(cellX, cellY);
    }
  }

  processMassAssign(cellX, cellY){
    this.processAssign(cellX, cellY);
    let battlefield = this.pokeBattlefield.grid
    for(let delta = 1; delta <= 3; delta++){
      this.pokeBattlefield.assignCell(cellX + delta, cellY, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX + delta][cellY], this.stage, this.squareSize, cellX + delta, cellY, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX + delta, cellY + delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX + delta][cellY + delta], this.stage, this.squareSize, cellX + delta, cellY + delta, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX, cellY + delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX][cellY + delta], this.stage, this.squareSize, cellX, cellY + delta, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX - delta, cellY + delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX - delta][cellY + delta], this.stage, this.squareSize, cellX - delta, cellY + delta, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX - delta, cellY, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX - delta][cellY], this.stage, this.squareSize, cellX - delta, cellY, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX - delta, cellY - delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX - delta][cellY - delta], this.stage, this.squareSize, cellX - delta, cellY - delta, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX, cellY - delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX][cellY - delta], this.stage, this.squareSize, cellX, cellY - delta, this.showGridLines);

      this.pokeBattlefield.assignCell(cellX + delta, cellY - delta, this.typeToAssign);
      this.pokeBattlefield.drawCell(battlefield[cellX + delta][cellY - delta], this.stage, this.squareSize, cellX + delta, cellY - delta, this.showGridLines );
    }

    this.stage.update();
  }

  processAssign(cellX, cellY){
    this.pokeBattlefield.assignCell(cellX, cellY, this.typeToAssign);
    let clickedPokeCell = this.pokeBattlefield.grid[cellX][cellY]
    this.pokeBattlefield.drawCell(clickedPokeCell, this.stage, this.squareSize, cellX, cellY, this.showGridLines);
    this.stage.update();
  }

  drawBoard(){
    let board = new createjs.Shape();
    board.graphics.beginFill("#000").drawRect(0, 0, this.DIM_X, this.DIM_Y);
    this.stage.addChild(board);
    if(this.showGridLines){
      this.drawGridLines(this.offset);
    }
    this.stage.update();
  };

  redrawBoard(){
    this.pokeBattlefield.draw(this.stage, this.offset, [this.numRows, this.numCols], this.squareSize);

    if(this.showGridLines){
      this.drawGridLines(this.offset);
    }
  }

  drawGridLines(offset){
    let line;

    for(let i = 0; i < this.numRows + 1; i++){
      line = new createjs.Shape();
      line.graphics.beginStroke("#ddd").moveTo(this.squareSize*i + offset[0], 0)
      .lineTo(this.squareSize*i + offset[0], this.DIM_Y);
      this.stage.addChild(line);
    }

    for(let j = 0; j < this.numCols + 1; j++){
      line = new createjs.Shape();
      line.graphics.beginStroke("#ddd").moveTo(0, this.squareSize*j+offset[1])
      .lineTo(this.DIM_X, this.squareSize*j+offset[1]);
      this.stage.addChild(line);
    }
  }

}
