import { SpriteSheet } from './SpriteSheet';

export class Font {
  constructor(public sprites: SpriteSheet, public size: number) {}

  print(
    text: string,
    context: CanvasRenderingContext2D,
    x: number,
    y: number
  ) {
    text.split('').forEach((char, index) =>
      this.sprites.draw(
        char,
        context,
        x + index * this.size,
        y
      )
    );
  }

  em(value = 1) {
    return value * this.size;
  }
}