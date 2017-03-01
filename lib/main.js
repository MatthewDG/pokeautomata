import GameView from './game_view';

document.addEventListener("DOMContentLoaded", function(){
  const ctx = document.getElementById('ctx');
  const stage = new createjs.Stage(ctx);
  stage.mouseEventsEnabled = true;
  stage.keyboardEventsEnabled = true;
  createjs.Ticker.framerate = 60;
  createjs.Ticker.addEventListener(stage);
  const view = new GameView(stage);
});
