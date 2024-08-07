export let mode = '';
const cellSize = 20;
let columns, rows;

export function initializeGrid(ctx) {
    window.ctx = ctx;
}

export function resizeCanvas() {
    const canvas = document.getElementById('gridCanvas');
    const container = document.querySelector('.canvas-container');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    columns = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    drawGrid();
    placeColors();
}

function drawGrid() {
    const ctx = window.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }
    ctx.stroke();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function placeColors() {
    const ctx = window.ctx;
    let x1 = getRandomInt(columns);
    let y1 = getRandomInt(rows);
    let x2 = getRandomInt(columns);
    let y2 = getRandomInt(rows);

    while (getDistance(x1, y1, x2, y2) < Math.min(columns, rows) / 2) {
        x2 = getRandomInt(columns);
        y2 = getRandomInt(rows);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(x1 * cellSize, y1 * cellSize, cellSize, cellSize);

    ctx.fillStyle = 'green';
    ctx.fillRect(x2 * cellSize, y2 * cellSize, cellSize, cellSize);
}

export function handleCanvasClick(event) {
    const canvas = document.getElementById('gridCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);

    if (x >= 0 && x < columns && y >= 0 && y < rows) {
        const ctx = window.ctx;
        switch (mode) {
            case 'draw':
                ctx.fillStyle = 'black'; // Цвет для режима "ДОРОГА"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                break;
            case 'tower':
                ctx.fillStyle = 'blue'; // Цвет для режима "БАШНЯ"
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                break;
            case 'erase':
                ctx.clearRect(x * cellSize, y * cellSize, cellSize, cellSize);
                break;
        }
    }
}
