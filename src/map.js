export class Map {
  constructor(o) {
    this.container = o.container;
    this.MIN_ZOOM = o.minZoom || 0;
    this.MAX_ZOOM = o.maxZoom || 3;
    this.zoom = o.zoom || this.MAX_ZOOM;
    this.tileSize = o.tileSize || 256;

    document.addEventListener('keydown', e => {
      switch (e.key) {
        case '+':
        case '=': // handle "unshifted" `+` key too
          this.zoomIn();
          break;
        case '-':
          this.zoomOut();
          break;
      }
    });

    this.loadTiles();
  }
  zoomIn() {
    this.setZoom(this.zoom + 1);
  }
  zoomOut() {
    this.setZoom(this.zoom - 1);
  }
  setZoom(zoom) {
    this.zoom = Math.max(this.MIN_ZOOM, Math.min(zoom, this.MAX_ZOOM));
    this.loadTiles();
  }
  loadTiles() {
    // Clear the old tiles.
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }

    // Load new tiles.
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
