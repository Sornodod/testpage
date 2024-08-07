import { initializeGrid, handleCanvasClick, resizeCanvas } from './grid.js';
import { setupUI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gridCanvas');
    const ctx = canvas.getContext('2d');

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('click', handleCanvasClick);
    initializeGrid(ctx);

    setupUI();
    resizeCanvas();
});