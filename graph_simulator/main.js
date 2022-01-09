import { Tile } from "./tile.js";


const radios = document.querySelectorAll('input[name=nodeType]');
const COLS = 80;
const ROWS = 30;
var boardDiv = document.getElementById('board');
var board;
var nodeType = 'start';
var mouseDown = false;
var clearBtn = document.getElementById('clearBtn');
var startNodeId;
var targetId;

function addRadiosEvent() {
    for (let radio of radios) {
        radio.onchange = function () {
            nodeType = radio.value;
            console.log(nodeType);
        }
    }
}

function onMouseDown() {
    if (nodeType == 'block' || nodeType == 'tile') {
        mouseDown = true;
    }
    else if (nodeType == 'start') {
        if (startNodeId) {
            unMark(startNodeId);
        }
        startNodeId = this.id;
        mark(startNodeId, 'start');
    }
    else if (nodeType == 'target') {
        if (targetId) {
            unMark(targetId);
        }
        targetId = this.id;
        mark(targetId, 'target');
    }
    mark(this.id, nodeType);
}
function tileOf(idString){
    let id = parseInt(idString);
    let row = Math.floor(id/COLS);
    let col = id%COLS;
    return board[row][col];
}
function mark(id, type) {
    if (startNodeId == id && type != 'start') {
        startNodeId = undefined;
    }
    else if (targetId == id && type != 'target') {
        targetId = undefined;
    }
    let tile = tileOf(id);
    tile.setType(type);
}

function unMark(id) {
    let tile = tileOf(id);
    tile.setType(type);
}
function onMouseUp() {
    mouseDown = false;
}

function onMouseOver() {
    if (mouseDown) {
        mark(this.id, nodeType);
    }
}
function newTile(id) {
    let tile = document.createElement('div');
    tile.className = 'tile';
    tile.onmousedown = onMouseDown;
    tile.onmouseup = onMouseUp;
    tile.onmouseover = onMouseOver;
    // tile.innerHTML = 50;
    tile.id = id;
    return tile;
}

function generateMap() {
    clearMap();
    board = new Array(ROWS);
    for (let i = 0; i < ROWS; i++) {
        board[i] = new Array(COLS);
        for (let j = 0; j < COLS; j++) {
            board[i][j] = new Tile(i * COLS + j, newTile(i * COLS + j));
            boardDiv.appendChild(board[i][j].htmlElement);
        }
    }
}

function clearMap() {
    startNodeId = undefined;
    while (boardDiv.firstChild) {
        boardDiv.removeChild(boardDiv.firstChild);
    }
}

function start() {
    startNodeId = undefined;
    generateMap();
    addRadiosEvent();
    clearBtn.onclick = generateMap;
}

start();