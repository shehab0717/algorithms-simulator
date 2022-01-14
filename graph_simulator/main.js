import { Board } from "./board.js";
import { PriorityQueue } from "./priority_queue.js";


const DIRECTIONS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
];
var pervNode = [];
var board = Board.getInstance();
var goBtn = document.getElementById('goBtn');
var algorithmSelector = document.getElementById('algorithmSelector');
var algorithm = 'BFS';

algorithmSelector.onchange = function () {
    algorithm = this.value;
    if (algorithm == 'Dijkstra') {
        board.showValues();
    }
    else {
        board.hideValues();
    }
}
goBtn.onclick = async function () {
    console.log(board.startId);
    if (algorithm == 'BFS') {
        await bfs(board.startId, board.targetId);
    } else if (algorithm == 'Dijkstra') {
        console.log('Dijkstra');
        await Dijkstra(board.startId, board.targetId);
    }
    await showPath();
};

function wait(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function rowNumber(idString) {
    let id = parseInt(idString);
    return Math.floor(id / board.cols);
}

function colNumber(idString) {
    let id = parseInt(idString);
    return id % board.cols;
}

function moveId(id, direction) {
    let r = rowNumber(id);
    let c = colNumber(id);
    r += direction[0];
    c += direction[1];
    if (!exist(r, c))
        return undefined;
    let newId = r * board.cols + c;
    return newId;
}

function exist(r, c) {
    return (r >= 0 && r < board.rows && c >= 0 && c < board.cols);
}

async function bfs(startId, targetId) {
    if (startId == undefined) {
        return;
    }
    startId = parseInt(startId);
    targetId = parseInt(targetId);
    let queue = [startId];
    pervNode[startId] = -1;
    let index = 0;
    while (queue.length) {
        let currentId = queue[index++];
        let tile = board.tileOf(currentId);
        tile.visit();
        if (currentId == targetId) {
            return;
        }
        await wait(10);
        for (let direction of DIRECTIONS) {
            let childId = moveId(currentId, direction);
            if (childId == undefined)
                continue;
            childId = parseInt(childId);
            let child = board.tileOf(childId);
            if (child.available()) {
                child.visit(true);
                queue.push(childId);
                pervNode[childId] = currentId;
            }
        }
    }
}

async function showPath() {
    let path = [];
    let current = parseInt(board.targetId);
    while (current >= 0) {
        path.push(current);
        current = pervNode[current];
    }
    for (let i = path.length - 1; i >= 0; i--) {
        let tile = board.tileOf(path[i]);
        tile.setType('path');
        await wait(50);
    }
}
var cost;
function fill() {
    cost = [];
    for (let i = 0; i < 30 * 80; i++) {
        cost.push(20 * 30 * 80);
    }
}
async function Dijkstra(startId, targetId) {
    fill();
    pervNode = [];
    if (startId == undefined)
        return;
    startId = parseInt(startId);
    let q = new PriorityQueue();
    q.push([0, startId]);
    cost[parseInt(startId)] = 0;
    pervNode[startId] = -1;
    while (!q.isEmpty()) {
        let current = q.dequeue();
        let u = current[1];
        if (u == targetId) {
            return;
        }
        for (let direction of DIRECTIONS) {
            let childId = moveId(current[1], direction);
            if (childId == undefined)
                continue;
            let v = parseInt(childId);
            let childTile = board.tileOf(childId);
            if(childTile.type == 'block'){
                continue;
            }
            let w = childTile.value;
            if (cost[v] > cost[u] + w) {
                cost[v] = cost[u] + w;
                q.push([cost[v], v]);
                pervNode[v] = u;
            }
        }
    }

}
