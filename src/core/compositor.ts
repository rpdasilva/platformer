export class Compositor {
  layers: Array<(context: CanvasRenderingContext2D) => void> = [];

  addLayer(layer: any) {
    this.layers.push(layer);
  }

  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach(layer => layer(context));
  }
}