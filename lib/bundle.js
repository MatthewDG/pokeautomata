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
	    this.pokeBattlefield = new _board2.default();
	    this.addBoard();
	  }
	
	  _createClass(GameView, [{
	    key: "addBoard",
	    value: function addBoard() {
	      var board = new createjs.Shape();
	      board.graphics.beginFill("#fff").drawRect(0, 0, this.DIM_X, this.DIM_Y);
	      this.stage.addChild(board);
	      this.stage.update();
	
	      var offset = [];
	      offset[0] = this.numRows % 2 / 2 * this.squareSize;
	      offset[1] = this.numCols % 2 / 2 * this.squareSize;
	
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
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	    key: "generateGrid",
	    value: function generateGrid() {
	      for (var i = 0; i < this.numRows; i++) {
	        this.grid.push([]);
	        for (var j = 0; j < this.numCols; j++) {
	          this.grid[i].push("p");
	        }
	      }
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map