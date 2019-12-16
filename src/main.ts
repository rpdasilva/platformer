
import { loadLevel, loadBackgroundSprites } from './core/loaders';
import { Compositor } from './core/compositor';
import { createBackgroundLayer, createSpriteLayer } from './core/layers';
import { createMario } from './core/entities';
import { Timer } from './core/timer';
import { getContext } from './lib/canvas';

const main = (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
  ])
  .then(([mario, backgroundSprites, level]) => {
      const compositor = new Compositor();
      const backgroundLayer = createBackgroundLayer(
        level.backgrounds,
        backgroundSprites
      );

      compositor.addLayer(backgroundLayer);
      mario.position.set(64, 180);
      mario.velocity.set(200, -600);

      const spriteLayer = createSpriteLayer(mario);
      compositor.addLayer(spriteLayer);

      const gravity = 30;
      const timer = new Timer(
        1/60,
        (deltaTime: number) => {
          compositor.draw(context);
          mario.update(deltaTime);
          mario.velocity.y += gravity;
        }
      );

      timer.start();
    })
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
