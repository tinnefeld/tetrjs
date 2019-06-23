const { Grid, directions } = require('./game-grid');
const { getRandomBlock } = require('./game-blocks');

class Game {
  constructor() {
    this.canvasGrid = document.createElement('canvas');
    this.canvasGrid.setAttribute('class', 'canvasgrid');
    this.canvasGridCtx = this.canvasGrid.getContext('2d');
    this.initCanvasGrid();

    this.canvasPanel = document.createElement('canvas');
    this.canvasPanel.setAttribute('class', 'canvaspanel');
    this.canvasPanelCtx = this.canvasPanel.getContext('2d');
    this.initCanvasPanel();

    this.grid = {};
    this.previewBlock = getRandomBlock();
    this.downInterval = 0;
    this.gameOver = false;
    this.score = 0;
  }

  initCanvasGrid() {
    this.canvasGrid.width = 200;
    this.canvasGrid.height = 400;
  }

  initCanvasPanel() {
    this.canvasPanel.width = 100;
    this.canvasPanel.height = 400;
    this.canvasPanelCtx.fillStyle = '#BCBCBE';
    this.canvasPanelCtx.fillRect(0, 133, 100, 2);
    this.canvasPanelCtx.fillRect(0, 266, 100, 2);
    this.canvasPanelCtx.fillStyle = '#000000';
    this.canvasPanelCtx.font = '14px Arial';
    // Preview
    this.canvasPanelCtx.fillText('Preview', 25, 20);
    // Score
    this.canvasPanelCtx.fillText('Score', 30, 153);
    // Keys
    this.canvasPanelCtx.fillText('Keys', 30, 286);
    this.canvasPanelCtx.fillText(`${String.fromCharCode(8678)} `
    + `${String.fromCharCode(8680)} `
    + 'left / right', 2, 320);
    this.canvasPanelCtx.fillText(`${String.fromCharCode(8679)} `
    + `${String.fromCharCode(8681)} `
    + 'rotate', 13, 340);
    this.canvasPanelCtx.fillText('"space" down', 7, 360);
    this.canvasPanelCtx.fillText('"s" new game', 7, 380);
  }

  getCanvasGrid() {
    return this.canvasGrid;
  }

  getCanvasPanel() {
    return this.canvasPanel;
  }

  drawGameOver() {
    const blocks = ['O', 'T', 'I', 'S', 'Z', 'L', 'J'];
    let c = 0;
    for (let y = 0; y < this.grid.getHeight(); y += 1) {
      for (let x = 0; x < this.grid.getWidth(); x += 1) {
        this.grid.getGrid()[y][x] = blocks[c % 7];
        c += 1;
      }
    }
    this.redrawCanvasGrid();
  }

  redrawPreview() {
    this.canvasPanelCtx.fillStyle = '#FFFFFF';
    this.canvasPanelCtx.fillRect(25, 40, 80, 80);
    this.redrawCanvas(this.canvasPanelCtx, this.previewBlock.getShape(),
      this.previewBlock.getHeight(), this.previewBlock.getWidth(), 25, 40);
  }

  redrawScore() {
    this.canvasPanelCtx.fillStyle = '#FFFFFF';
    this.canvasPanelCtx.fillRect(5, 170, 90, 70);
    this.canvasPanelCtx.fillStyle = '#000000';
    this.canvasPanelCtx.font = '30px Arial';
    this.canvasPanelCtx.fillText(this.score, (this.score > 99) ? 20 : 30, 210);
  }

  redrawCanvasGrid() {
    this.redrawCanvas(this.canvasGridCtx, this.grid.getGrid(),
      this.grid.getHeight(), this.grid.getWidth(), 0, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  redrawCanvas(ctx, grid, height, width, offsetX, offsetY) {
    if (this.gameOver) {
      return;
    }
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        // eslint-disable-next-line default-case
        switch (grid[y][x]) {
          case 'X': ctx.fillStyle = '#FFFFFF'; break;
          case 'O': ctx.fillStyle = '#FFD662'; break;
          case 'T': ctx.fillStyle = '#6B5B95'; break;
          case 'I': ctx.fillStyle = '#006E6D'; break;
          case 'S': ctx.fillStyle = '#92B558'; break;
          case 'Z': ctx.fillStyle = '#9E1030'; break;
          case 'L': ctx.fillStyle = '#2A4B7C'; break;
          case 'J': ctx.fillStyle = '#F96714'; break;
        }
        ctx.fillRect(offsetX + x * 20, offsetY + y * 20, 20, 20);
      }
    }
  }

  startNewGame() {
    this.gameOver = false;
    this.score = 0;
    if (this.downInterval !== 0) {
      clearInterval(this.downInterval);
    }
    this.grid = new Grid(10, 20);
    this.insertBlock();
    this.downInterval = setInterval(this.down.bind(this), 1000);
  }

  insertBlock() {
    if (this.gameOver) {
      return;
    }
    const newBlock = this.previewBlock;
    this.previewBlock = getRandomBlock();
    if (this.grid.insertNewFloatBlock(newBlock)) {
      this.redrawCanvasGrid();
      this.redrawPreview();
      this.redrawScore();
    } else {
      // game over
      clearInterval(this.downInterval);
      this.drawGameOver();
      this.gameOver = true;
    }
  }

  left() {
    this.grid.moveFloatBlock(directions.LEFT);
    this.redrawCanvasGrid();
  }

  right() {
    this.grid.moveFloatBlock(directions.RIGHT);
    this.redrawCanvasGrid();
  }

  down() {
    if (!this.grid.moveFloatBlock(directions.DOWN)) {
      this.score += 1;
      const numCleared = this.grid.clearFullRows();
      this.score += numCleared * 10;
      this.insertBlock();
    } else {
      this.redrawCanvasGrid();
    }
  }

  rotateLeft() {
    this.grid.rotateFloatBlock(directions.LEFT);
    this.redrawCanvasGrid();
  }

  rotateRight() {
    this.grid.rotateFloatBlock(directions.RIGHT);
    this.redrawCanvasGrid();
  }
}


const g = new Game();
const readyDOM = setInterval(() => {
  if (document.readyState === 'complete') {
    clearInterval(readyDOM);
    document.body.insertBefore(g.getCanvasGrid(), document.body.childNodes[0]);
    document.body.insertBefore(g.getCanvasPanel(), document.body.childNodes[1]);
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

g.startNewGame();
