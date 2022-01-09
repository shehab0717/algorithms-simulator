import { Tile } from "./tile.js";


const radios = document.querySelectorAll('input[name=nodeType]');
const COLS = 80;
const ROWS = 30;
const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];
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
function tileOf(idString) {
    let id = parseInt(idString);
    let row = Math.floor(id / COLS);
    let col = id % COLS;
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
    tile.setType('tile');
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



function rowNumber(idString) {
    let id = parseInt(idString);
    return Math.floor(id / COLS);
}

function colNumber(idString) {
    let id = parseInt(idString);
    return id % COLS;
}

function moveId(id, direction) {
    let r = rowNumber(id);
    let c = colNumber(id);
    r += direction[0];
    c += direction[1];
    if(!exist(r,c))
        return undefined;
    let newId = r * COLS + c;
    return newId;
}

function exist(r, c) {
    return (r >= 0 && r < ROWS && c >= 0 && c < COLS);
}
var pervNode = {};
function bfs() {
    let queue = [startNodeId];
    pervNode[startNodeId] = -1;
    let index = 0;
    while (queue.length) {
        let currentId = queue[index++];
        let tile = tileOf(currentId);
        tile.visit();
        if (currentId == targetId) {
            tile.setType('target');
            return;
        }
        for (let direction of DIRECTIONS) {
            let childId = moveId(currentId, direction);
            if(childId == undefined)
                continue;
            let child = tileOf(childId);
            if (child.available()){
                child.visit(true);
                queue.push(childId);
                pervNode[childId] = currentId;
            }
        }
    }
}

function showPath(){
    let path = [];
    let current = targetId;
    while(current>0){
        path.push(current);
        current = pervNode[current];
    }
    for(let i = path.length-1; i>=0;i--){
        let tile = tileOf(path[i]);
        tile.setType('path');
    }
}

var goBtn = document.getElementById('goBtn');
goBtn.onclick = function (){
    bfs();
    showPath();
};
