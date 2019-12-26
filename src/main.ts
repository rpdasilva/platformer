
import { loadLevel } from './core/loaders';
import { createMario } from './core/entities';
import { Timer } from './core/Timer';
import { getContext } from './lib/canvas';
import { setupKeyboard } from './core/input';
import { createCollisionLayer } from './core/layers';

const main = (canvas: HTMLCanvasElement) => {
  const context = getContext(canvas);

  Promise.all([
    createMario(),
    loadLevel('1-1')
  ])
  .then(([mario, level]) => {
      mario.pos.set(64, 64);

      level.comp.addLayer(createCollisionLayer(level));
      level.entities.add(mario);

      const input = setupKeyboard(mario);
      input.listenTo(window);

      ['mousedown', 'mousemove'].forEach(type => {
        canvas.addEventListener(type, (event: MouseEvent) => {
          if (event.buttons === 1) {
            mario.vel.set(0, 0);
            mario.pos.set(event.offsetX, event.offsetY);
          }
        });
      });

      const timer = new Timer(
        1/60,
        (deltaTime: number) => {
          level.update(deltaTime);
          level.comp.draw(context);
        }
      );

      timer.start();
    })
};

const canvas = document.getElementById('screen') as HTMLCanvasElement;
main(canvas);
