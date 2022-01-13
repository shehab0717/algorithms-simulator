import { Tile } from "./tile.js";
import { MAZE } from "./maze.js";

var nodeType = 'start';
var mouseDown = false;
var boardDiv = document.getElementById('board');
const radios = document.querySelectorAll('input[name=nodeType]');
var clearBtn = document.getElementById('clearBtn');
var showMazeBtn = document.getElementById('showMazeBtn');

showMazeBtn.onclick = function(){
    let board = Board.getInstance();
    board.showMaze();
}

function addRadiosEvent() {
    for (let radio of radios) {
        radio.onchange = function () {
            nodeType = radio.value;
        }
    }
}

function onMouseDown() {
    let board = Board.getInstance();
    if (nodeType == 'block' || nodeType == 'tile') {
        mouseDown = true;
    }
    board.mark(this.id, nodeType);
}

function onMouseUp() {
    mouseDown = false;
}

function onMouseOver() {
    let board = Board.getInstance();
    if (mouseDown) {
        board.mark(this.id, nodeType);
    }
}

class Board {

    board;
    rows;
    cols;
    startId;
    targetId;
    static instance;
    static getInstance() {
        return this.instance = this.instance ?
            this.instance : new Board(30, 80);
    }
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
    mark(id, type) {
        if (type == 'start') {
            if (this.startId) {
                let oldStart = this.tileOf(this.startId);
                oldStart.setType('tile');
            }
            this.startId = id;
        }
        else if (type == 'target') {
            if(this.targetId){
                let oldTarget = this.tileOf(this.targetId);
                oldTarget.setType('tile');
            }   
            this.targetId = id;
        }
        else if (this.startId == id) {
            this.startId = undefined;
        }
        else if (this.targetId == id) {
            this.targetId = undefined;
        }
        let tile = this.tileOf(id);
        tile.setType(type);
    }

    tileOf(idString) {
        let id = parseInt(idString);
        let row = Math.floor(id / this.cols);
        let col = id % this.cols;
        return this.board[row][col];
    }
    generateMap() {
        // this.clear(false);
        this.board = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = new Tile(i * this.cols + j, this.newTile(i * this.cols + j));
                boardDiv.appendChild(this.board[i][j].htmlElement);
            }
        }
    }
    showMaze() {
        for (let r = 0; r < this.rows; r++) {
            if (MAZE[r].length) {
                for (let c = 0; c < this.cols; c++) {
                    this.board[r][c].setType(MAZE[r][c] == '#' ? 'block' : 'tile');
                }
            }
        }
    }
    logMaze() {
        let maze = new Array(30);
        for (let r = 0; r < this.rows; r++) {
            let rowString = '';
            for (let c = 0; c < this.cols; c++) {
                rowString += this.board[r][c].type == 'block' ? '#' : ' ';
            }
            maze[r] = rowString;
        }
        console.log(maze);
    }
    clear(keepBlocks) {
        this.startId = undefined;
        this.targetId = undefined;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (keepBlocks && this.board[i][j].type == 'block') {
                    continue;
                }
                this.board[i][j].setType('tile');
                this.board.visited = false;
            }
        }
        this.logMaze();
    }
    #switchValueVisibility(show) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j].showValue(show);
            }
        }
    }

    showValues() {
        this.#switchValueVisibility(true);
    }
    hideValues() {
        this.#switchValueVisibility(false);
    }
    newTile(id) {
        let tile = document.createElement('div');
        tile.className = 'tile hide-value';
        tile.onmousedown = onMouseDown;
        tile.onmouseup = onMouseUp;
        tile.onmouseover = onMouseOver;
        tile.id = id;
        return tile;
    }

    unMark(id, type) {
        let tile = this.tileOf(id);
        tile.setType('tile');
    }
}
function hotKey(event) {
    if (event.key == 'b') {
        document.getElementById('blockRadio').checked = true;
        nodeType = 'blobck';
    } else if (event.key == 's') {
        document.getElementById('startRadio').checked = true;
        nodeType = 'start';
    } else if (event.key == 't') {
        document.getElementById('targetRadio').checked = true;
        nodeType = 'target';
    } else if (event.key == 'd') {
        document.getElementById('tileRadio').checked = true;
        nodeType = 'tile';
    }
}
function init() {
    let body = document.getElementById('body');
    body.onkeydown = hotKey;
    Board.getInstance().generateMap();
    clearBtn.onclick = () => {
        let keep = document.getElementById('keepBlocks').checked;
        console.log(keep);
        Board.getInstance().clear(keep)
    }
    addRadiosEvent();
}

init();
export { Board };