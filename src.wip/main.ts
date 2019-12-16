import { loadImage } from './core/loaders/image';
import { tileUrls } from './core/constants';
import { getContext } from './lib/canvas';

const main = (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  console.log('main');
  loadImage(tileUrls.overworld)
    .then(image => (console.log(image), image))
    .then(image => context.drawImage(image, 0, 0))
    .catch(() => console.log('wat'));
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
