import { Camera } from './Camera';

export class Compositor {
  layers = new Set<(
    context: CanvasRenderingContext2D,
    camera?: Camera
  ) => void>();

  addLayer(layer: any) {
    this.addLayers(layer);
  }

  addLayers(...layers: any[]) {
    layers.forEach(layer => this.layers.add(layer));
  }

  draw(
    context: CanvasRenderingContext2D,
    camera?: Camera
  ) {
    this.layers.forEach(layer => layer(context, camera));
  }
}