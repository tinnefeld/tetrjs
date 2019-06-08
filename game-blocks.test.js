const { BlockO, BlockT, BlockI } = require('./game-blocks');

test('BlockO', () => {
    const testBlockO = new BlockO;
    testBlockO.rotateLeft();
    expect(testBlockO.getShape() == [['O','O'],
                                     ['O','O']]);
    expect(testBlockO.getHeight() == 2);
    expect(testBlockO.getWidth() == 2);
    
});

test('BlockT', () => {
    const testBlockT = new BlockT;
    
    testBlockT.rotateLeft();
    expect(testBlockT.getShape() == [['X','T'],
                                     ['T','T'],
                                     ['X','T']]);
    expect(testBlockT.getWidth() == 2);
    expect(testBlockT.getHeight() == 3);

    testBlockT.rotateRight();
    testBlockT.rotateRight();
    testBlockT.rotateRight();
    expect(testBlockT.getShape() == [['T','T','T'],
                                     ['X','T','X']]);
    expect(testBlockT.getWidth() == 3);
    expect(testBlockT.getHeight() == 2);
});

test('BlockI', () => {
    const testBlockI = new BlockI;

    testBlockI.rotateRight();
    expect(testBlockI.getHeight == 1 );
    expect(testBlockI.getWidth == 4 );

    testBlockI.rotateRight();
    expect(testBlockI.getHeight == 4 );
    expect(testBlockI.getWidth == 1 );
});