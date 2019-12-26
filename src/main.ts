
import { Camera } from './core/Camera';
import { createMario } from './core/entities';
import { setupKeyboard } from './core/input';
import { createCollisionLayer } from './core/layers';
import { createCameraLayer } from './core/layers';
import { loadLevel } from './core/loaders';
import { Timer } from './core/Timer';
import { getContext } from './lib/canvas';
import { debugMouseControls } from './lib/debug';

const main = (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  Promise.all([
    createMario(),
    loadLevel('1-1')
  ])
  .then(([mario, level]) => {
    const camera = new Camera();

    mario.pos.set(64, 64);

    level.comp.addLayer(createCollisionLayer(level));
    level.comp.addLayer(createCameraLayer(camera));
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo(window);

    debugMouseControls(canvas, mario, camera);

    const timer = new Timer(
      1/60,
      (deltaTime: number) => {
        level.update(deltaTime);
        level.comp.draw(context, camera);
      }
    );

    timer.start();
  });
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
