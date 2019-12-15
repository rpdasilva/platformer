import { getContext } from './lib/canvas';

const main = (canvas: HTMLCanvasElement) => {
  getContext(canvas).fillRect(0, 0, 50, 50);
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
