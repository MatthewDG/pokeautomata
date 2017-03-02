import Board from './board';

export default class GameView{


  constructor(stage){
    this.stage = stage;
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.LINE_COLOR = "#ddd";
    this.squareSize = 20;
    this.numRows = this.DIM_X / this.squareSize;
    this.numCols = this.DIM_Y / this.squareSize;
    this.pokeBattlefield = new Board( { numRows: this.numRows, numCols: this.numCols } );
    this.drawBoard();
  }


  drawBoard(){
    let board = new createjs.Shape();
    board.graphics.beginFill("#fff").drawRect(0, 0, this.DIM_X, this.DIM_Y);
    this.stage.addChild(board);
    this.stage.update()

    let offset = [];
    offset[0] = ((this.numRows) % 2) / 2 * this.squareSize;
    offset[1] = ((this.numCols) % 2) / 2 * this.squareSize;

    this.pokeBattlefield.draw(this.stage, offset, [this.numRows, this.numCols], this.squareSize)
    this.drawGridLines(offset);
  };

  drawGridLines(offset){
    let line;

    for(let i = 0; i < this.numRows + 1; i++){
      line = new createjs.Shape();
      line.graphics.beginStroke("#000").moveTo(this.squareSize*i + offset[0], 0)
      .lineTo(this.squareSize*i + offset[0], this.DIM_Y);
      this.stage.addChild(line);
      this.stage.update()
    }

    for(let j = 0; j < this.numCols + 1; j++){
      line = new createjs.Shape();
      line.graphics.beginStroke("#000").moveTo(0, this.squareSize*j+offset[1])
      .lineTo(this.DIM_X, this.squareSize*j+offset[1]);
      this.stage.addChild(line);
      this.stage.update()
    }
  }

}
