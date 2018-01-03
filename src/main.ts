import { timer } from './core/timer';
import { drawTile } from './core/sprites';
import { FPS, spriteSheetUrls } from './core/constants';
import { getContext, drawImage } from './lib/canvas-helpers';
import { onSpriteSheetRequest } from './store/spritesheets/creators';
import { getTile } from './store/spritesheets/selectors';
import { store } from './store';
import { pipe } from './lib/function-helpers';

const main = (canvas: HTMLCanvasElement) => {
  const connectedDrawTile = drawTile(store);
  store.dispatch(onSpriteSheetRequest('overworld'));

  store.subscribe(() => {
    pipe(
      getContext,
      connectedDrawTile('ground', 10, 10)
    )(canvas)
  });

  // loadImage(tileUrl)
  //   .then(image => defineSpriteSheet(image, 16, 16))
  //   .then(defineTile => defineTile('ground', 0, 0))
  //   .then(onTileDefined)
  //   .then(store.dispatch);

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
