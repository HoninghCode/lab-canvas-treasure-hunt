const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

context.fillStyle = 'white';
context.fillRect(0, 0, width, height);

const numberOfTiles = 10;
const tileSize = width / numberOfTiles;
const strokeWidth = 3;
const strokeColor = 'black';

function drawGrid() {
  for (x = 0; x <= height; x += tileSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  // Creating Horizontal lines -
  for (y = 0; y <= height; y += tileSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.direction = 'down';
  }
  moveUp() {
    if (this.row < 1) {
      return 0;
    } else {
      this.row--;
    }
    this.direction = 'up';
  }
  moveRight() {
    if (this.col > 8) {
      return 9;
    } else {
      this.col++;
    }
    this.direction = 'right';
  }
  moveDown() {
    if (this.row > 8) {
      return 9;
    } else {
      this.row++;
    }
    this.direction = 'down';
  }
  moveLeft() {
    if (this.col < 1) {
      return 0;
    } else {
      this.col--;
    }
    this.direction = 'left';
  }
}

const player = new Character(0, 0); // (0,0) = Initial position
// const player2 = new Character(positionX, positionY); // (0,0) = Initial position

// console.log(player.col, player.row);

function drawPlayer() {
  const playerImg = new Image();
  playerImg.src = '/images/character-' + player.direction + '.png';
  playerImg.onload = () => {
    context.drawImage(
      playerImg,
      player.col * tileSize,
      player.row * tileSize,
      50,
      50
    );
  };
}

// const positionY = Math.floor(Math.random() * numberOfTiles);
// const positionX = Math.floor(Math.random() * numberOfTiles);

// Iteration 4
class Treasure {
  constructor(col, row) {
    this.col = col;
    this.row = row;
    this.setRandomPosition(); // to set `this.col` and `this.row`
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * numberOfTiles);
    this.row = Math.floor(Math.random() * numberOfTiles);
  }
}
const treasure = new Treasure(0, 0);

function drawTreasure(col, row) {
  const TreasureImg = new Image();
  TreasureImg.src = '/images/treasure.png';
  TreasureImg.onload = () => {
    context.drawImage(
      TreasureImg,
      treasure.col * tileSize,
      treasure.row * tileSize,
      50,
      50
    );
  };
}

window.addEventListener('keydown', (event) => {
  // Stop the default behavior (moving the screen to the left/up/right/down)
  event.preventDefault();

  // React based on the key pressed
  switch (event.keyCode) {
    case 37:
      player.moveLeft();
      break;
    case 38:
      player.moveUp();
      break;
    case 39:
      player.moveRight();
      break;
    case 40:
      player.moveDown();
      break;
  }

  drawEverything();

  if (player.row === treasure.row) {
    if (player.col === treasure.col) {
      console.log('Jeej! its the same');
      treasure.setRandomPosition();
    }
  }

  // console.log(player.row, player.col);
  // console.log(treasure.row, treasure.col);
});

function drawEverything() {
  context.clearRect(0, 0, 500, 500);
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();
