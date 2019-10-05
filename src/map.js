/**
 * For x zoom level we have 2 ** x columns, each column has 2 ** x tiles.
 *
 * Zoom=2 looks like:
 *  ___________________________
 * |      |      |      |      |
 * | c0t0 | c1t0 | c2t0 | c3t0 |
 * |______|______|______|______|
 * |      |      |      |      |
 * | c0t1 | c1t1 | c2t1 | c3t1 |
 * |______|______|______|______|
 * |      |      |      |      |
 * | c0t2 | c1t2 | c2t3 | c3t2 |
 * |______|______|______|______|
 * |      |      |      |      |
 * | c0t3 | c1t3 | c2t4 | c3t3 |
 * |______|______|______|______|
 */
export class Map {
  constructor(o) {
    this.container = o.container;
    this.MIN_ZOOM = o.minZoom || 0;
    this.MAX_ZOOM = o.maxZoom || 3;
    this.zoom = o.zoom || 0;
    this.tileSize = o.tileSize || 256;
    this.center = { x: 0.5, y: 0.5 }; // normalized center of the viewport

    this.mapNode = document.createElement('div');
    this.container.appendChild(this.mapNode);

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

    // Disable browser's default image dragging.
    document.addEventListener('mousedown', e => e.preventDefault());
    // Move the map when left mouse button is pressed.
    document.addEventListener('mousemove', e => e.buttons === 1 && this.moveBy(e.movementX, e.movementY));

    this.loadTiles();
    this.updateView();
  }
  /**
   * Move map relative to it's current position.
   *
   * @param {number} dx amount of pixels to move horizontally
   * @param {number} dy amount of pixels to move vertically
   */
  moveBy(dx, dy) {
    // Use center.x `-` dx (inverse dragging) to imitate spinning the globe with your hand,
    // rather than `+` as in standard operating-system-like drag'n'drop with the mouse cursor.
    this.center.x = this.center.x - this.normalize(dx);
    this.center.y = this.center.y - this.normalize(dy);
    this.updateView();
  }
  zoomIn() {
    this.setZoom(this.zoom + 1);
  }
  zoomOut() {
    this.setZoom(this.zoom - 1);
  }
  setZoom(zoom) {
    const newZoom = clamp(this.MIN_ZOOM, zoom, this.MAX_ZOOM);
    if (newZoom === this.zoom) {
      return;
    }
    this.zoom = newZoom;
    this.loadTiles();
    this.updateView();
  }
  /**
   * Normalizes the pixel coordinate value relative to map side (1200px => 0.5).
   */
  normalize(value) {
    return value / this.mapSide;
  }
  /**
   * Calculates how many tiles per zoom level there is.
   * Tiles-per-column is the same number as columns-per-zoom-level is.
   */
  get tilesCount() {
    return 2 ** this.zoom;
  }
  /**
   * Assuming that map is a square, calculates the side of the map.
   */
  get mapSide() {
    return this.tilesCount * this.tileSize;
  }
  updateView() {
    const mapSide = this.mapSide;
    this.mapNode.style.width = `${mapSide}px`;
    this.mapNode.style.height = `${mapSide}px`;
    // Negate translate values to have inverse dragging.
    const x = -(this.center.x - 0.5) * 100;
    const y = -(this.center.y - 0.5) * 100;
    this.mapNode.style.transform = `translate(${x}%, ${y}%)`;
  }
  loadTiles() {
    // Clear the old tiles.
    while (this.mapNode.firstChild) {
      this.mapNode.firstChild.remove();
    }

    // Load new tiles.
    const tiles = this.tilesCount;
    for (let i = 0; i < tiles; i++) {
      for (let j = 0; j < tiles; j++) {
        const img = new Image();
        img.src = `../assets/tiled/${this.zoom}/${i}/${j}.jpg`;
        img.classList.add('map__tile');
        img.style.transform = `translate(${i * this.tileSize}px, ${j * this.tileSize}px)`;
        this.mapNode.appendChild(img);
      }
    }
  }
}

function clamp(min, v, max) {
  return Math.max(min, Math.min(v, max));
}
