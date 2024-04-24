export class MapModel {
  currentLayer = '';
  layers = []
  constructor(currentLayer, layers) {
    this.currentLayer = currentLayer
    this.layers = layers
  }

  get layers() {
    return this.layers
  }

  set layers(layers) {
    this.layers = layers
  }
}