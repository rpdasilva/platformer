import { Camera } from './core/Camera';
import { loadEntities } from './core/entities';
import { setupKeyboard } from './core/input';
import { createLevelLoader } from './core/loaders';
import { Timer } from './core/Timer';
import { getContext } from './lib/canvas';

import {
  createDebugCameraLayer,
  createDebugCollisionLayer
} from './lib/debug';


const main = async (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  const entityFactory = await loadEntities();
  const loadLevel = createLevelLoader(entityFactory);
  const level = await loadLevel('1-1');

  const camera = new Camera();

  const mario = entityFactory.mario();
  mario.pos.set(64, 64);
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
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
