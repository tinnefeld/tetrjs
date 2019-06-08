const { Grid } = require('./game-grid');
const { BlockO, BlockT, BlockI, BlockS, BlockZ, BlockL, BlockJ } = require('./game-blocks');

test('initGrid', () => {
    const myGrid = new Grid(10,20);
    //console.log(myGrid.grid);
    expect(true);
});

test('insertBlock', () => {
    const myGrid = new Grid(10,20);
    const testBlockT = new BlockT;
    const testBlockJ = new BlockJ;
    testBlockJ.rotateRight();
    const testBlockO = new BlockO;
    const testBlockI = new BlockI;
    testBlockI.rotateLeft();
    myGrid.insertBlock(testBlockT,0,0);
    myGrid.insertBlock(testBlockJ,7,18);
    myGrid.insertBlock(testBlockO,0,18);
    myGrid.insertBlock(testBlockI,6,0);
    //console.log(myGrid.getGrid());
    expect(myGrid.getGrid() == 
    [ [ 'X', 'T', 'X', 'X', 'X', 'X', 'I', 'I', 'I', 'I' ],
    [ 'T', 'T', 'T', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'J', 'X', 'X' ],
    [ 'O', 'O', 'X', 'X', 'X', 'X', 'X', 'J', 'J', 'J' ] ]);
});
