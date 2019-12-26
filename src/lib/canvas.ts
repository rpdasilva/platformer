export const createBuffer = (width = 0, height = 0) => {
  const buffer = document.createElement('canvas');
  buffer.width = width;
  buffer.height = height;
  return buffer;
}

export const getContext = (canvas: HTMLCanvasElement) =>
  canvas.getContext('2d');
