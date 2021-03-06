import { zoom } from 'jquery-zoom';

export default class pokeAutomataInterface{

  constructor(view){
    this.$playButton = $('#play-button');
    this.$resetButton = $('#reset-button');
    this.$toggleHoverAssign = $('#lock-select');
    this.$stepForward = $('#step-forward');
    this.$toggleGrid = $('#toggle-grid');
    this.$initialStateSelect = $('#initial-state');
    this.$modalBackground = $('.modal');
    this.$modalContent = $('.modal-content');
    this.$modalText1 = $('.modal-text');
    this.$modalText2 = $('.modal-text-2');
    this.$rulesList = $('.rules-list');
    this.$prevButton = $('#prev-button');
    this.$nextButton = $('#next-button');
    this.$openInstructions = $('#instructions');
    this.$toggleColorGuide = $('#toggle-color');
    this.$massAssignInstruction = $('#mass-assign-instructions');
    this.view = view;
    this.installHandlers();
    this.openModal();
  }

  installHandlers(){
    this.$playButton.on('click', this.playPause.bind(this));
    this.$resetButton.on('click', this.resetBoard.bind(this));
    this.$toggleHoverAssign.on('click', this.toggleHoverAssign.bind(this));
    this.$stepForward.on('click', this.stepForward.bind(this));
    this.$toggleGrid.on('click', this.toggleGridLines.bind(this));
    this.$initialStateSelect.on('change', this.setInitialState.bind(this));
    this.$modalBackground.on('click', this.closeModal.bind(this));
    this.$prevButton.on('click', this.modalPrevious.bind(this));
    this.$nextButton.on('click', this.modalNext.bind(this));
    this.$openInstructions.on('click', this.openModal.bind(this));

    $('.type-button').on('click', this.setTypeToAssign.bind(this));
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
    this.changeAssignInstruction(event.currentTarget.value);

    if(createjs.Ticker.paused){
      this.view.pokeBattlefield.resetBoard();
    }
  }

  changeAssignInstruction(type){
    switch(type){
      case "NORMAL":
        this.$massAssignInstruction.text("Option/Alt + Click to use Hyper Beam!");
        break;
      case "FIGHT":
        this.$massAssignInstruction.text("Option/Alt + Click to use Seismic Toss!");
        break;
      case "FLYING":
        this.$massAssignInstruction.text("Option/Alt + Click to use Aerial Ace!");
        break;
      case "POISON":
        this.$massAssignInstruction.text("Option/Alt + Click to use Toxic!");
        break;
      case "GROUND":
        this.$massAssignInstruction.text("Option/Alt + Click to use Earthquake!");
        break;
      case "ROCK":
        this.$massAssignInstruction.text("Option/Alt + Click to use Rock Slide!");
        break;
      case "BUG":
        this.$massAssignInstruction.text("Option/Alt + Click to use String Shot!");
        break;
      case "GHOST":
        this.$massAssignInstruction.text("Option/Alt + Click to use Night Shade!");
        break;
      case "FIRE":
        this.$massAssignInstruction.text("Option/Alt + Click to use Flamethrower!");
        break;
      case "WATER":
        this.$massAssignInstruction.text("Option/Alt + Click to use Hydro Pump!");
        break;
      case "GRASS":
        this.$massAssignInstruction.text("Option/Alt + Click to use Razor Leaf!");
        break;
      case "ELECTRIC":
        this.$massAssignInstruction.text("Option/Alt + Click to use Thunder!");
        break;
      case "PSYCHIC":
        this.$massAssignInstruction.text("Option/Alt + Click to use Psybeam!");
        break;
      case "ICE":
        this.$massAssignInstruction.text("Option/Alt + Click to use Blizzard!");
        break;
      case "DRAGON":
        this.$massAssignInstruction.text("Option/Alt + Click to use Dragon Rage!");
        break;
      case "STEEL":
        this.$massAssignInstruction.text("Option/Alt + Click to use Iron Tail!");
        break;
      case "DARK":
        this.$massAssignInstruction.text("Option/Alt + Click to use Crunch!");
        break;
      case "FAIRY":
        this.$massAssignInstruction.text("Option/Alt + Click to use Light of Ruin!");
        break;
      default:
        return null;
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
    this.stepForward();
  }

  openModal(){
    this.$modalBackground[0].id = 0
    this.processModalContent();
    this.$modalBackground.css('display', 'block');
  }

  modalPrevious(){
    this.$modalBackground[0].id = parseInt(this.$modalBackground[0].id) - 1;
    this.processModalContent();
  }

  modalNext(){
    this.$modalBackground[0].id = parseInt(this.$modalBackground[0].id) + 1;
    this.processModalContent();
  }

  processModalContent(){
    let modalId = this.$modalBackground[0].id;

    if(modalId !== "0"){
      this.$prevButton.attr("enabled", "enabled")
      this.$prevButton.prop("disabled", false)
    } else {
      this.$prevButton.attr("enabled", "disabled")
      this.$prevButton.attr("disabled", true)
    }


    switch(modalId){
      case "0":
        this.$modalText1.text("Hello there! Welcome back to the world of Pokemon. If you don't remember me, my name is Professor Oak.");
        this.$modalText2.html("I have been studying JavaScript DOM techniques so that I can bring my research to the web. I am excited to share with you my latest creation: <br/><br/><strong id='sub-title'>The PokeAutomata</strong>");
        this.$rulesList.css('display', 'none');
        break;
      case "1":
        this.$modalText1.text("The PokeAutomata simulates thousands of Pokemon type matchups at once. Its mechanisms are simple:");
        this.$modalText2.text("")
        this.$rulesList.css('display', 'block');
        break;
      case "2":
        this.$rulesList.css('display', 'none');
        this.$modalText1.text("Here is the standard type matchup chart. All Pokemon scientists must know this!");
        this.$modalText2.html("<span class='zoom'><img src='assets/type-chart.png' alt='type-chart' width='100%'/ id='typechart'></span><span class='zoom-prompt'>(Drag down and hold on chart to expand)</span>");
        $('.zoom').zoom({
          on: 'grab',
          magnify: 0.6,
          duration: 240
        });
        this.$nextButton.text(">");
        break;
      case "3":
        this.$modalText1.text("I hope you plan to join me in my research. You can start off by selecting one of the initial demo states and pressing play. You can also assign types yourself by clicking on a cell or hovering if you have hover assign enabled.");
        this.$modalText2.html("");
        this.$nextButton.text("exit");
        break;
      case "4":
        this.$modalBackground.css('display', 'none');
        break;
      default:
        break;
    }
  }



  closeModal(){
    let $modalContent = $('.modal-content')[0]
    let noExitTargets = [
      $('.nav-buttons')[0],
      $('#prev-button')[0],
      $('#next-button')[0],
      $('#professor-oak')[0],
      $('#sub-title')[0],
      $('.zoom')[0],
      $('#typechart')[0],
      $('.zoomImg')[0],
      $modalContent];


    if((!noExitTargets.includes(event.target)
      && event.target.parentElement !== $modalContent)
      || event.target === $('.exit')[0]){
      this.$modalBackground.css('display', 'none');
    }
  }



}
