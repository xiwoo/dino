const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerHeight - 100;
canvas.height = window.innerHeight - 100;

class Cactus {
  constructor(x, y, width, heigth, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = heigth;
    this.color = color;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const dino = new Cactus(10, 200, 50, 50, 'green');

let timer = 0;
const cactuses = [];

function frameFunc() {
  requestAnimationFrame(frameFunc);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(timer % 120 === 0) {
    const cactus = new Cactus(canvas.width, 200, 50, 50, 'red');
    cactuses.push(cactus);
    cactus.draw();
  }
  
  cactuses.forEach(x => {
    x.x--;
    x.draw();
  })
  dino.draw();
}

frameFunc();