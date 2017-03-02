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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var ctx = document.getElementById('ctx');
	  var stage = new createjs.Stage(ctx);
	  stage.mouseEventsEnabled = true;
	  stage.keyboardEventsEnabled = true;
	  createjs.Ticker.framerate = 60;
	  createjs.Ticker.addEventListener(stage);
	  var view = new _game_view2.default(stage);
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
	    this.squareSize = 20;
	    this.numRows = this.DIM_X / this.squareSize;
	    this.numCols = this.DIM_Y / this.squareSize;
	    this.pokeBattlefield = new _board2.default({ numRows: this.numRows, numCols: this.numCols });
	    this.drawBoard();
	  }
	
	  _createClass(GameView, [{
	    key: "drawBoard",
	    value: function drawBoard() {
	      var board = new createjs.Shape();
	      board.graphics.beginFill("#fff").drawRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.stage.addChild(board);
	      this.stage.update();
	
	      var offset = [];
	      offset[0] = this.numRows % 2 / 2 * this.squareSize;
	      offset[1] = this.numCols % 2 / 2 * this.squareSize;
	
	      this.pokeBattlefield.draw(this.stage, offset, [this.numRows, this.numCols], this.squareSize);
	      this.drawGridLines(offset);
	    }
	  }, {
	    key: "drawGridLines",
	    value: function drawGridLines(offset) {
	      var line = void 0;
	
	      for (var i = 0; i < this.numRows + 1; i++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#000").moveTo(this.squareSize * i + offset[0], 0).lineTo(this.squareSize * i + offset[0], this.DIM_Y);
	        this.stage.addChild(line);
	        this.stage.update();
	      }
	
	      for (var j = 0; j < this.numCols + 1; j++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#000").moveTo(0, this.squareSize * j + offset[1]).lineTo(this.DIM_X, this.squareSize * j + offset[1]);
	        this.stage.addChild(line);
	        this.stage.update();
	      }
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
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
	    this.grid = [];
	    this.generateGrid();
	  }
	
	  _createClass(Board, [{
	    key: 'generateGrid',
	    value: function generateGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default());
	        }
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(stage, offset, numPokes, squareSize) {
	      var offsetX = (this.numRows - Math.floor(numPokes[0] - numPokes[0] % 2)) / 2;
	      var offsetY = (this.numCols - Math.floor(numPokes[1] - numPokes[1] % 2)) / 2;
	
	      this.grid.forEach(function (row, idx) {
	        row.forEach(function (pokeCell, idx2) {
	          var cell = new createjs.Shape();
	
	          cell.graphics.beginFill(pokeCell.color).drawRect((idx - offsetX) * squareSize + offset[0], (idx2 - offsetY) * squareSize + offset[1], squareSize, squareSize);
	
	          stage.addChild(cell);
	          stage.update();
	        });
	      });
	    }
	  }, {
	    key: 'resetBoard',
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _poke_automata = __webpack_require__(4);
	
	var _poke_automata2 = _interopRequireDefault(_poke_automata);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var types = ["NORMAL", "FIGHT", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE", "DRAGON"];
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
	
	var immuneFrom = {
	  "NORMAL": ["GHOST"],
	  "FLYING": ["GROUND"],
	  "GROUND": ["ELCTRIC"],
	  "PSYCHIC": ["GHOST"],
	  "GHOST": ["NORMAL", "FIGHT"],
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
	
	var pokeCell = function pokeCell() {
	  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : types[Math.floor(Math.random() * types.length)];
	
	  _classCallCheck(this, pokeCell);
	
	  this.HP = 20;
	  this.type = type;
	  this.color = pokePalette[this.type];
	};
	
	exports.default = pokeCell;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var pokeAutomata = function pokeAutomata() {
	  _classCallCheck(this, pokeAutomata);
	};
	
	exports.default = pokeAutomata;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map