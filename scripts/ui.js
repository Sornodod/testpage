import { mode } from './grid.js';

export function setupUI() {
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
}
