document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    let columns, rows;
    let cellStates = []; // Массив для хранения состояния ячеек

    // Временный холст для рисования сетки
    const gridCanvas = document.createElement('canvas');
    const gridCtx = gridCanvas.getContext('2d');

    function resizeCanvas() {
        const container = document.querySelector('.canvas-container');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        columns = Math.floor(canvas.width / cellSize);
        rows = Math.floor(canvas.height / cellSize);
        cellStates = Array.from({ length: rows }, () => Array(columns).fill(null)); // Инициализируем массив состояния

        // Настраиваем временный холст
        gridCanvas.width = canvas.width;
        gridCanvas.height = canvas.height;

        drawGrid(); // Рисуем сетку на временном холсте
        drawCells(); // Рисуем ячейки на основном холсте
        placeColors(); // Размещаем начальные цвета
    }

    function drawGrid() {
        gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height); // Очищаем временный холст
        gridCtx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        gridCtx.lineWidth = 1;

        for (let x = 0; x <= gridCanvas.width; x += cellSize) {
            gridCtx.moveTo(x, 0);
            gridCtx.lineTo(x, gridCanvas.height);
        }
        for (let y = 0; y <= gridCanvas.height; y += cellSize) {
            gridCtx.moveTo(0, y);
            gridCtx.lineTo(gridCanvas.width, y);
        }
        gridCtx.stroke();
    }

    function drawCells() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем основной холст
        ctx.drawImage(gridCanvas, 0, 0); // Копируем сетку из временного холста

        // Рисуем ячейки с сохраненными состояниями
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const state = cellStates[y][x];
                if (state) {
                    ctx.fillStyle = state;
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function getDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function placeColors() {
        // Убедимся, что функция вызывается и работает правильно
        console.log('Placing colors');

        const x1 = getRandomInt(columns);
        const y1 = getRandomInt(rows);
        let x2 = getRandomInt(columns);
        let y2 = getRandomInt(rows);

        while (getDistance(x1, y1, x2, y2) < 20) {
            x2 = getRandomInt(columns);
            y2 = getRandomInt(rows);
        }

        cellStates[y1][x1] = 'red';
        cellStates[y2][x2] = 'green';

        drawCells(); // Перерисовываем ячейки с начальными цветами
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        if (x >= 0 && x < columns && y >= 0 && y < rows) {
            switch (mode) {
                case 'draw':
                    cellStates[y][x] = 'black'; // Устанавливаем цвет для режима "ДОРОГА"
                    break;
                case 'tower':
                    cellStates[y][x] = 'blue'; // Устанавливаем цвет для режима "БАШНЯ"
                    break;
                case 'erase':
                    cellStates[y][x] = null; // Очищаем только выбранную ячейку
                    break;
            }
            drawCells(); // Перерисовываем ячейки с обновленным состоянием
        }
    }

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleClick);
    resizeCanvas(); // Инициализация при загрузке
});

let mode = '';

document.getElementById('buildButton').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'flex' : 'none';
});

document.getElementById('roadButton').addEventListener('click', () => {
    mode = 'draw'; // Устанавливаем режим "ДОРОГА"
});

document.getElementById('towerButton').addEventListener('click', () => {
    mode = 'tower'; // Устанавливаем режим "БАШНЯ"
});

document.getElementById('deleteButton').addEventListener('click', () => {
    mode = 'erase'; // Устанавливаем режим "Удаление"
});
