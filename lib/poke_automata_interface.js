export default class pokeAutomataInterface{

  constructor(view){
    this.$playButton = $('#play-button');
    this.$resetButton = $('#reset-button');
    this.$toggleHoverAssign = $('#lock-select');
    this.$typeSelect = $('#type-select');
    this.$stepForward = $('#step-forward');
    this.$toggleGrid = $('#toggle-grid');
    this.$initialStateSelect = $('#initial-state');
    this.view = view;
    this.installHandlers();
  }

  installHandlers(){
    this.$playButton.on('click', this.playPause.bind(this));
    this.$resetButton.on('click', this.resetBoard.bind(this));
    this.$toggleHoverAssign.on('click', this.toggleHoverAssign.bind(this));
    this.$typeSelect.on('change', this.setTypeToAssign.bind(this));
    this.$stepForward.on('click', this.stepForward.bind(this));
    this.$toggleGrid.on('click', this.toggleGridLines.bind(this));
    this.$initialStateSelect.on('change', this.setInitialState.bind(this))
  }

  playPause(){
    if(!createjs.Ticker.paused){
      this.$playButton.text("PLAY");
      createjs.Ticker.paused = true;
    } else {
      this.$playButton.text("PAUSE");
      createjs.Ticker.paused = false;
    }
  }

  resetBoard(){
    this.view.pokeBattlefield.resetBoard()
    this.view.drawBoard();
  }

  toggleHoverAssign(){
    if(this.view.stage._mouseOverIntervalID){
      this.$toggleHoverAssign.text("Enable Hover Assign")
      this.view.stage.enableMouseOver(0);
    } else {
      this.$toggleHoverAssign.text("Disable Hover Assign")
      this.view.stage.enableMouseOver(100);
    }
  }

  setTypeToAssign(){
    this.view.typeToAssign = event.currentTarget.value;
    this.view.pokeBattlefield.fillBoardType = event.currentTarget.value;

    if(createjs.Ticker.paused){
      this.view.pokeBattlefield.resetBoard();
    }
  }

  stepForward(){
    this.view.stage.removeAllChildren();
    this.view.pokeBattlefield.battle();
    this.view.redrawBoard();
    this.view.stage.update();
  }

  toggleGridLines(){
    this.view.showGridLines = !this.view.showGridLines;
  }

  setInitialState(){
    this.view.pokeBattlefield.initialState = event.currentTarget.value;
    this.view.pokeBattlefield.resetBoard();
  }



}
