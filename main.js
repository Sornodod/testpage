document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');
    const cellSize = 20;
    let mode = '';
    let columns, rows;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 60;
        columns = Math.floor(canvas.width / cellSize);
        rows = Math.floor(canvas.height / cellSize);
        drawGrid();
        placeColors();
    }

    function drawGrid() {
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
        const x1 = getRandomInt(columns);
        const y1 = getRandomInt(rows);
        let x2 = getRandomInt(columns);
        let y2 = getRandomInt(rows);

        while (getDistance(x1, y1, x2, y2) < 20) {
            x2 = getRandomInt(columns);
            y2 = getRandomInt(rows);
        }

        ctx.fillStyle = 'red';
        ctx.fillRect(x1 * cellSize, y1 * cellSize, cellSize, cellSize);

        ctx.fillStyle = 'green';
        ctx.fillRect(x2 * cellSize, y2 * cellSize, cellSize, cellSize);
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / cellSize);
        const y = Math.floor((event.clientY - rect.top) / cellSize);

        if (x >= 0 && x < columns && y >= 0 && y < rows) {
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

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleClick);
    resizeCanvas();

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
});