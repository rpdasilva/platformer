import { createBuffer, getContext } from '../lib/canvas';

export class Spritesheet {
  tiles = new Map<string, HTMLCanvasElement[]>();
  animations = new Map<string, (distance: number) => string>();

  constructor(
    public image: HTMLImageElement,
    public width = 16,
    public height = 16
  ) {}

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffers = [false, true].map(flip => {
      const buffer = createBuffer(width, height);
      const context = getContext(buffer);

      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(this.image,
        x, y, width, height,
        0, 0, width, height
      );

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  defineTile(name: string, x: number, y: number) {
    this.define(
      name,
      x * this.width,
      y * this.height,
      this.width,
      this.height
    );
  }

  defineAnimation(name: string, animation: (distance: number) => string) {
    this.animations.set(name, animation);
  }

  draw(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    flip = false
  ) {
    const buffer = this.tiles.get(name)[+flip];
    context.drawImage(buffer, x, y);
  }

  drawTile(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    this.draw(name, context, x * this.width, y * this.height);
  }

  drawAnimation(
    name: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    distance: number
  ) {
    const animation = this.animations.get(name);
    this.drawTile(animation(distance), context, x, y);
  }
}