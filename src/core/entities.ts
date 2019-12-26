import { Entity } from './Entity';
import { loadMarioSprite } from './loaders';
import { Spritesheet } from './Spritesheet';
import { Jump } from './traits/jump';
import { Move } from './traits/move';
import { Velocity } from './traits/velocity';

export class Mario extends Entity {
  move: Move;
  jump: Jump;
  velocity: Velocity;

  constructor(private sprite: Spritesheet) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw('idle', context, this.pos.x, this.pos.y);
  }

}

export const createMario = () =>
  loadMarioSprite().then(sprite => {
    const mario = new Mario(sprite);
    mario.size.set(14, 16);
    mario.addTrait(new Move());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());
    return mario;
  });
