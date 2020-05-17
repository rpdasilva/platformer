export const createColourLayer = (hexColour: string) => {
  return function drawColourLayer (context: CanvasRenderingContext2D) {
    const { width, height } = context.canvas;
    context.fillStyle = hexColour;
    context.fillRect(0, 0, width, height);
  }
};
