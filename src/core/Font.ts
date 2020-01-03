import { Spritesheet } from './Spritesheet';

export class Font {
  constructor(public sprites: Spritesheet, public size: number) {}

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
}