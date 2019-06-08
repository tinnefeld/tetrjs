const mod = (x, n) => (x % n + n) % n

class Block {
  constructor(shapes) {    
    this.shapes = shapes;
    this.orientation = 0;
  }

  getWidth(){
    return this.shapes[this.orientation][0].length;
  }

  getHeight(){
    return this.shapes[this.orientation].length;
  }

  getShape(){
    return this.shapes[this.orientation];
  }

  rotateLeft(){
    this.orientation = mod(--this.orientation, this.shapes.length);
  }

  rotateRight(){
    this.orientation = mod(++this.orientation, this.shapes.length);
  }
}

class BlockO extends Block {
    constructor(){
        const shapes = [[['O','O'],
                         ['O','O']]];
        super(shapes);
    }
}

class BlockT extends Block {
    constructor(){
      const shapes = [[['X','T','X'],
                       ['T','T','T']],
                      [['T','X'],
                       ['T','T'],
                       ['T','X']],
                      [['T','T','T'],
                       ['X','T','X']],
                      [['X','T'],
                       ['T','T'],
                       ['X','T']]];
      super(shapes);
    }
}

class BlockI extends Block {
    constructor(){
      const shapes = [[['I'],
                       ['I'],
                       ['I'],
                       ['I'],
                       ['I']],
                      [['I','I','I','I']]];
      super(shapes);
    }
}

class BlockS extends Block {
    constructor(){
      const shapes = [[['X','S','S'],
                       ['S','S','X']],
                      [['S','X'],
                       ['S','S'],
                       ['X','S']]];
      super(shapes); 
  }
}

class BlockZ extends Block {
  constructor(){
    const shapes = [[['Z','Z','X'],
                     ['X','Z','Z']],
                    [['X','Z'],
                     ['Z','Z'],
                     ['Z','X']]];
    super(shapes); 
  }
}

class BlockL extends Block {
  constructor(){
    const shapes = [[['L','X'],
                     ['L','X'],
                     ['L','L']],
                    [['L','L','L'],
                     ['L','X','X']],
                    [['L','L'],
                     ['X','L'],
                     ['X','L']],
                    [['X','X','L'],
                     ['L','L','L']]];
    super(shapes);
  }
}

class BlockJ extends Block {
  constructor(){
    const shapes = [[['X','J'],
                     ['X','J'],
                     ['J','J']],
                    [['J','X','X'],
                     ['J','J','J']],
                    [['J','J'],
                     ['J','X'],
                     ['J','X']],
                    [['J','J','J'],
                     ['X','X','J']]];
    super(shapes);
  }
}

module.exports = { BlockO, BlockT, BlockI, BlockS, BlockZ, BlockL, BlockJ }