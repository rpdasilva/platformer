import { Drag } from '../constants';
import { Entity } from '../Entity';
import { loadAudioBoard } from '../loaders/sound';
import { loadSpritesheet } from '../loaders/spriteSheet';
import { SpriteSheet } from '../SpriteSheet';
import { Jump } from '../traits/Jump';
import { Killable } from '../traits/Killable';
import { Move } from '../traits/Move';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Stomper } from '../traits/Stomper';
import { KeyState, LoadEntity } from '../types';
import { AudioBoard } from '../AudioBoard';

export class Mario extends Entity {
  constructor(
    private sprite: SpriteSheet,
    private runAnimRouter: (entity: Mario) => string,
    public audioBoard: AudioBoard
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    const moveTrait = this.getTrait(Move);
    const flip = moveTrait.heading < 0;
    this.sprite.draw(this.runAnimRouter(this), context, 0, 0, flip);
  }

  turbo(enabled: KeyState) {
    const moveTrait = this.getTrait(Move);
    moveTrait.dragFactor = enabled ? Drag.LOW : Drag.HIGH
  }
}

const createRunAnimation = (sprite: SpriteSheet) => {
  const runAnim = sprite.animations.get('run');

  return (mario: Mario) => {
    const jumpTrait = mario.getTrait(Jump);
    if (jumpTrait.falling) {
      return 'jump';
    }

    const moveTrait = mario.getTrait(Move);
    if (moveTrait.distance > 0) {
      if (
        (mario.vel.x > 0 && moveTrait.dir < 0)
        || (mario.vel.x < 0 && moveTrait.dir > 0)
      ) {
        return 'brake';
      }

      return runAnim(moveTrait.distance);
    }
    return 'idle';
  }
};

export const loadMario: LoadEntity = (audioContext: AudioContext) => {
  return Promise.all([
      loadSpritesheet('mario'),
      loadAudioBoard('mario', audioContext)
    ])
    .then(([spriteSheet, audioBoard]) => createMarioFactory(spriteSheet, audioBoard));
}

const createMarioFactory = (sprite: SpriteSheet, audioBoard: AudioBoard) => {
  const runAnimRouter = createRunAnimation(sprite);

  return () => {
    const mario = new Mario(sprite, runAnimRouter, audioBoard);
    mario.size.set(14, 16);
    mario.addTrait(new Physics());
    mario.addTrait(new Solid());
    mario.addTrait(new Move());
    mario.addTrait(new Jump());
    mario.addTrait(new Stomper());
    mario.addTrait(new Killable());

    mario.getTrait(Killable).removeTime = 0.3;
    mario.vel.y = -3;

    return mario;
  };
};