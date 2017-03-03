import GameView from './game_view';
import pokeAutomataInterface from './poke_automata_interface';

document.addEventListener("DOMContentLoaded", function(){
  const ctx = document.getElementById('ctx');

  const stage = new createjs.Stage(ctx);
  stage.mouseEventsEnabled = true;
  stage.keyboardEventsEnabled = true;
  const view = new GameView(stage);
  const pokeUI = new pokeAutomataInterface(view);
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
