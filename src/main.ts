import { timer } from './core/timer';
import { defineSpriteSheet } from './core/sprites';
import { FPS, tileUrl } from './core/constants';
import { getContext, drawImage } from './lib/canvas-helpers';
import { onTileDefined } from './store/spritesheets/creators';
import { store } from './store';
import { pipe } from './lib/function-helpers';

const main = (canvas: HTMLCanvasElement) => {
  store.dispatch(onSpriteSheetRequest(tileUrl))

  loadImage(tileUrl)
    .then(image => defineSpriteSheet(image, 16, 16))
    .then(defineTile => defineTile('ground', 0, 0))
    .then(onTileDefined)
    .then(store.dispatch);

  // .then(() => {

  //   pipe(
  //     getContext,
  //     drawImage(image, 0, 0, 16, 16, 0, 0, 16, 16)
  //   )(canvas)


  // });
  // let x = 0;
  // let y = 0;

  // const stop = timer(deltaTime => {
  //   context.strokeStyle = 'red';
  //   context.beginPath();
  //   context.rect(
  //       x += 10, y += 10,
  //       10, 10);
  //   context.stroke();
  // }, FPS);

  // setTimeout(stop, 100);
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
