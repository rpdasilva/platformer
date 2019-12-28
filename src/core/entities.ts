import { createAnimation } from './animation';
import { Drag } from './constants';
import { Entity } from './Entity';
import { loadSpritesheet } from './loaders';
import { Spritesheet } from './Spritesheet';
import { Jump } from './traits/jump';
import { Move } from './traits/move';
import { KeyState } from './types';

export class Mario extends Entity {
  move: Move;
  jump: Jump;

  constructor(private sprite: Spritesheet) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    const flip = this.move.heading < 0;
    this.sprite.draw(routeFrame(this), context, 0, 0, flip);
  }

  turbo(enabled: KeyState) {
    this.move.dragFactor = enabled ? Drag.LOW : Drag.HIGH
  }
}

const routeFrame = (mario: Mario) => {
  const frames = ['run-1', 'run-2', 'run-3'];
  const runAnim = createAnimation(frames, 8);

  if (mario.jump.falling) {
    return 'jump';
  }
  if (mario.move.distance > 0) {
    if (
      (mario.vel.x > 0 && mario.move.dir < 0)
      || (mario.vel.x < 0 && mario.move.dir > 0)
    ) {
      return 'brake';
    }

    return runAnim(mario.move.distance);
  }
  return 'idle';
}

export const createMario = () =>
  loadSpritesheet('mario').then(sprite => {
    const mario = new Mario(sprite);
    mario.size.set(14, 16);
    mario.addTrait(new Move());
    mario.addTrait(new Jump());
    return mario;
  });
