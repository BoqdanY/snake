'use strict';

let isPlay = true;
const label = document.getElementById('label');

function addPoint(point) {
    label.innerHTML = `Score: ${point}`;
}

const directions = {
    'ArrowRight': [0, 1],
    'ArrowLeft': [0, -1],
    'ArrowUp': [-1, 0],
    'ArrowDown': [1, 0]
  };
  const directionChecker = {
    'ArrowRight': directions['ArrowLeft'],
    'ArrowLeft': directions['ArrowRight'],
    'ArrowUp': directions['ArrowDown'],
    'ArrowDown': directions['ArrowUp']
  };
  

document.addEventListener('keydown', (event) => {
    if(directionChecker[event.key] != snake.direction) {
        snake.direction = directions[event.key];
    }
});

class Area {
    constructor() {
        this.width = 10;
        this.height = 10;
        this.arr = [];
    }

    draw() {
        const container = document.getElementById('container');
        
        for (let i = 0; i < this.height; i++) {
            let row = document.createElement('div');
            row.className = 'row';
            this.arr[i] = [];

            for (let j = 0; j < this.width; j++) {
                const block = document.createElement('div');
                block.className = 'block';
                row.append(block);
                this.arr[i].push(block);
            }
            container.append(row);
        }
    }
}

class Food {
    constructor(area) {
        this.area = area;
    }

    createBlockFood(arr) {
        this.x = Math.round(Math.random() * (this.area.width - 1));
        this.y = Math.round(Math.random() * (this.area.height - 1));
        
        for (const elem of arr) {
            if (elem[0] === this.y && elem[1] === this.x) {
                return this.createBlockFood(arr);
            }
        }
        
        const foodBlock = document.createElement('div');
        foodBlock.className = 'food';
        this.area.arr[this.y][this.x].append(foodBlock);
    }

    isEaten(y, x) {
        if (y === this.y && x === this.x) return true;
    }
}

class Snake {
    constructor(area, food) {
        this.arr = [[1,1], [1,2]];
        this.direction = directions['ArrowDown'];
        this.area = area;
        this.food = food;
        this.point = 0;
    }

    draw() {
        for (const elem of this.arr) {
            const snakeBlock = document.createElement('div');
            if (elem === this.arr[this.arr.length - 1]) {
                snakeBlock.className = 'snakeHead';
            } else {
                snakeBlock.className = 'snakeBody';   
            }
            this.area.arr[elem[0]][elem[1]].append(snakeBlock);
        }
    }

    clear() {
        for (const elem of this.arr) {
            const snakeBlock = document.createElement('div');
            snakeBlock.className = 'snakeBody';
            this.area.arr[elem[0]][elem[1]].innerHTML = ' ';
        }
    }

    isGameOver() {
        if (this.arr[this.arr.length - 1][0] < 0 || this.arr[this.arr.length - 1][0] > (this.area.height - 1)) {
            return true;
        }
        if (this.arr[this.arr.length - 1][1] < 0 || this.arr[this.arr.length - 1][1] > (this.area.width - 1)) {
            return true;
        }
    }

    changeCoordinates() {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i] === this.arr[this.arr.length - 1]) {
                this.arr[i][0] += this.direction[0];
                this.arr[i][1] += this.direction[1];
            } else {
                this.arr[i][0] = this.arr[i + 1][0];
                this.arr[i][1] = this.arr[i + 1][1];
            }
        }
    }

    move() {
        this.food.createBlockFood(this.arr);
        setInterval(() => {
            if (isPlay) {
                this.clear();
                this.changeCoordinates()
                
                if (food.isEaten(this.arr[this.arr.length - 1][0], this.arr[this.arr.length - 1][1])) {
                    this.point++;
                    addPoint(this.point);
                    food.createBlockFood(this.arr);
                    this.arr.unshift([this.arr[this.arr.length - 1][0], this.arr[this.arr.length - 1][1]]);
                    this.clear();
                }
                if (this.isGameOver()) {
                    isPlay = false;
                }
                this.draw();
            }
        }, 100);
    }
}

const area = new Area;
area.draw();
const food = new Food(area);
const snake = new Snake(area, food);
snake.move();
