class Map {
  constructor(o) {
    this.container = o.container;
    this.zoom = 3;
    this.tileSize = o.tileSize || 256;

    this.loadTiles();
  }
  loadTiles() {
    const areas = 2 ** this.zoom;
    for (let i = 0; i < areas; i++) {
      for (let j = 0; j < areas; j++) {
        const img = new Image();
        img.src = `../assets/tiled/${this.zoom}/${i}/${j}.jpg`;
        img.classList.add('map__tile');
        img.style.transform = `translate(${i * this.tileSize}px, ${j * this.tileSize}px)`;
        this.container.appendChild(img);
      }
    }
  }
}

const map = new Map({
  container: document.getElementById('app'),
});
