import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const ctx = document.getElementById('ctx');

  $('#play-button').on('click', () => {
    if(!createjs.Ticker.paused){
      $('#play-button').text("PLAY");
      createjs.Ticker.paused = true;
    } else {
      $('#play-button').text("PAUSE");
      createjs.Ticker.paused = false;
    }
  })

  const stage = new createjs.Stage(ctx);
  stage.mouseEventsEnabled = true;
  stage.keyboardEventsEnabled = true;
  const view = new GameView(stage);
  view.drawBoard();
  
  createjs.Ticker.framerate = 10;
  createjs.Ticker.paused = true;
  createjs.Ticker.addEventListener("tick", (event) => {
    if(!event.paused){
      stage.removeAllChildren();
      view.pokeBattlefield.battle();
      view.redrawBoard();
      stage.update();
    }
  });

});
