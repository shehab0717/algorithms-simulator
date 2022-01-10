import { Tile } from "./tile.js";

var nodeType = 'start';
var mouseDown = false;
var boardDiv = document.getElementById('board');
const radios = document.querySelectorAll('input[name=nodeType]');
var clearBtn = document.getElementById('clearBtn');

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
    else if (nodeType == 'start') {
        if (board.startId) {
            board.unMark(board.startId, 'start');
        }
        board.startId = this.id;
        board.mark(board.startId, 'start');
    }
    else if (nodeType == 'target') {
        if (board.targetId) {
            board.unMark(board.targetId, 'target');
        }
        board.targetId = this.id;
        board.mark(board.targetId, 'target');
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
    instance;

    static getInstance() {
        return this.instance = this.instance ? 
                this.instance : new Board(30, 80);
    }
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
    }
    mark(id, type) {
        if (this.startId == id && type != 'start') {
            let tile = this.tileOf(this.startId);
            tile.setType('tile');
            this.startId = undefined;
        }
        else if (this.targetId == id && type != 'target') {
            let tile = this.tileOf(this.targetId);
            tile.setType('tile');
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
        this.clearMap();
        this.board = new Array(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols);
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = new Tile(i * this.cols + j, this.newTile(i * this.cols + j));
                boardDiv.appendChild(this.board[i][j].htmlElement);
            }
        }
    }

    #switchValueVisibility(show){
        for(let i = 0;i<this.rows;i++){
            for(let j = 0;j<this.cols; j++){
                this.board[i][j].showValue(show);
                
            }
        }
    }

    showValues(){
        this.#switchValueVisibility(true);
    }
    hideValues(){
        this.#switchValueVisibility(false);
    }
    newTile(id) {
        let tile = document.createElement('div');
        tile.className = 'tile hide-value';
        tile.onmousedown = onMouseDown;
        tile.onmouseup = onMouseUp;
        tile.onmouseover = onMouseOver;
        // tile.innerHTML = 50;
        tile.id = id;
        return tile;
    }
    clearMap() {
        this.startId = undefined;
        this.targetId = undefined;
        while (boardDiv.firstChild) {
            boardDiv.removeChild(boardDiv.firstChild);
        }
    }
    unMark(id, type) {
        let tile = this.tileOf(id);
        tile.setType('tile');
    }
}

function init(){
    Board.getInstance().generateMap();
    clearBtn.onclick = ()=>{
        Board.getInstance().generateMap();
    }
    addRadiosEvent();
}

init();
export { Board };