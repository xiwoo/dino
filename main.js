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

let animation;
let timer = 0;
const cactuses = [];
let jumpTimer = 0;
let jump = false;

function frameFunc() {
  animation = requestAnimationFrame(frameFunc);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if(timer % 200 === 0) {
    const cactus = new Cactus(canvas.width, 200, 50, 50, 'red');
    cactuses.push(cactus);
    cactus.draw();
  }
  
  cactuses.forEach((x, i, o) => {
    if(x.x < 0) {
      o.splice(i, 1)
    }
    x.x--;
    crashCheck(dino, x);
    x.draw();
  });

  
  if(jump) {
    dino.y--;
    jumpTimer++;
  }
  else if(dino.y < 200){
    dino.y++;
  }
  if(jumpTimer > 100) {
    jump = false;
    jumpTimer = 0;
  }
  dino.draw();
}


frameFunc();

function crashCheck(dino, cactus) {
  const xCalc = cactus.x - (dino.x + dino.width);
  const yCalc = cactus.y - (dino.y + dino.height);
  if(xCalc < 0 && yCalc < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}


document.addEventListener('keydown', e => {
  if(e.code === 'Space') {
    jump = true;
  }
})