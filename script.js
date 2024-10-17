const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const upBtn = document.getElementById('up-btn');
const downBtn = document.getElementById('down-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');

let grid = [];
let score = 0;

function init() {
    score = 0;
    scoreElement.innerText = score;
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    spawn();
    spawn();
    render();
}

function spawn() {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] === 0) {
                emptyCells.push({r, c});
            }
        }
    }
    if (emptyCells.length > 0) {
        const {r, c} = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[r][c] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render() {
    gridElement.innerHTML = '';
    grid.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (value > 0) {
                tile.classList.add(`tile-${value}`);
                tile.innerText = value;
            }
            gridElement.appendChild(tile);
        });
    });
    scoreElement.innerText = score;
}

function move(direction) {
    let moved = false;
    const originalGrid = grid.map(row => row.slice());

    if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
            for (let r = 1; r < 4; r++) {
                if (grid[r][c] !== 0) {
                    let current = grid[r][c];
                    let target = r;
                    while (target > 0 && grid[target - 1][c] === 0) {
                        grid[target - 1][c] = current;
                        grid[target][c] = 0;
                        target--;
                        moved = true;
                    }
                    if (target > 0 && grid[target - 1][c] === current) {
                        grid[target - 1][c] *= 2;
                        grid[target][c] = 0;
                        score += current;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
            for (let r = 2; r >= 0; r--) {
                if (grid[r][c] !== 0) {
                    let current = grid[r][c];
                    let target = r;
                    while (target < 3 && grid[target + 1][c] === 0) {
                        grid[target + 1][c] = current;
                        grid[target][c] = 0;
                        target++;
                        moved = true;
                    }
                    if (target < 3 && grid[target + 1][c] === current) {
                        grid[target + 1][c] *= 2;
                        grid[target][c] = 0;
                        score += current;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
            for (let c = 1; c < 4; c++) {
                if (grid[r][c] !== 0) {
                    let current = grid[r][c];
                    let target = c;
                    while (target > 0 && grid[r][target - 1] === 0) {
                        grid[r][target - 1] = current;
                        grid[r][target] = 0;
                        target--;
                        moved = true;
                    }
                    if (target > 0 && grid[r][target - 1] === current) {
                        grid[r][target - 1] *= 2;
                        grid[r][target] = 0;
                        score += current;
                        moved = true;
                    }
                }
            }
        }
    } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
            for (let c = 2; c >= 0; c--) {
                if (grid[r][c] !== 0) {
                    let current = grid[r][c];
                    let target = c;
                    while (target < 3 && grid[r][target + 1] === 0) {
                        grid[r][target + 1] = current;
                        grid
                        
