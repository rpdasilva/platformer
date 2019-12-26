import { Camera } from './Camera';

export class Compositor {
  layers: Array<(
    context: CanvasRenderingContext2D,
    camera?: Camera
  ) => void> = [];

  addLayer(layer: any) {
    this.layers.push(layer);
  }

  draw(
    context: CanvasRenderingContext2D,
    camera: Camera
  ) {
    this.layers.forEach(layer => layer(context, camera));
  }
}