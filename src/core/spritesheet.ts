export class Spritesheet {
  tiles = new Map<string, HTMLCanvasElement>();

  constructor(
    public image: HTMLImageElement,
    public width: number,
    public height: number
  ) {}

  define(name: string, x: number, y: number, width: number, height: number) {
    const buffer = document.createElement('canvas') as HTMLCanvasElement;
    buffer.width = width;
    buffer.height = height;
    buffer
      .getContext('2d')
      .drawImage(this.image,
        x, y, width, height,
        0, 0, width, height
      );

    this.tiles.set(name, buffer);
  }

  defineTile(name: string, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  draw(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}