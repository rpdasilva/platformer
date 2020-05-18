import { Font } from '../Font';

export const createTextLayer = (font: Font, text: string) => {
  return function drawTextLayer (context: CanvasRenderingContext2D) {
    const screenWidth = Math.floor(context.canvas.width / font.size);
    const screenHeight = Math.floor(context.canvas.height / font.size);
    const x = screenWidth / 2 - text.length / 2;
    const y = screenHeight / 2;

    font.print(text, context, font.em(x), font.em(y));
  }
};
