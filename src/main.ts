import { timer } from './core/timer';
import { drawTile } from './core/sprites';
import { FPS, spriteSheetUrls } from './core/constants';
import { getContext, drawImage } from './lib/canvas-helpers';
import { onSpriteSheetRequest } from './store/spritesheets/creators';
import { getTile } from './store/spritesheets/selectors';
import { store } from './store';
import { compose } from './lib/function-helpers';

const main = (canvas: HTMLCanvasElement) => {
  const connectedDrawTile = drawTile(store);
  store.dispatch(onSpriteSheetRequest('overworld'));

  store.subscribe(() => {
    compose(
      connectedDrawTile('ground', 2, 2),
      getContext
    )(canvas)
  });

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
