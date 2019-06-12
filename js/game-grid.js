const directions = {
  LEFT:  'left',
  RIGHT: 'right',
  DOWN:  'down' 
}

class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    this.floatBlock = {};
    this.floatBlockX = 0;
    this.floatBlockY = 0;

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
   * inserts a block into the grid at the given anchor point
   * XPos,yPos = 0,0 is the top left element of the grid 
   */
  insertBlock(block, xPos, yPos){
    if ( xPos + block.getWidth() > this.width ||
         yPos + block.getHeight() > this.height ) {
           return false;
         }
    for (let h = 0; h < block.getHeight(); h += 1) {
      for (let w = 0; w < block.getWidth(); w += 1) {
        if (block.getShape()[h][w] != 'X') { 
          this.grid[yPos+h][xPos+w] = block.getShape()[h][w];
        }
      }
    }
    return true;
  }

  /**
   * removes a block from the grid at the given anchor point
   * XPos,yPos = 0,0 is the top left element of the grid 
   */
  removeBlock(block, xPos, yPos){
    if ( xPos + block.getWidth() > this.width ||
         yPos + block.getHeight() > this.height ) {
           return false;
         }
    for (let h = 0; h < block.getHeight(); h += 1) {
      for (let w = 0; w < block.getWidth(); w += 1) {
        if (block.getShape()[h][w] != 'X') { 
          this.grid[yPos+h][xPos+w] = 'X';
        }
      }
    }
    return true;
  }

  /**
   * checks if a block collides with existing blocks in the 
   * grid or exceeds grid boundaries. returns false if there
   * are no collisions
   */
  checkCollision(block, xPos, yPos){
    //check if it exceeds grid boundaries
    if (xPos + block.getWidth() > this.width ||
        yPos + block.getHeight() > this.height ||
        yPos < 0 ||
        xPos < 0){
        return true;
    }
    //check if collides with existing blocks in grid
    for (let h = 0; h < block.getHeight(); h += 1) {
      for (let w = 0; w < block.getWidth(); w += 1) {
        if (block.getShape()[h][w] != 'X' && 
            this.grid[yPos+h][xPos+w] != 'X') {
              return true;          
        }
      }
    }
    return false;
  }

  clearFullRows(){
    //check for each row if it's full
    let h = this.getHeight() - 1;
    while (h > 0) {
      let rowIsFull = true;
      for (let w = 0; w < this.getWidth(); w+= 1) {
        if (this.getGrid()[h][w] == 'X') {
          rowIsFull = false;
          break;
        }        
      }
      if (!rowIsFull) {
        h--;
        continue;
      }
      //row is full, remove from grid, add empty row at the top
      this.getGrid().splice(h,1); 
      const newRow = [];
      for (let n = 0; n < this.getWidth(); n += 1) {
        newRow.push('X');
      }
      this.getGrid().unshift(newRow);
    }
  }

  insertNewFloatBlock(block){
    if (this.checkCollision(block,Math.round(this.width/2-1),0)){
      return false;
    }
    this.floatBlock = block;
    this.floatBlockX = Math.round(this.width/2-1);
    this.floatBlockY = 0;
    this.insertBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
    return true;
  }

  moveFloatBlock(direction){
    let newX = this.floatBlockX;
    let newY = this.floatBlockY;
    switch (direction){
      case directions.LEFT:
        newX = this.floatBlockX - 1;
        break;
      case directions.RIGHT:
        newX = this.floatBlockX + 1;
        break;
      case directions.DOWN:
        newY = this.floatBlockY + 1;
    }
    this.removeBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
    if (this.checkCollision(this.floatBlock,newX,newY)){
      this.insertBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
      return false;
    }    
    this.floatBlockX = newX;
    this.floatBlockY = newY;
    this.insertBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
    return true;
  }

  rotateFloatBlock(direction){
    this.removeBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
    switch (direction){
      case directions.LEFT:
          this.floatBlock.rotateLeft();
          break;
      case directions.RIGHT:
          this.floatBlock.rotateRight();
          break;
    }    
    if (this.checkCollision(this.floatBlock,this.floatBlockX,this.floatBlockY)){
      switch (direction){
        case directions.LEFT:
            this.floatBlock.rotateRight();
            break;
        case directions.RIGHT:
            this.floatBlock.rotateLeft();
            break;
      }    
    }
    this.insertBlock(this.floatBlock,this.floatBlockX,this.floatBlockY);
  }
}

module.exports = { Grid, directions }