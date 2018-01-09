// import { compose } from 'ramda';

// import { timer } from './core/timer';
// import { drawTileRange } from './core/sprites';
// import { FPS } from './core/constants';
import { getContext } from './lib/canvas-helpers';
import { onLevelDraw } from './store/levels/creators';
import { getLevel } from './store/levels/selectors';
import { onSpriteSheetsRequest } from './store/spritesheets/creators';
import { dispatch, select, store } from './store';

const main = (canvas: HTMLCanvasElement) => {
  store.dispatch(onSpriteSheetsRequest());

  store.subscribe(() => {
    const context = getContext(canvas);

    if (select(getLevel('1-1'))) {
      store.dispatch(onLevelDraw('1-1', context));
    }

    // compose(
    //   drawTileRange('ground', 0, 25, 12, 14),
    //   drawTileRange('sky', 0, 25, 0, 14),
    //   getContext
    // )(canvas);
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
