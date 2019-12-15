export const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}
