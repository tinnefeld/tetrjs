class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];

    //init grid
    for (let h = 0; h < this.height; h += 1) {
      const newRow = [];
      for (let w = 0; w < this.width; w += 1) {
        newRow.push('X');
      }
      this.grid.push(newRow);
    }
  }

  getHeight(){
    return this.height;
  }

  getWidth(){
    return this.width;
  }

  getGrid(){
    return this.grid;
  }


  /**
   * inserts a block into the grid at an anchor point
   * XPos,yPos = 0,0 is the top left element of the grid 
   */
  insertBlock(block, xPos, yPos){
    for (let h = 0; h < block.getHeight(); h += 1) {
      for (let w = 0; w < block.getWidth(); w += 1) {
        this.grid[yPos+h][xPos+w] = block.getShape()[h][w];
      }
    }
  }
  
}

module.exports = { Grid }