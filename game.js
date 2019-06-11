const { Grid, directions } = require('./game-grid');
const { BlockO, BlockT, BlockI, BlockS, BlockZ, BlockL, BlockJ } = require('./game-blocks');

const myGrid = new Grid(10,20);

function redrawGrid() {
    var canvas = document.getElementById("tetrjsCanvas");
    var ctx = canvas.getContext("2d");

    for (var y = 0; y < myGrid.getHeight(); y += 1) {
        for (var x = 0; x < myGrid.getWidth(); x += 1) {
           if (myGrid.getGrid()[y][x] == 'X') {
            ctx.fillStyle = "#FF0000"; }
           else if (myGrid.getGrid()[y][x] == 'O') {
            ctx.fillStyle = "#008000";
           }
           else if (myGrid.getGrid()[y][x] == 'T') {
            ctx.fillStyle = "#0000FF";
           }
           ctx.fillRect(x*20,y*20,20,20);
        }            
        }
}

function insertBlock(){
    const testBlockT = new BlockT;
    myGrid.insertNewFloatBlock(testBlockT);
    redrawGrid();
}

function left(){
    myGrid.moveFloatBlock(directions.LEFT);
    redrawGrid();
}

function right(){
    myGrid.moveFloatBlock(directions.RIGHT);
    redrawGrid();
}

function down(){
    myGrid.moveFloatBlock(directions.DOWN);
    redrawGrid();
}

function rotateLeft(){
    myGrid.rotateFloatBlock(directions.LEFT);
    redrawGrid();
}

function rotateRight(){
    myGrid.rotateFloatBlock(directions.RIGHT);
    redrawGrid();
}

module.exports = { insertBlock, left, right, down, rotateLeft, rotateRight }