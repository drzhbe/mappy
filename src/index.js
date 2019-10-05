import { Map } from './map.js';

const map = new Map({
  container: document.getElementById('app'),
});
document.querySelector('.zoomIn').addEventListener('click', () => map.zoomIn());
document.querySelector('.zoomOut').addEventListener('click', () => map.zoomOut());
document.querySelector('.moveToDrone').addEventListener('click', () => map.moveTo(0.37, 0.28));
document.querySelector('.moveToCenter').addEventListener('click', () => map.moveTo(0.7, 0.57));
