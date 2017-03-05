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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _FIRST_GEN_DISTRIBUTI, _SECOND_GEN_DISTRIBUT;
	
	var _poke_cell = __webpack_require__(3);
	
	var _poke_cell2 = _interopRequireDefault(_poke_cell);
	
	var _underscore = __webpack_require__(7);
	
	var _underscore2 = _interopRequireDefault(_underscore);
	
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
	}, _defineProperty(_FIRST_GEN_DISTRIBUTI, 'ELECTRIC', 3 / 151), _defineProperty(_FIRST_GEN_DISTRIBUTI, "GHOST", 3 / 151), _FIRST_GEN_DISTRIBUTI);
	
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
	}, _defineProperty(_SECOND_GEN_DISTRIBUT, 'ELECTRIC', 4 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "GHOST", 3 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "DARK", 8 / 100), _defineProperty(_SECOND_GEN_DISTRIBUT, "STEEL", 5 / 100), _SECOND_GEN_DISTRIBUT);
	
	var Board = function () {
	  function Board() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Board);
	
	    this.cycle = 0;
	    this.numRows = options.numRows || 8;
	    this.numCols = options.numCols || 10;
	    this.DELTAS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
	    this.grid = [];
	    this.initialState = "none";
	    this.fillBoardType = "NORMAL";
	    this.generateGrid();
	  }
	
	  _createClass(Board, [{
	    key: 'generateGrid',
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
	        default:
	          this.generateEmptyGrid();
	      }
	    }
	  }, {
	    key: 'generateEmptyGrid',
	    value: function generateEmptyGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default("NONE"));
	        }
	      }
	    }
	  }, {
	    key: 'fillBoardWithType',
	    value: function fillBoardWithType(type) {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default(type));
	        }
	      }
	    }
	  }, {
	    key: 'generateRandomGrid',
	    value: function generateRandomGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push(new _poke_cell2.default());
	        }
	      }
	    }
	  }, {
	    key: 'generateStarterPokemonGrid',
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
	    key: 'generateFirstGenGrid',
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
	    key: 'generateSecondGenGrid',
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
	    key: 'assignCell',
	    value: function assignCell(cellX, cellY, type) {
	      this.grid[cellX][cellY] = new _poke_cell2.default(type);
	    }
	  }, {
	    key: 'battle',
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
	    key: 'inBounds',
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
	    key: 'drawCell',
	    value: function drawCell(pokeCell, stage, squareSize, idx, idx2) {
	      var cell = new createjs.Shape();
	
	      cell.graphics.beginFill(pokeCell.color).drawRect(idx * squareSize, idx2 * squareSize, squareSize, squareSize);
	      stage.addChild(cell);
	    }
	  }, {
	    key: 'draw',
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
	    console.log("hi");
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
	
	var _jqueryZoom = __webpack_require__(8);
	
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
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.
	
	(function() {
	
	  // Baseline setup
	  // --------------
	
	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;
	
	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;
	
	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
	
	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;
	
	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;
	
	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};
	
	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };
	
	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }
	
	  // Current version.
	  _.VERSION = '1.8.3';
	
	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };
	
	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };
	
	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };
	
	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };
	
	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };
	
	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };
	
	  // Collection Functions
	  // --------------------
	
	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };
	
	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };
	
	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }
	
	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }
	
	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);
	
	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);
	
	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };
	
	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };
	
	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };
	
	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };
	
	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };
	
	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };
	
	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };
	
	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };
	
	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };
	
	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };
	
	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };
	
	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };
	
	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };
	
	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };
	
	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };
	
	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });
	
	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });
	
	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });
	
	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };
	
	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };
	
	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };
	
	  // Array Functions
	  // ---------------
	
	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };
	
	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };
	
	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };
	
	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };
	
	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };
	
	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };
	
	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };
	
	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };
	
	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };
	
	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };
	
	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };
	
	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };
	
	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };
	
	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);
	
	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };
	
	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };
	
	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }
	
	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);
	
	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };
	
	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }
	
	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
	
	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;
	
	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);
	
	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }
	
	    return range;
	  };
	
	  // Function (ahem) Functions
	  // ------------------
	
	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };
	
	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };
	
	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };
	
	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };
	
	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };
	
	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };
	
	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);
	
	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };
	
	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;
	
	    var later = function() {
	      var last = _.now() - timestamp;
	
	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };
	
	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }
	
	      return result;
	    };
	  };
	
	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };
	
	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };
	
	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };
	
	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };
	
	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };
	
	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);
	
	  // Object Functions
	  // ----------------
	
	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
	
	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
	
	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
	
	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }
	
	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };
	
	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };
	
	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };
	
	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };
	
	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };
	
	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };
	
	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);
	
	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);
	
	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };
	
	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };
	
	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };
	
	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);
	
	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };
	
	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };
	
	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };
	
	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };
	
	
	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }
	
	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;
	
	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
	
	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }
	
	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);
	
	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };
	
	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };
	
	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };
	
	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };
	
	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };
	
	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };
	
	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });
	
	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }
	
	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }
	
	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };
	
	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };
	
	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };
	
	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };
	
	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };
	
	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };
	
	  // Utility Functions
	  // -----------------
	
	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };
	
	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };
	
	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };
	
	  _.noop = function(){};
	
	  _.property = property;
	
	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };
	
	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };
	
	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };
	
	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };
	
	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };
	
	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);
	
	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);
	
	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };
	
	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };
	
	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };
	
	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;
	
	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };
	
	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
	
	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };
	
	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);
	
	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');
	
	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;
	
	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }
	
	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";
	
	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
	
	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';
	
	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }
	
	    var template = function(data) {
	      return render.call(this, data, _);
	    };
	
	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';
	
	    return template;
	  };
	
	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };
	
	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.
	
	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };
	
	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };
	
	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);
	
	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });
	
	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });
	
	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };
	
	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
	
	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };
	
	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 8 */
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