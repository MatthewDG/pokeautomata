import Board from './board';

export default class GameView{


  constructor(stage){
    this.stage = stage;
    this.DIM_X = 1000;
    this.DIM_Y = 600;
    this.LINE_COLOR = "#ddd";
    this.squareSize = 10;
    this.numRows = this.DIM_X / this.squareSize;
    this.numCols = this.DIM_Y / this.squareSize;
    this.pokeBattlefield = new Board();
    this.addBoard();
  }


  addBoard(){
    let board = new createjs.Shape();
    board.graphics.beginFill("#fff").drawRect(0, 0, this.DIM_X, this.DIM_Y);
    this.stage.addChild(board);
    this.stage.update()

    let offset = [];
    offset[0] = ((this.numRows) % 2) / 2 * this.squareSize;
    offset[1] = ((this.numCols) % 2) / 2 * this.squareSize;

    this.drawGridLines(offset);
  };

  drawGridLines(offset){
    let line;

    for(let i = 0; i < this.numRows; i++){

      line = new createjs.Shape();
      line.graphics.moveTo(this.squareSize*i + offset[0], 0);
      line.graphics.beginStroke("#ddd").lineTo(this.squareSize*i + offset[0], this.DIM_Y);
      debugger
      this.stage.addChild(line);
      this.stage.update();
    }
  }

}