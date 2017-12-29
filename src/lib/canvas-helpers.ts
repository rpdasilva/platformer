// Canvas Helpers
export const makeCanvas = (height?: number, width?: number) => {
  const canvas = document.createElement('canvas');
  canvas.height = height ? height : canvas.height;
  canvas.width = width ? width : canvas.width;
  return canvas;
}

export const getContext = (canvas: HTMLCanvasElement, contextType = '2d') =>
  canvas.getContext(contextType) as CanvasRenderingContext2D;

// Context Helpers
export const flipContext = (width: number, scaleY: 1 | -1 = -1) =>
  (context: CanvasRenderingContext2D) => {
    context.scale(scaleY, 1);
    context.translate(scaleY * width, 0);
    return context;
  }

export const drawImage = (image: HTMLImageElement, ...drawImageArgs: any[]) =>
  (context: CanvasRenderingContext2D) => {
    (context.drawImage as any)(image, ...drawImageArgs);
    return context;
  }
