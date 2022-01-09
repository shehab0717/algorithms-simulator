import { Tile } from "./tile.js";

var nodeType;
var mouseDown = false;

var boardDiv = document.getElementById('board');

class Board {

    board;
    rows;
    cols;
    startNodeId;
    targetId;
    constructor(rows, cols){
        this.rows = rows;
        this.cols = cols;
    }
    mark(id, type) {
        if (startNodeId == id && type != 'start') {
            startNodeId = undefined;
        }
        else if (targetId == id && type != 'target') {
            targetId = undefined;
        }
        let tile = tileOf(id);
        tile.setType(type);
    }

    tileOf(idString) {
        let id = parseInt(idString);
        let row = Math.floor(id / this.cols);
        let col = id % this.cols;
        return board[row][col];
    }
    generateMap() {
        clearMap();
        board = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            board[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                board[i][j] = new Tile(i * this.cols + j, newTile(i * this.cols + j));
                boardDiv.appendChild(board[i][j].htmlElement);
            }
        }
    }
    newTile(id) {
        let tile = document.createElement('div');
        tile.className = 'tile';
        tile.onmousedown = onMouseDown;
        tile.onmouseup = onMouseUp;
        tile.onmouseover = onMouseOver;
        // tile.innerHTML = 50;
        tile.id = id;
        return tile;
    }
    clearMap() {
        startNodeId = undefined;
        while (boardDiv.firstChild) {
            boardDiv.removeChild(boardDiv.firstChild);
        }
    }
    unMark(id) {
        let tile = tileOf(id);
        tile.setType('tile');
    }
}

export {Board};