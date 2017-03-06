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

	'use strict';
	
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
	    this.squareSize = 10;
	    this.numRows = this.DIM_X / this.squareSize;
	    this.numCols = this.DIM_Y / this.squareSize;
	    this.offset = [this.numRows % 2 / 2 * this.squareSize, this.numCols % 2 / 2 * this.squareSize];
	    this.offset = [0, 0];
	    this.typeToAssign = "NORMAL";
	    this.showGridLines = true;
	    this.pokeBattlefield = new _board2.default({ numRows: this.numRows, numCols: this.numCols });
	    this.installHandlers();
	    this.drawBoard();
	  }
	
	  _createClass(GameView, [{
	    key: 'installHandlers',
	    value: function installHandlers() {
	      this.stage.on('mouseover', this.handleAssign.bind(this));
	      this.stage.on('click', this.handleAssign.bind(this));
	    }
	  }, {
	    key: 'handleAssign',
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
	    key: 'drawBoard',
	    value: function drawBoard() {
	      var board = new createjs.Shape();
	      board.graphics.beginFill("#000").drawRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.stage.addChild(board);
	      if (this.showGridLines) {
	        this.drawGridLines(this.offset);
	      }
	      this.stage.update();
	    }
	  }, {
	    key: 'redrawBoard',
	    value: function redrawBoard() {
	      this.pokeBattlefield.draw(this.stage, this.offset, [this.numRows, this.numCols], this.squareSize);
	
	      if (this.showGridLines) {
	        this.drawGridLines(this.offset);
	      }
	    }
	  }, {
	    key: 'drawGridLines',
	    value: function drawGridLines(offset) {
	      var line = void 0;
	
	      for (var i = 0; i < this.numRows + 1; i++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#ddd").moveTo(this.squareSize * i + offset[0], 0).lineTo(this.squareSize * i + offset[0], this.DIM_Y);
	        this.stage.addChild(line);
	      }
	
	      for (var j = 0; j < this.numCols + 1; j++) {
	        line = new createjs.Shape();
	        line.graphics.beginStroke("#ddd").moveTo(0, this.squareSize * j + offset[1]).lineTo(this.DIM_X, this.squareSize * j + offset[1]);
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
	
	var _FIRST_GEN_DISTRIBUTI, _SECOND_GEN_DISTRIBUT;
	
	var _poke_cell = __webpack_require__(3);
	
	var _poke_cell2 = _interopRequireDefault(_poke_cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var STARTER_TYPES = ["FIRE", "WATER", "GRASS"];
	
	var FIRST_GEN_DISTRIBUTION = (_FIRST_GEN_DISTRIBUTI = {
	  "NORMAL": 20 / 151,
	  "WATER": 23 / 151,
	  "GRASS": 13 / 151,
	  "PSYCHIC": 9 / 151,
	  "FIRE": 14 / 151,
	  "ELECTRIC": 7 / 151,
	  "FLYING": 8 / 151,
	  "FIGHT": 7 / 151,
	  "BUG": 13 / 151,
	  "POISON": 11 / 151,
	  "GROUND": 8 / 151,
	  "DRAGON": 3 / 151,
	  "ROCK": 11 / 151,
	  "ICE": 5 / 151
	}, _defineProperty(_FIRST_GEN_DISTRIBUTI, "ELECTRIC", 3 / 151), _defineProperty(_FIRST_GEN_DISTRIBUTI, "GHOST", 3 / 151), _FIRST_GEN_DISTRIBUTI);
	
	var SECOND_GEN_DISTRIBUTION = (_SECOND_GEN_DISTRIBUT = {
	  "NORMAL": 15 / 100,
	  "WATER": 15 / 100,
	  "GRASS": 9 / 100,
	  "PSYCHIC": 7 / 100,
	  "FIRE": 8 / 100,
	  "ELECTRIC": 7 / 100,
	  "FLYING": 3 / 100,
	  "FIGHT": 3 / 100,
	  "BUG": 2 / 100,
	  "POISON": 1 / 100,
	  "GROUND": 9 / 100,
	  "ROCK": 3 / 100,
	  "ICE": 5 / 100
	}, _defineProperty(_SECOND_GEN_DISTRIBUT, "ELECTRIC", 4 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "GHOST", 3 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "DARK", 8 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "STEEL", 5 / 100), _SECOND_GEN_DISTRIBUT);
	
	var Board = function () {
	  function Board() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Board);
	
	    this.cycle = 0;
	    this.numRows = options.numRows || 8;
	    this.numCols = options.numCols || 10;
	    this.DELTAS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
	    this.grid = [];
	    this.initialState = "random";
	    this.fillBoardType = "NORMAL";
	    this.generateGrid();
	  }
	
	  _createClass(Board, [{
	    key: "generateGrid",
	    value: function generateGrid() {
	      switch (this.initialState) {
	        case "random":
	          this.generateRandomGrid();
	          break;
	        case "starterpokemon":
	          this.generateStarterPokemonGrid();
	          break;
	        case "firstgen":
	          this.generateFirstGenGrid();
	          break;
	        case "secondgen":
	          this.generateSecondGenGrid();
	          break;
	        case "fillwithtype":
	          this.fillBoardWithType(this.fillBoardType);
	          break;
	        case "empty":
	          this.generateEmptyGrid();
	        default:
	          this.generateEmptyGrid();
	      }
	    }
	  }, {
	    key: "generateEmptyGrid",
	    value: function generateEmptyGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default("NONE"));
	        }
	      }
	    }
	  }, {
	    key: "fillBoardWithType",
	    value: function fillBoardWithType(type) {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default(type));
	        }
	      }
	    }
	  }, {
	    key: "generateRandomGrid",
	    value: function generateRandomGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default());
	        }
	      }
	    }
	  }, {
	    key: "generateStarterPokemonGrid",
	    value: function generateStarterPokemonGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          var sampleStarter = STARTER_TYPES[Math.floor(Math.random() * 3)];
	          this.grid[i].push(new _poke_cell2.default(sampleStarter));
	        }
	      }
	    }
	  }, {
	    key: "generateFirstGenGrid",
	    value: function generateFirstGenGrid() {
	      var _this = this;
	
	      var gridDistribution = Object.assign({}, FIRST_GEN_DISTRIBUTION);
	      var genOneTypes = Object.keys(gridDistribution);
	
	      genOneTypes.forEach(function (type) {
	        return gridDistribution[type] = Math.ceil(gridDistribution[type] * _this.numRows * _this.numCols);
	      });
	
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	
	          var sampleType = genOneTypes[Math.floor(Math.random() * genOneTypes.length)];
	          while (gridDistribution[sampleType] <= 0) {
	            sampleType = Object.keys(gridDistribution)[Math.floor(Math.random() * genOneTypes.length)];
	          }
	
	          gridDistribution[sampleType] -= 1;
	          this.grid[i].push(new _poke_cell2.default(sampleType));
	        }
	      }
	    }
	  }, {
	    key: "generateSecondGenGrid",
	    value: function generateSecondGenGrid() {
	      var _this2 = this;
	
	      var gridDistribution = Object.assign({}, SECOND_GEN_DISTRIBUTION);
	      var genOneTypes = Object.keys(gridDistribution);
	
	      genOneTypes.forEach(function (type) {
	        return gridDistribution[type] = Math.ceil(gridDistribution[type] * _this2.numRows * _this2.numCols);
	      });
	
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	
	          var sampleType = genOneTypes[Math.floor(Math.random() * genOneTypes.length)];
	          while (gridDistribution[sampleType] <= 0) {
	            sampleType = Object.keys(gridDistribution)[Math.floor(Math.random() * genOneTypes.length)];
	          }
	
	          gridDistribution[sampleType] -= 1;
	          this.grid[i].push(new _poke_cell2.default(sampleType));
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
	          var _pokeCell = this.grid[rowIdx][colIdx];
	
	          if (_pokeCell.type === "NONE") {
	            continue;
	          }
	          var currentPos = [rowIdx, colIdx];
	          var pokeNeighbors = [];
	
	          for (var deltaIdx = 0; deltaIdx < this.DELTAS.length; deltaIdx++) {
	            var delta = this.DELTAS[deltaIdx];
	            var neighborPos = [currentPos[0] + delta[0], currentPos[1] + delta[1]];
	            if (this.inBounds(neighborPos)) {
	              var neighbor = this.grid[neighborPos[0]][neighborPos[1]];
	              pokeNeighbors.push(neighbor);
	            }
	          }
	
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
	
	      cell.graphics.beginFill(pokeCell.color).drawRect(idx * squareSize, idx2 * squareSize, squareSize, squareSize);
	      stage.addChild(cell);
	    }
	  }, {
	    key: "draw",
	    value: function draw(stage, offset, numPokes, squareSize) {
	      var _this3 = this;
	
	      var offsetX = (this.numRows - Math.floor(numPokes[0] - numPokes[0] % 2)) / 2;
	      var offsetY = (this.numCols - Math.floor(numPokes[1] - numPokes[1] % 2)) / 2;
	
	      this.grid.forEach(function (row, idx) {
	        row.forEach(function (pokeCell, idx2) {
	          _this3.drawCell(pokeCell, stage, squareSize, idx, idx2);
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
	var types = ["NORMAL", "FIGHT", "FLYING", "POISON", "GROUND", "ROCK", "BUG", "GHOST", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC", "ICE", "DRAGON", "DARK", "STEEL", "FAIRY"];
	
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
	  "STEEL": "#b8b8d0",
	  "DARK": "#705848",
	  "FAIRY": "#ff65d5",
	  "NONE": "#000"
	};
	
	//type match-ups
	var immuneFrom = {
	  "NORMAL": ["GHOST"],
	  "FLYING": ["GROUND"],
	  "GROUND": ["ELECTRIC"],
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
	  "DRAGON": [],
	  "DARK": ["PSYCHIC"],
	  "STEEL": ["POISON"],
	  "FAIRY": ["DRAGON"],
	  "NONE": []
	};
	
	var halfDamageTo = {
	  "NORMAL": ["ROCK", "STEEL"],
	  "FIGHT": ["FLYING", "POISON", "BUG", "PSYCHIC", "FAIRY"],
	  "FLYING": ["ROCK", "ELECTRIC", "STEEL"],
	  "POISON": ["POISON", "GROUND", "ROCK", "GHOST"],
	  "GROUND": ["BUG", "GRASS"],
	  "ROCK": ["FIGHT", "GROUND", "STEEL"],
	  "BUG": ["FIGHT", "FLYING", "GHOST", "FIRE", "STEEL", "FAIRY"],
	  "GHOST": ["DARK"],
	  "FIRE": ["ROCK", "FIRE", "WATER", "DRAGON"],
	  "WATER": ["WATER", "GRASS", "DRAGON"],
	  "GRASS": ["FLYING", "POISON", "BUG", "FIRE", "GRASS", "DRAGON"],
	  "ELECTRIC": ["GRASS", "ELECTRIC", "DRAGON"],
	  "PSYCHIC": ["PSYCHIC", "STEEL"],
	  "ICE": ["WATER", "ICE", "STEEL"],
	  "DRAGON": ["STEEL"],
	  "DARK": ["FIGHT", "DARK", "FAIRY"],
	  "STEEL": ["STEEL", "FIRE", "WATER", "ELECTRIC"],
	  "FAIRY": ["POISON", "STEEL", "FIRE"],
	  "NONE": []
	};
	
	var doubleDamageTo = {
	  "NORMAL": [],
	  "FIGHT": ["NORMAL", "ROCK", "ICE", "STEEL", "DARK"],
	  "FLYING": ["FIGHT", "BUG", "GRASS"],
	  "POISON": ["BUG", "GRASS", "FAIRY"],
	  "GROUND": ["POISON", "ROCK", "FIRE", "ELECTRIC", "STEEL"],
	  "ROCK": ["FLYING", "BUG", "FIRE", "ICE"],
	  "BUG": ["POISON", "GRASS", "PSYCHIC", "DARK"],
	  "GHOST": ["GHOST"],
	  "FIRE": ["BUG", "GRASS", "ICE", "STEEL"],
	  "WATER": ["GROUND", "ROCK", "FIRE"],
	  "GRASS": ["GROUND", "ROCK", "WATER"],
	  "ELECTRIC": ["FLYING", "WATER"],
	  "PSYCHIC": ["FIGHT", "POISON"],
	  "ICE": ["FLYING", "GROUND", "GRASS", "DRAGON"],
	  "DRAGON": ["DRAGON"],
	  "DARK": ["GHOST", "PSYCHIC"],
	  "STEEL": ["ROCK", "ICE", "FAIRY"],
	  "FAIRY": ["FIGHT", "DRAGON", "DARK"],
	  "NONE": []
	};
	
	var pokeCell = function () {
	  function pokeCell() {
	    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : types[Math.floor(Math.random() * types.length)];
	
	    _classCallCheck(this, pokeCell);
	
	    this.HP = 20;
	    this.type = type;
	    this.color = pokePalette[this.type];
	  }
	
	  _createClass(pokeCell, [{
	    key: "battleNeighbors",
	    value: function battleNeighbors(neighbors) {
	      var _this = this;
	
	      neighbors.forEach(function (attacker) {
	        var damage = _this.calculateDamage(_this, attacker);
	        _this.HP -= damage;
	
	        if (_this.HP <= 0) {
	          _this.HP = 20;
	          _this.type = attacker.type;
	          _this.color = pokePalette[attacker.type];
	        }
	      });
	    }
	  }, {
	    key: "calculateDamage",
	    value: function calculateDamage(defender, attacker) {
	      if (immuneFrom[defender.type].includes(attacker.type) || attacker.type === "NONE") {
	        return 0;
	      }
	
	      if (halfDamageTo[attacker.type].includes(defender.type)) {
	        return 0.5;
	      }
	
	      if (doubleDamageTo[attacker.type].includes(defender.type)) {
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _jqueryZoom = __webpack_require__(6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var pokeAutomataInterface = function () {
	  function pokeAutomataInterface(view) {
	    _classCallCheck(this, pokeAutomataInterface);
	
	    this.$playButton = $('#play-button');
	    this.$resetButton = $('#reset-button');
	    this.$toggleHoverAssign = $('#lock-select');
	    this.$typeSelect = $('#type-select');
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
	    this.view = view;
	    this.installHandlers();
	    this.openModal();
	  }
	
	  _createClass(pokeAutomataInterface, [{
	    key: 'installHandlers',
	    value: function installHandlers() {
	      this.$playButton.on('click', this.playPause.bind(this));
	      this.$resetButton.on('click', this.resetBoard.bind(this));
	      this.$toggleHoverAssign.on('click', this.toggleHoverAssign.bind(this));
	      this.$typeSelect.on('change', this.setTypeToAssign.bind(this));
	      this.$stepForward.on('click', this.stepForward.bind(this));
	      this.$toggleGrid.on('click', this.toggleGridLines.bind(this));
	      this.$initialStateSelect.on('change', this.setInitialState.bind(this));
	      this.$modalBackground.on('click', this.closeModal.bind(this));
	      this.$prevButton.on('click', this.modalPrevious.bind(this));
	      this.$nextButton.on('click', this.modalNext.bind(this));
	      this.$toggleColorGuide.on('click', this.toggleColorGuide.bind(this));
	      this.$openInstructions.on('click', this.openModal.bind(this));
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
	      this.view.pokeBattlefield.fillBoardType = event.currentTarget.value;
	
	      if (createjs.Ticker.paused) {
	        this.view.pokeBattlefield.resetBoard();
	      }
	    }
	  }, {
	    key: 'stepForward',
	    value: function stepForward() {
	      this.view.stage.removeAllChildren();
	      this.view.pokeBattlefield.battle();
	      this.view.redrawBoard();
	      this.view.stage.update();
	    }
	  }, {
	    key: 'toggleGridLines',
	    value: function toggleGridLines() {
	      this.view.showGridLines = !this.view.showGridLines;
	    }
	  }, {
	    key: 'setInitialState',
	    value: function setInitialState() {
	      this.view.pokeBattlefield.initialState = event.currentTarget.value;
	      this.view.pokeBattlefield.resetBoard();
	    }
	  }, {
	    key: 'toggleColorGuide',
	    value: function toggleColorGuide() {
	      if ($('.color-guide').css('display') === "none") {
	        $('.color-guide').css('display', 'block');
	      } else {
	        $('.color-guide').css('display', 'none');
	      }
	    }
	  }, {
	    key: 'openModal',
	    value: function openModal() {
	      this.$modalBackground.css('display', 'block');
	    }
	  }, {
	    key: 'modalPrevious',
	    value: function modalPrevious() {
	      this.$modalBackground[0].id = parseInt(this.$modalBackground[0].id) - 1;
	      this.processModalContent();
	    }
	  }, {
	    key: 'modalNext',
	    value: function modalNext() {
	      this.$modalBackground[0].id = parseInt(this.$modalBackground[0].id) + 1;
	      this.processModalContent();
	    }
	  }, {
	    key: 'processModalContent',
	    value: function processModalContent() {
	      var modalId = this.$modalBackground[0].id;
	
	      if (modalId !== "0") {
	        this.$prevButton.attr("enabled", "enabled");
	        this.$prevButton.prop("disabled", false);
	      } else {
	        this.$prevButton.attr("enabled", "disabled");
	        this.$prevButton.attr("disabled", true);
	      }
	
	      switch (modalId) {
	        case "0":
	          this.$modalText1.text("Hello there! Welcome back to the world of Pokemon. If you don't remember me, my name is Professor Oak.");
	          this.$modalText2.html("I have been studying JavaScript DOM techniques so that I can bring my research to the web. I am excited to share with you my latest creation: <br/><br/><strong id='sub-title'>The PokeAutomata</strong>");
	          this.$rulesList.css('display', 'none');
	          break;
	        case "1":
	          this.$modalText1.text("The PokeAutomata simulates thousands of Pokemon type matchups at once. Its mechanisms are simple:");
	          this.$modalText2.text("");
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
	  }, {
	    key: 'closeModal',
	    value: function closeModal() {
	      var $modalContent = $('.modal-content')[0];
	      var noExitTargets = [$('.nav-buttons')[0], $('#prev-button')[0], $('#next-button')[0], $('#professor-oak')[0], $('#sub-title')[0], $('.zoom')[0], $('#typechart')[0], $('.zoomImg')[0], $modalContent];
	
	      if (!noExitTargets.includes(event.target) && event.target.parentElement !== $modalContent || event.target === $('.exit')[0]) {
	        this.$modalBackground.css('display', 'none');
	      }
	    }
	  }]);
	
	  return pokeAutomataInterface;
	}();
	
	exports.default = pokeAutomataInterface;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*!
		Zoom 1.7.18
		license: MIT
		http://www.jacklmoore.com/zoom
	*/
	(function ($) {
		var defaults = {
			url: false,
			callback: false,
			target: false,
			duration: 120,
			on: 'mouseover', // other options: grab, click, toggle
			touch: true, // enables a touch fallback
			onZoomIn: false,
			onZoomOut: false,
			magnify: 1
		};
	
		// Core Zoom Logic, independent of event listeners.
		$.zoom = function(target, source, img, magnify) {
			var targetHeight,
				targetWidth,
				sourceHeight,
				sourceWidth,
				xRatio,
				yRatio,
				offset,
				$target = $(target),
				position = $target.css('position'),
				$source = $(source);
	
			// The parent element needs positioning so that the zoomed element can be correctly positioned within.
			target.style.position = /(absolute|fixed)/.test(position) ? position : 'relative';
			target.style.overflow = 'hidden';
			img.style.width = img.style.height = '';
	
			$(img)
				.addClass('zoomImg')
				.css({
					position: 'absolute',
					top: 0,
					left: 0,
					opacity: 0,
					width: img.width * magnify,
					height: img.height * magnify,
					border: 'none',
					maxWidth: 'none',
					maxHeight: 'none'
				})
				.appendTo(target);
	
			return {
				init: function() {
					targetWidth = $target.outerWidth();
					targetHeight = $target.outerHeight();
	
					if (source === target) {
						sourceWidth = targetWidth;
						sourceHeight = targetHeight;
					} else {
						sourceWidth = $source.outerWidth();
						sourceHeight = $source.outerHeight();
					}
	
					xRatio = (img.width - targetWidth) / sourceWidth;
					yRatio = (img.height - targetHeight) / sourceHeight;
	
					offset = $source.offset();
				},
				move: function (e) {
					var left = (e.pageX - offset.left),
						top = (e.pageY - offset.top);
	
					top = Math.max(Math.min(top, sourceHeight), 0);
					left = Math.max(Math.min(left, sourceWidth), 0);
	
					img.style.left = (left * -xRatio) + 'px';
					img.style.top = (top * -yRatio) + 'px';
				}
			};
		};
	
		$.fn.zoom = function (options) {
			return this.each(function () {
				var
				settings = $.extend({}, defaults, options || {}),
				//target will display the zoomed image
				target = settings.target && $(settings.target)[0] || this,
				//source will provide zoom location info (thumbnail)
				source = this,
				$source = $(source),
				img = document.createElement('img'),
				$img = $(img),
				mousemove = 'mousemove.zoom',
				clicked = false,
				touched = false;
	
				// If a url wasn't specified, look for an image element.
				if (!settings.url) {
					var srcElement = source.querySelector('img');
					if (srcElement) {
						settings.url = srcElement.getAttribute('data-src') || srcElement.currentSrc || srcElement.src;
					}
					if (!settings.url) {
						return;
					}
				}
	
				$source.one('zoom.destroy', function(position, overflow){
					$source.off(".zoom");
					target.style.position = position;
					target.style.overflow = overflow;
					img.onload = null;
					$img.remove();
				}.bind(this, target.style.position, target.style.overflow));
	
				img.onload = function () {
					var zoom = $.zoom(target, source, img, settings.magnify);
	
					function start(e) {
						zoom.init();
						zoom.move(e);
	
						// Skip the fade-in for IE8 and lower since it chokes on fading-in
						// and changing position based on mousemovement at the same time.
						$img.stop()
						.fadeTo($.support.opacity ? settings.duration : 0, 1, $.isFunction(settings.onZoomIn) ? settings.onZoomIn.call(img) : false);
					}
	
					function stop() {
						$img.stop()
						.fadeTo(settings.duration, 0, $.isFunction(settings.onZoomOut) ? settings.onZoomOut.call(img) : false);
					}
	
					// Mouse events
					if (settings.on === 'grab') {
						$source
							.on('mousedown.zoom',
								function (e) {
									if (e.which === 1) {
										$(document).one('mouseup.zoom',
											function () {
												stop();
	
												$(document).off(mousemove, zoom.move);
											}
										);
	
										start(e);
	
										$(document).on(mousemove, zoom.move);
	
										e.preventDefault();
									}
								}
							);
					} else if (settings.on === 'click') {
						$source.on('click.zoom',
							function (e) {
								if (clicked) {
									// bubble the event up to the document to trigger the unbind.
									return;
								} else {
									clicked = true;
									start(e);
									$(document).on(mousemove, zoom.move);
									$(document).one('click.zoom',
										function () {
											stop();
											clicked = false;
											$(document).off(mousemove, zoom.move);
										}
									);
									return false;
								}
							}
						);
					} else if (settings.on === 'toggle') {
						$source.on('click.zoom',
							function (e) {
								if (clicked) {
									stop();
								} else {
									start(e);
								}
								clicked = !clicked;
							}
						);
					} else if (settings.on === 'mouseover') {
						zoom.init(); // Preemptively call init because IE7 will fire the mousemove handler before the hover handler.
	
						$source
							.on('mouseenter.zoom', start)
							.on('mouseleave.zoom', stop)
							.on(mousemove, zoom.move);
					}
	
					// Touch fallback
					if (settings.touch) {
						$source
							.on('touchstart.zoom', function (e) {
								e.preventDefault();
								if (touched) {
									touched = false;
									stop();
								} else {
									touched = true;
									start( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
								}
							})
							.on('touchmove.zoom', function (e) {
								e.preventDefault();
								zoom.move( e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] );
							})
							.on('touchend.zoom', function (e) {
								e.preventDefault();
								if (touched) {
									touched = false;
									stop();
								}
							});
					}
					
					if ($.isFunction(settings.callback)) {
						settings.callback.call(img);
					}
				};
	
				img.src = settings.url;
			});
		};
	
		$.fn.zoom.defaults = defaults;
	}(window.jQuery));


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map