const {
  compare2DArrays, BlockO, BlockT, BlockI,
} = require('./game-blocks');

test('BlockO', () => {
  const testBlockO = new BlockO();
  testBlockO.rotateLeft();
  expect(testBlockO.getHeight()).toBe(2);
  expect(testBlockO.getWidth()).toBe(2);
  const expectedShape = [['O', 'O'],
    ['O', 'O']];
  expect(compare2DArrays(testBlockO.getShape(), expectedShape)).toBe(true);
});

test('BlockT', () => {
  const testBlockT = new BlockT();
  testBlockT.rotateLeft();
  expect(testBlockT.getWidth()).toBe(2);
  expect(testBlockT.getHeight()).toBe(3);
  testBlockT.rotateRight();
  testBlockT.rotateRight();
  testBlockT.rotateRight();
  expect(testBlockT.getWidth()).toBe(3);
  expect(testBlockT.getHeight()).toBe(2);
});

test('BlockI', () => {
  const testBlockI = new BlockI();
  testBlockI.rotateRight();
  expect(testBlockI.getHeight()).toBe(1);
  expect(testBlockI.getWidth()).toBe(4);
  testBlockI.rotateRight();
  expect(testBlockI.getHeight()).toBe(4);
  expect(testBlockI.getWidth()).toBe(1);
  const expectedShape = [['I'],
    ['I'],
    ['I'],
    ['I']];
  expect(compare2DArrays(testBlockI.getShape(), expectedShape)).toBe(true);
});
