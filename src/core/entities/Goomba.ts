import { Entity, Trait } from '../Entity';
import { loadSpritesheet } from '../loaders/spritesheet';
import { Spritesheet } from '../Spritesheet';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Physics } from '../traits/Physics';
import { Score } from '../traits/Score';
import { Solid } from '../traits/Solid';

class Behaviour extends Trait {
  constructor() {
    super('behaviour');
  }

  collides(us: Goomba, them: Entity) {
    if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.stop(us);
        us.score.display(us, true);
        us.killable.kill();
      }
      else if (them.killable) {
        them.stomper.bounce(them, us);
        them.killable.kill();
      }
    }
  }

  stop(us: Goomba) {
    us.vel.x = 0;
    us.pendulumMove.enabled = false;
  }
}

export class Goomba extends Entity {
  constructor(
    private sprite: Spritesheet,
    private animationRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.animationRouter(this), context, 0, 0);
  }
}

const createAnimations = (sprite: Spritesheet) => {
  const walkAnim = sprite.animations.get('walk');

  return (goomba: Goomba) => {
    if (goomba.killable.dead) {
      return 'flat';
    }
    return walkAnim(goomba.lifetime);
  }
};


export const loadGoomba = () =>
  loadSpritesheet('goomba').then(createGoombaFactory);

const createGoombaFactory = (sprite: Spritesheet) => {
  const animationRouter = createAnimations(sprite);

  return () => {
    const goomba = new Goomba(sprite, animationRouter);
    goomba.size.set(16, 16);

    goomba.addTrait(new Physics());
    goomba.addTrait(new Solid());
    goomba.addTrait(new PendulumMove());
    goomba.addTrait(new Behaviour());
    goomba.addTrait(new Killable());
    goomba.addTrait(new Score());

    return goomba;
  };
};