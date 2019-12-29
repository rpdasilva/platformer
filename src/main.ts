import { Camera } from './core/Camera';
import { loadEntities } from './core/entities';
import { setupKeyboard } from './core/input';
import { loadLevel } from './core/loaders';
import { Timer } from './core/Timer';
import { getContext } from './lib/canvas';

import {
  createDebugCameraLayer,
  createDebugCollisionLayer
} from './lib/debug';

const main = (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  Promise.all([
    loadEntities(),
    loadLevel('1-1')
  ])
  .then(([entity, level]) => {
    const camera = new Camera();

    const mario = entity.mario();
    mario.pos.set(64, 64);

    const goomba = entity.goomba();
    goomba.pos.x = 220;

    const koopa = entity.koopa();
    koopa.pos.x = 260;

    level.entities.add(goomba);
    level.entities.add(koopa);
    level.entities.add(mario);

    level.comp.addLayers(
      createDebugCameraLayer(camera),
      createDebugCollisionLayer(level)
    );

    const input = setupKeyboard(mario);
    input.listenTo(window);

    const timer = new Timer(
      1/60,
      (deltaTime: number) => {
        level.update(deltaTime);

        if (mario.pos.x > 150) {
          camera.pos.x = mario.pos.x - 150;
        }

        level.comp.draw(context, camera);
      }
    );

    timer.start();
  });
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
