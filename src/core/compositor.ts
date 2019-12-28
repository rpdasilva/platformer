import { Camera } from './Camera';

export class Compositor {
  layers: Array<(
    context: CanvasRenderingContext2D,
    camera?: Camera
  ) => void> = [];

  addLayer(layer: any) {
    this.addLayers(layer);
  }

  addLayers(...layers: any[]) {
    this.layers.push(...layers);
  }

  draw(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    this.layers.forEach(layer => layer(context, camera));
  }
}