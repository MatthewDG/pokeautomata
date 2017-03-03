export default class pokeAutomataInterface{

  constructor(view){
    this.$playButton = $('#play-button');
    this.$resetButton = $('#reset-button');
    this.view = view;
    this.installClickHandlers();
  }

  installClickHandlers(){
    this.$playButton.on('click', this.playPause.bind(this));
    this.$resetButton.on('click', this.resetBoard.bind(this));
  }

  playPause(){
    if(!createjs.Ticker.paused){
      $('#play-button').text("PLAY");
      createjs.Ticker.paused = true;
    } else {
      $('#play-button').text("PAUSE");
      createjs.Ticker.paused = false;
    }
  }

  resetBoard(){
    this.view.pokeBattlefield.resetBoard()
    this.view.drawBoard();
  }



}
