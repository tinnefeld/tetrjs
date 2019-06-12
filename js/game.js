const { Grid, directions } = require('./game-grid');
const { getRandomBlock } = require('./game-blocks');

class Game {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = 200;
    this.canvas.height = 400;
    this.canvas.style.border = '2px solid #BCBCBE';
    this.ctx = this.canvas.getContext('2d');
    this.grid = {};
    this.downInterval = 0;
  }

  getCanvas() {
    return this.canvas;
  }

  redrawGrid() {
    for (let y = 0; y < this.grid.getHeight(); y += 1) {
      for (let x = 0; x < this.grid.getWidth(); x += 1) {
        // eslint-disable-next-line default-case
        switch (this.grid.getGrid()[y][x]) {
          case 'X': this.ctx.fillStyle = '#FFFFFF'; break;
          case 'O': this.ctx.fillStyle = '#FFD662'; break;
          case 'T': this.ctx.fillStyle = '#6B5B95'; break;
          case 'I': this.ctx.fillStyle = '#006E6D'; break;
          case 'S': this.ctx.fillStyle = '#92B558'; break;
          case 'Z': this.ctx.fillStyle = '#9E1030'; break;
          case 'L': this.ctx.fillStyle = '#2A4B7C'; break;
          case 'J': this.ctx.fillStyle = '#F96714'; break;
        }
        this.ctx.fillRect(x * 20, y * 20, 20, 20);
      }
    }
  }

  startNewGame() {
    if (this.downInterval !== 0) {
      clearInterval(this.downInterval);
    }
    this.grid = new Grid(10, 20);
    this.insertBlock();
    this.downInterval = setInterval(this.down.bind(this), 1000);
  }

  insertBlock() {
    const newBlock = getRandomBlock();
    if (this.grid.insertNewFloatBlock(newBlock)) {
      this.redrawGrid();
    } else {
      // game over
      clearInterval(this.downInterval);
    }
  }

  left() {
    this.grid.moveFloatBlock(directions.LEFT);
    this.redrawGrid();
  }

  right() {
    this.grid.moveFloatBlock(directions.RIGHT);
    this.redrawGrid();
  }

  down() {
    if (!this.grid.moveFloatBlock(directions.DOWN)) {
      this.grid.clearFullRows();
      this.insertBlock();
    } else {
      this.redrawGrid();
    }
  }

  rotateLeft() {
    this.grid.rotateFloatBlock(directions.LEFT);
    this.redrawGrid();
  }

  rotateRight() {
    this.grid.rotateFloatBlock(directions.RIGHT);
    this.redrawGrid();
  }
}


const g = new Game();
const readyDOM = setInterval(() => {
  if (document.readyState === 'complete') {
    clearInterval(readyDOM);
    document.body.insertBefore(g.getCanvas(), document.body.childNodes[0]);
  }
}, 10);

function keyDown(event) {
  const e = event || window.event;
  // eslint-disable-next-line default-case
  switch (e.keyCode) {
    case 32: g.down(); break; // space
    case 38: g.rotateLeft(); break; // up
    case 40: g.rotateRight(); break; // down
    case 37: g.left(); break; // left
    case 39: g.right(); break; // right
    case 83: g.startNewGame(); break; // s
  }
}
document.onkeydown = keyDown;
