import GameView from './game_view';


document.addEventListener("DOMContentLoaded", function(){
  const ctx = document.getElementById('ctx');
  const stage = new createjs.Stage(ctx);
  stage.mouseEventsEnabled = true;
  stage.keyboardEventsEnabled = true;
  const view = new GameView(stage);
  view.drawBoard();
  createjs.Ticker.framerate = 10;
  createjs.Ticker.addEventListener("tick", (event) => {
    stage.removeAllChildren();
    view.pokeBattlefield.battle();
    view.redrawBoard();
    stage.update();
  });
});
