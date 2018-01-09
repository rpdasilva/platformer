import { compose } from 'ramda';

// import { timer } from './core/timer';
import { drawTileRange } from './core/sprites';
import { /* FPS, */ spriteSheets } from './core/constants';
import { getContext } from './lib/canvas-helpers';
import { onSpriteSheetsRequest } from './store/spritesheets/creators';
import { store } from './store';

const main = (canvas: HTMLCanvasElement) => {
  // const connectedDrawTile = drawTile(store);
  const connectedDrawTileRange = drawTileRange(store);

  store.dispatch(onSpriteSheetsRequest(spriteSheets));

  store.subscribe(() => {
    compose(
      connectedDrawTileRange('ground', 0, 25, 12, 14),
      connectedDrawTileRange('sky', 0, 25, 0, 14),
      getContext
    )(canvas)
  });

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
