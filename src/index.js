import { Map } from './map.js';

const map = new Map({
  container: document.getElementById('app'),
});

document.querySelector('.zoomIn').addEventListener('click', () => map.zoomIn());
document.querySelector('.zoomOut').addEventListener('click', () => map.zoomOut());
document.querySelector('.moveToDrone').addEventListener('click', () => map.moveTo(0.37, 0.28));
document.querySelector('.moveToCenter').addEventListener('click', () => map.moveTo(0.7, 0.57));

document.addEventListener('keydown', e => {
  switch (e.key) {
    case '+':
    case '=': // handle "unshifted" `+` key too
      map.zoomIn();
      break;
    case '-':
      map.zoomOut();
      break;
  }
});

// Disable browser's default image dragging.
document.addEventListener('mousedown', e => e.preventDefault());
// Move the map when left mouse button is pressed.
document.addEventListener('mousemove', e => e.buttons === 1 && map.moveBy(e.movementX, e.movementY));
