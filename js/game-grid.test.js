const { Grid, directions } = require('./game-grid');
const {
  compare2DArrays, BlockO, BlockT, BlockI, BlockL, BlockJ,
} = require('./game-blocks');

test('insertBlock', () => {
  const myGrid = new Grid(10, 20);
  const testBlockT = new BlockT();
  const testBlockJ = new BlockJ();
  const testBlockL = new BlockL();
  testBlockJ.rotateRight();
  const testBlockO = new BlockO();
  const testBlockI = new BlockI();
  testBlockI.rotateLeft();
  myGrid.insertBlock(testBlockT, 0, 0);
  myGrid.insertBlock(testBlockL, 8, 16);
  myGrid.insertBlock(testBlockJ, 7, 18);
  myGrid.insertBlock(testBlockO, 0, 18);
  myGrid.insertBlock(testBlockI, 6, 0);
  const testGrid = [['X', 'T', 'X', 'X', 'X', 'X', 'I', 'I', 'I', 'I'],
    ['T', 'T', 'T', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'L', 'X'],
    ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'L', 'X'],
    ['O', 'O', 'X', 'X', 'X', 'X', 'X', 'J', 'L', 'L'],
    ['O', 'O', 'X', 'X', 'X', 'X', 'X', 'J', 'J', 'J']];
  expect(compare2DArrays(myGrid.getGrid(), testGrid)).toBe(true);
  expect(myGrid.insertBlock(testBlockO, 0, 19)).toBe(false);
  expect(myGrid.insertBlock(testBlockJ, 8, 19)).toBe(false);
});

test('removeBlock', () => {
  const myGrid = new Grid(3, 4);
  const testBlockT = new BlockT();
  myGrid.insertBlock(testBlockT, 0, 2);
  testBlockT.rotateRight();
  myGrid.insertBlock(testBlockT, 0, 0);
  myGrid.removeBlock(testBlockT, 0, 0);
  const testGrid = [['X', 'X', 'X'],
    ['X', 'X', 'X'],
    ['X', 'T', 'X'],
    ['T', 'T', 'T']];
  expect(compare2DArrays(myGrid.getGrid(), testGrid)).toBe(true);
});

test('checkCollision', () => {
  const myGrid = new Grid(4, 4);
  const testBlockL = new BlockL();
  expect(myGrid.checkCollision(testBlockL, 0, 0)).toBe(false);
  expect(myGrid.checkCollision(testBlockL, 0, 2)).toBe(true);
  expect(myGrid.checkCollision(testBlockL, -1, 0)).toBe(true);
  expect(myGrid.checkCollision(testBlockL, 2, 0)).toBe(false);
  expect(myGrid.checkCollision(testBlockL, 3, 0)).toBe(true);

  myGrid.insertBlock(testBlockL, 0, 1);
  expect(myGrid.checkCollision(testBlockL, 1, 0)).toBe(false);
  expect(myGrid.checkCollision(testBlockL, 1, 1)).toBe(true);
});

test('insertNewFloatBlock', () => {
  const myGrid = new Grid(10, 20);
  const testBlockT = new BlockT();
  expect(myGrid.insertNewFloatBlock(testBlockT)).toBe(true);
  expect(myGrid.insertNewFloatBlock(testBlockT)).toBe(false);
});

test('moveFloatBlock', () => {
  const myGrid = new Grid(10, 5);
  const testBlockT = new BlockT();
  myGrid.insertNewFloatBlock(testBlockT);
  expect(myGrid.moveFloatBlock(directions.LEFT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.LEFT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.LEFT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.LEFT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.LEFT)).toBe(false);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.RIGHT)).toBe(false);
  expect(myGrid.moveFloatBlock(directions.DOWN)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.DOWN)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.DOWN)).toBe(true);
  expect(myGrid.moveFloatBlock(directions.DOWN)).toBe(false);
});

test('rotateFloatBlock', () => {
  const myGrid = new Grid(4, 4);
  const testBlockT = new BlockT();
  myGrid.insertNewFloatBlock(testBlockT);
  myGrid.rotateFloatBlock(directions.LEFT);
  const testGrid1 = [['X', 'X', 'T', 'X'],
    ['X', 'T', 'T', 'X'],
    ['X', 'X', 'T', 'X'],
    ['X', 'X', 'X', 'X']];
  expect(compare2DArrays(myGrid.getGrid(), testGrid1)).toBe(true);
  myGrid.moveFloatBlock(directions.RIGHT);
  myGrid.rotateFloatBlock(directions.RIGHT);
  const testGrid2 = [['X', 'X', 'X', 'T'],
    ['X', 'X', 'T', 'T'],
    ['X', 'X', 'X', 'T'],
    ['X', 'X', 'X', 'X']];
  expect(compare2DArrays(myGrid.getGrid(), testGrid2)).toBe(true);
});

test('clearFullRows', () => {
  const myGrid = new Grid(4, 4);
  myGrid.grid = [['I', 'I', 'I', 'I'],
    ['X', 'X', 'X', 'I'],
    ['O', 'O', 'O', 'O'],
    ['O', 'X', 'O', 'O']];
  const testGrid1 = [['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'I'],
    ['O', 'X', 'O', 'O']];
  myGrid.clearFullRows();
  expect(compare2DArrays(myGrid.getGrid(), testGrid1)).toBe(true);
  myGrid.grid = [['X', 'X', 'X', 'I'],
    ['O', 'O', 'O', 'O'],
    ['O', 'O', 'O', 'O'],
    ['X', 'X', 'I', 'X']];
  myGrid.clearFullRows();
  const testGrid2 = [['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'X'],
    ['X', 'X', 'X', 'I'],
    ['X', 'X', 'I', 'X']];
  expect(compare2DArrays(myGrid.getGrid(), testGrid2)).toBe(true);
});
