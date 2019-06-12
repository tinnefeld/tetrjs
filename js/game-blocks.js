const mod = (x, n) => ((x % n) + n) % n;

class Block {
  constructor(shapes) {
    this.shapes = shapes;
    this.orientation = 0;
  }

  getWidth() {
    return this.shapes[this.orientation][0].length;
  }

  getHeight() {
    return this.shapes[this.orientation].length;
  }

  getShape() {
    return this.shapes[this.orientation];
  }

  rotateLeft() {
    this.orientation = mod(this.orientation -= 1, this.shapes.length);
  }

  rotateRight() {
    this.orientation = mod(this.orientation += 1, this.shapes.length);
  }
}

class BlockO extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['O', 'O'],
                     ['O', 'O']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockT extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['X', 'T', 'X'],
                     ['T', 'T', 'T']],
                    [['T', 'X'],
                     ['T', 'T'],
                     ['T', 'X']],
                    [['T', 'T', 'T'],
                     ['X', 'T', 'X']],
                    [['X', 'T'],
                     ['T', 'T'],
                     ['X', 'T']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockI extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['I'],
                     ['I'],
                     ['I'],
                     ['I']],
                    [['I', 'I', 'I', 'I']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockS extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['X', 'S', 'S'],
                     ['S', 'S', 'X']],
                    [['S', 'X'],
                     ['S', 'S'],
                     ['X', 'S']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockZ extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['Z', 'Z', 'X'],
                     ['X', 'Z', 'Z']],
                    [['X', 'Z'],
                     ['Z', 'Z'],
                     ['Z', 'X']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockL extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['L', 'X'],
                     ['L', 'X'],
                     ['L', 'L']],
                    [['L', 'L', 'L'],
                     ['L', 'X', 'X']],
                    [['L', 'L'],
                     ['X', 'L'],
                     ['X', 'L']],
                    [['X', 'X', 'L'],
                     ['L', 'L', 'L']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

class BlockJ extends Block {
  constructor() {
    /* eslint-disable indent */
    const shapes = [[['X', 'J'],
                     ['X', 'J'],
                     ['J', 'J']],
                    [['J', 'X', 'X'],
                     ['J', 'J', 'J']],
                    [['J', 'J'],
                     ['J', 'X'],
                     ['J', 'X']],
                    [['J', 'J', 'J'],
                     ['X', 'X', 'J']]];
    /* eslint-enable indent */
    super(shapes);
  }
}

function compare2DArrays(a, b) {
  if (a.length !== b.length || a[0].length !== b[0].length) {
    return false;
  }
  for (let h = 0; h < a.length; h += 1) {
    for (let w = 0; w < a[0].length; w += 1) {
      if (a[h][w] !== b[h][w]) {
        return false;
      }
    }
  }
  return true;
}

// eslint-disable-next-line consistent-return
function getRandomBlock() {
  const x = Math.floor(Math.random() * 7);
  // eslint-disable-next-line default-case
  switch (x) {
    case 0: return new BlockO();
    case 1: return new BlockT();
    case 2: return new BlockI();
    case 3: return new BlockS();
    case 4: return new BlockZ();
    case 5: return new BlockL();
    case 6: return new BlockJ();
  }
}

module.exports = {
  compare2DArrays, BlockO, BlockT, BlockI, BlockS, BlockZ, BlockL, BlockJ, getRandomBlock,
};
