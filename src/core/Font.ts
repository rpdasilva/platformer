import { Spritesheet } from './Spritesheet';

export class Font {
  constructor(public sprites: Spritesheet, public size: number) {}

  print(
    text: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    scale?: number
  ) {
    if (scale) {
      context.scale(scale, scale);
    }

    text.split('').forEach((char, index) =>
      this.sprites.draw(
        char,
        context,
        x + index * this.size,
        y
      )
    );

    if (scale) {
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}