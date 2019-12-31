import { Drag } from '../constants';
import { Entity } from '../Entity';
import { loadSpritesheet } from '../loaders';
import { Spritesheet } from '../Spritesheet';
import { Jump } from '../traits/Jump';
import { Killable } from '../traits/Killable';
import { Move } from '../traits/Move';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Stomper } from '../traits/Stomper';
import { KeyState } from '../types';

export class Mario extends Entity {
  constructor(
    private sprite: Spritesheet,
    private runAnimRouter: (entity: Mario) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    const flip = this.move.heading < 0;
    this.sprite.draw(this.runAnimRouter(this), context, 0, 0, flip);
  }

  turbo(enabled: KeyState) {
    this.move.dragFactor = enabled ? Drag.LOW : Drag.HIGH
  }
}

const createRunAnimation = (sprite: Spritesheet) => {
  const runAnim = sprite.animations.get('run');

  return (mario: Mario) => {
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
};

export const loadMario = () =>
  loadSpritesheet('mario').then(createMarioFactory);

const createMarioFactory = (sprite: Spritesheet) => {
  const runAnimRouter = createRunAnimation(sprite);

  return () => {
    const mario = new Mario(sprite, runAnimRouter);
    mario.size.set(14, 16);
    mario.addTrait(new Physics());
    mario.addTrait(new Solid());
    mario.addTrait(new Move());
    mario.addTrait(new Jump());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());

    mario.killable.removeTime = 0.3;
    mario.vel.y = -3;

    return mario;
  };
};