import { Map } from './map.js';

const map = new Map({
  container: document.getElementById('app'),
  getViewport: () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }),
});
