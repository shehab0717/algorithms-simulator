
var boardDiv = document.getElementById('board');
var board;

for(let i = 0;i<50;i++){
    for(let j = 0;j<25;j++){
        let tile = document.createElement('div');
        tile.className = 'tile';
        boardDiv.appendChild(tile);
    }
}