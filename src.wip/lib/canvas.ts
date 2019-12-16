// Canvas Helpers
export const makeCanvas = (height?: number, width?: number) => {
  const canvas = document.createElement('canvas');
  canvas.height = height ? height : canvas.height;
  canvas.width = width ? width : canvas.width;
  return canvas;
}

export const getCanvasFromContext = (context: CanvasRenderingContext2D) =>
  context.canvas;

export const getContext = (canvas: HTMLCanvasElement, contextType = '2d') =>
  canvas.getContext(contextType) as CanvasRenderingContext2D;

// Context Helpers
export const flipContext = (width: number, scaleX: 1 | -1 = -1) =>
  (context: CanvasRenderingContext2D) => {
    const translateX = { 1: 0, '-1': scaleX * width };
    context.scale(scaleX, 1);
    context.translate(translateX[scaleX], 0);
    return context;
  }

export const drawImage = (
  image: HTMLImageElement | HTMLCanvasElement,
  ...drawImageArgs: any[]
) => (context: CanvasRenderingContext2D) => {
    (context.drawImage as any)(image, ...drawImageArgs);
    return context;
  }
