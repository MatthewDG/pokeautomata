/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game_view = __webpack_require__(1);
	
	var _game_view2 = _interopRequireDefault(_game_view);
	
	var _poke_automata_interface = __webpack_require__(5);
	
	var _poke_automata_interface2 = _interopRequireDefault(_poke_automata_interface);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var ctx = document.getElementById('ctx');
	
	  var stage = new createjs.Stage(ctx);
	  stage.mouseEventsEnabled = true;
	  stage.keyboardEventsEnabled = true;
	  var view = new _game_view2.default(stage);
	  var pokeUI = new _poke_automata_interface2.default(view);
	  view.drawBoard();
	
	  createjs.Ticker.framerate = 10;
	  createjs.Ticker.paused = true;
	  createjs.Ticker.addEventListener("tick", function (event) {
	    if (!event.paused) {
	      stage.removeAllChildren();
	      view.pokeBattlefield.battle();
	      view.redrawBoard();
	      stage.update();
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _board = __webpack_require__(2);
	
	var _board2 = _interopRequireDefault(_board);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(stage) {
	    _classCallCheck(this, GameView);
	
	    this.stage = stage;
	    this.DIM_X = 1000;
	    this.DIM_Y = 600;
	    this.LINE_COLOR = "#ddd";
	    this.squareSize = 10;
	    this.numRows = this.DIM_X / this.squareSize;
	    this.numCols = this.DIM_Y / this.squareSize;
	    this.offset = [this.numRows % 2 / 2 * this.squareSize, this.numCols % 2 / 2 * this.squareSize];
	    this.offset = [0, 0];
	    this.pokeBattlefield = new _board2.default({ numRows: this.numRows, numCols: this.numCols });
	    this.typeToAssign = "NORMAL";
	    this.installHandlers();
	    this.drawBoard();
	  }
	
	  _createClass(GameView, [{
	    key: "installHandlers",
	    value: function installHandlers() {
	      this.stage.on('mouseover', this.handleAssign.bind(this));
	      this.stage.on('click', this.handleAssign.bind(this));
	    }
	  }, {
	    key: "handleAssign",
	    value: function handleAssign() {
	      var clickPos = [this.stage.mouseX, this.stage.mouseY];
	
	      var cellX = Math.floor((clickPos[0] - this.numRows % 2 / 2 * this.squareSize) / this.squareSize);
	      var cellY = Math.floor((clickPos[1] - this.numCols % 2 / 2 * this.squareSize) / this.squareSize);
	      this.pokeBattlefield.assignCell(cellX, cellY, this.typeToAssign);
	      var clickedPokeCell = this.pokeBattlefield.grid[cellX][cellY];
	      this.pokeBattlefield.drawCell(clickedPokeCell, this.stage, this.squareSize, cellX, cellY);
	      this.stage.update();
	    }
	  }, {
	    key: "drawBoard",
	    value: function drawBoard() {
	      var board = new createjs.Shape();
	      board.graphics.beginFill("#fff").drawRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.stage.addChild(board);
	      this.drawGridLines(this.offset);
	      this.stage.update();
	    }
	  }, {
	    key: "redrawBoard",
	    value: function redrawBoard() {
	      this.pokeBattlefield.draw(this.stage, this.offset, [this.numRows, this.numCols], this.squareSize);
	      this.drawGridLines(this.offset);
	    }
	  }, {
	    key: "drawGridLines",
	    value: function drawGridLines(offset) {
	      var line = void 0;
	
	      for (var i = 0; i < this.numRows + 1; i++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#000").moveTo(this.squareSize * i + offset[0], 0).lineTo(this.squareSize * i + offset[0], this.DIM_Y);
	        this.stage.addChild(line);
	      }
	
	      for (var j = 0; j < this.numCols + 1; j++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#000").moveTo(0, this.squareSize * j + offset[1]).lineTo(this.DIM_X, this.squareSize * j + offset[1]);
	        this.stage.addChild(line);
	      }
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _poke_cell = __webpack_require__(3);
	
	var _poke_cell2 = _interopRequireDefault(_poke_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Board = function () {
	  function Board() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Board);
	
	    this.cycle = 0;
	    this.numRows = options.numRows || 8;
	    this.numCols = options.numCols || 10;
	    this.DELTAS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
	    this.grid = [];
	    this.generateGrid();
	  }
	
	  _createClass(Board, [{
	    key: "generateGrid",
	    value: function generateGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default());
	        }
	      }
	    }
	  }, {
	    key: "assignCell",
	    value: function assignCell(cellX, cellY, type) {
	      this.grid[cellX][cellY] = new _poke_cell2.default(type);
	    }
	  }, {
	    key: "battle",
	    value: function battle() {
	      this.cycle += 1;
	      for (var rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
	        for (var colIdx = 0; colIdx < this.numCols; colIdx++) {
	          var pokeNeighbors = [];
	          var currentPos = [rowIdx, colIdx];
	
	          for (var deltaIdx = 0; deltaIdx < this.DELTAS.length; deltaIdx++) {
	            var delta = this.DELTAS[deltaIdx];
	            var neighborPos = [currentPos[0] + delta[0], currentPos[1] + delta[1]];
	            if (this.inBounds(neighborPos)) {
	              var neighbor = this.grid[neighborPos[0]][neighborPos[1]];
	              pokeNeighbors.push(neighbor);
	            }
	          }
	          var _pokeCell = this.grid[rowIdx][colIdx];
	          _pokeCell.battleNeighbors(pokeNeighbors);
	        }
	      }
	    }
	  }, {
	    key: "inBounds",
	    value: function inBounds(pos) {
	      if (pos[0] < 0 || pos[0] >= this.numRows) {
	        return false;
	      }
	
	      if (pos[1] < 0 || pos[1] >= this.numCols) {
	        return false;
	      }
	
	      return true;
	    }
	  }, {
	    key: "drawCell",
	    value: function drawCell(pokeCell, stage, squareSize, idx, idx2) {
	      var cell = new createjs.Shape();
	
	      cell.graphics.beginFill(pokeCell.color).beginStroke("#eee").drawRect(idx * squareSize, idx2 * squareSize, squareSize, squareSize);
	      stage.addChild(cell);
	    }
	  }, {
	    key: "draw",
	    value: function draw(stage, offset, numPokes, squareSize) {
	      var _this = this;
	
	      var offsetX = (this.numRows - Math.floor(numPokes[0] - numPokes[0] % 2)) / 2;
	      var offsetY = (this.numCols - Math.floor(numPokes[1] - numPokes[1] % 2)) / 2;
	
	      this.grid.forEach(function (row, idx) {
	        row.forEach(function (pokeCell, idx2) {
	          _this.drawCell(pokeCell, stage, squareSize, idx, idx2);
	        });
	      });
	    }
	  }, {
	    key: "resetBoard",
	    value: function resetBoard() {
	      this.grid = [];
	      this.cycle = [];
	      this.generateGrid();
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//types
	var types = ["NORMAL", "FIGHT", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE", "DRAGON"];
	
	//cell colors
	var pokePalette = {
	  "NORMAL": "#a9a978",
	  "FIGHT": "#c03028",
	  "FLYING": "#a890f0",
	  "POISON": "#a040a0",
	  "GROUND": "#e0c068",
	  "ROCK": "#b8a038",
	  "BUG": "#a8b820",
	  "GHOST": "#6f5796",
	  "FIRE": "#f08030",
	  "WATER": "#6890f0",
	  "GRASS": "#76c74e",
	  "ELECTRIC": "#f8ce2a",
	  "PSYCHIC": "#f85888",
	  "ICE": "#97d7d8",
	  "DRAGON": "#6e36f8",
	  "NONE": "#fff"
	};
	
	//type match-ups
	var immuneFrom = {
	  "NORMAL": ["GHOST"],
	  "FLYING": ["GROUND"],
	  "GROUND": ["ELCTRIC"],
	  "PSYCHIC": ["GHOST"],
	  "GHOST": ["NORMAL", "FIGHT"],
	  "FIGHT": [],
	  "POISON": [],
	  "ROCK": [],
	  "BUG": [],
	  "FIRE": [],
	  "WATER": [],
	  "GRASS": [],
	  "ELECTRIC": [],
	  "ICE": [],
	  "DRAGON": []
	};
	
	var halfDamageTo = {
	  "NORMAL": ["ROCK"],
	  "FIGHT": ["FLYING", "POISON", "BUG", "PSYCHIC"],
	  "FLYING": ["ROCK", "ELECTRIC"],
	  "POISON": ["POISON", "GROUND", "ROCK", "GHOST"],
	  "GROUND": ["BUG", "GRASS"],
	  "ROCK": ["FIGHT", "GROUND"],
	  "BUG": ["FIGHT", "FLYING", "GHOST", "FIRE"],
	  "GHOST": [],
	  "FIRE": ["ROCK", "FIRE", "WATER", "DRAGON"],
	  "WATER": ["WATER", "GRASS", "DRAGON"],
	  "GRASS": ["FLYING", "POISON", "BUG", "FIRE", "GRASS", "DRAGON"],
	  "ELECTRIC": ["GRASS", "ELECTRIC", "DRAGON"],
	  "PSYCHIC": ["PSYCHIC"],
	  "ICE": ["WATER", "ICE"],
	  "DRAGON": []
	};
	
	var doubleDamageTo = {
	  "NORMAL": [],
	  "FIGHT": ["NORMAL", "ROCK", "ICE"],
	  "FLYING": ["FIGHT", "BUG", "GRASS"],
	  "POISON": ["BUG", "GRASS"],
	  "GROUND": ["POISON", "ROCK", "FIRE", "ELECTRIC"],
	  "ROCK": ["FLYING", "BUG", "FIRE", "ICE"],
	  "BUG": ["POISON", "GRASS", "PSYCHIC"],
	  "GHOST": ["GHOST"],
	  "FIRE": ["BUG", "GRASS", "ICE"],
	  "WATER": ["GROUND", "ROCK", "FIRE"],
	  "GRASS": ["GROUND", "ROCK", "WATER"],
	  "ELECTRIC": ["FLYING", "WATER"],
	  "PSYCHIC": ["FIGHT", "POISON"],
	  "ICE": ["FLYING", "GROUND", "GRASS", "DRAGON"],
	  "DRAGON": ["DRAGON"]
	};
	
	var defaultDamageStandings = {
	  "NORMAL": 0,
	  "FIGHT": 0,
	  "FLYING": 0,
	  "POISON": 0,
	  "GROUND": 0,
	  "ROCK": 0,
	  "BUG": 0,
	  "GHOST": 0,
	  "FIRE": 0,
	  "WATER": 0,
	  "GRASS": 0,
	  "ELECTRIC": 0,
	  "PSYCHIC": 0,
	  "ICE": 0,
	  "DRAGON": 0
	};
	
	var pokeCell = function () {
	  function pokeCell() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : types[Math.floor(Math.random() * types.length)];
	
	    _classCallCheck(this, pokeCell);
	
	    this.HP = 20;
	    this.type = type;
	    this.color = pokePalette[this.type];
	
	    this.damageFromType = Object.assign({}, defaultDamageStandings);
	  }
	
	  _createClass(pokeCell, [{
	    key: "battleNeighbors",
	    value: function battleNeighbors(neighbors) {
	      var _this = this;
	
	      debugger;
	      neighbors.forEach(function (attacker) {
	        var damage = _this.calculateDamage(_this, attacker);
	        _this.HP -= damage;
	        _this.damageFromType[attacker.type] += damage;
	
	        if (_this.HP <= 0) {
	
	          _this.HP = 20;
	          _this.type = Object.keys(_this.damageFromType).sort(function (a, b) {
	            return _this.damageFromType[b] - _this.damageFromType[a];
	          })[0];
	
	          _this.color = pokePalette[attacker.type];
	          _this.damageFromType = Object.assign({}, defaultDamageStandings);
	        }
	      });
	    }
	  }, {
	    key: "calculateDamage",
	    value: function calculateDamage(defender, attacker) {
	      if (immuneFrom[defender.type].includes(attacker.type)) {
	        return 0;
	      }
	
	      if (halfDamageTo[attacker.type].includes(defender.type)) {
	        defender.damageFromType[attacker.type] += 0.5;
	        return 0.5;
	      }
	
	      if (doubleDamageTo[attacker.type].includes(defender.type)) {
	        defender.damageFromType[attacker.type] += 0.5;
	        return 2;
	      }
	
	      return 1;
	    }
	  }]);
	
	  return pokeCell;
	}();
	
	exports.default = pokeCell;

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var pokeAutomataInterface = function () {
	  function pokeAutomataInterface(view) {
	    _classCallCheck(this, pokeAutomataInterface);
	
	    this.$playButton = $('#play-button');
	    this.$resetButton = $('#reset-button');
	    this.$toggleHoverAssign = $('#lock-select');
	    this.$typeSelect = $('#type-select');
	    this.view = view;
	    this.installHandlers();
	  }
	
	  _createClass(pokeAutomataInterface, [{
	    key: 'installHandlers',
	    value: function installHandlers() {
	      this.$playButton.on('click', this.playPause.bind(this));
	      this.$resetButton.on('click', this.resetBoard.bind(this));
	      this.$toggleHoverAssign.on('click', this.toggleHoverAssign.bind(this));
	      this.$typeSelect.on('change', this.setTypeToAssign.bind(this));
	    }
	  }, {
	    key: 'playPause',
	    value: function playPause() {
	      if (!createjs.Ticker.paused) {
	        this.$playButton.text("PLAY");
	        createjs.Ticker.paused = true;
	      } else {
	        this.$playButton.text("PAUSE");
	        createjs.Ticker.paused = false;
	      }
	    }
	  }, {
	    key: 'resetBoard',
	    value: function resetBoard() {
	      this.view.pokeBattlefield.resetBoard();
	      this.view.drawBoard();
	    }
	  }, {
	    key: 'toggleHoverAssign',
	    value: function toggleHoverAssign() {
	      if (this.view.stage._mouseOverIntervalID) {
	        this.$toggleHoverAssign.text("Enable Hover Assign");
	        this.view.stage.enableMouseOver(0);
	      } else {
	        this.$toggleHoverAssign.text("Disable Hover Assign");
	        this.view.stage.enableMouseOver(100);
	      }
	    }
	  }, {
	    key: 'setTypeToAssign',
	    value: function setTypeToAssign() {
	      this.view.typeToAssign = event.currentTarget.value;
	    }
	  }]);
	
	  return pokeAutomataInterface;
	}();
	
	exports.default = pokeAutomataInterface;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map