import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { loadSpritesheet } from '../loaders/spriteSheet';
import { SpriteSheet } from '../SpriteSheet';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Stomper } from '../traits/Stomper';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { LoadEntity } from '../types';

class Behaviour extends Trait {
  collides(us: Goomba, them: Entity) {
    const killableTrait = us.getTrait(Killable);
    if (killableTrait.dead) {
      return;
    }

    if (them.hasTrait(Stomper)) {
      if (them.vel.y > us.vel.y) {
        this.stop(us);
        killableTrait.kill();
      }
      else if (them.hasTrait(Killable)) {
        them.getTrait(Stomper).bounce(them, us);
        them.getTrait(Killable).kill();
      }
    }
  }

  stop(us: Goomba) {
    us.vel.x = 0;
    us.getTrait(PendulumMove).enabled = false;
  }
}

export class Goomba extends Entity {
  constructor(
    private sprite: SpriteSheet,
    private animationRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.animationRouter(this), context, 0, 0);
  }
}

const createAnimations = (sprite: SpriteSheet) => {
  const walkAnim = sprite.animations.get('walk');

  return (goomba: Goomba) => {
    if (goomba.getTrait(Killable).dead) {
      return 'flat';
    }
    return walkAnim(goomba.lifetime);
  }
};


export const loadGoomba: LoadEntity = () =>
  loadSpritesheet('goomba').then(createGoombaFactory);

const createGoombaFactory = (sprite: SpriteSheet) => {
  const animationRouter = createAnimations(sprite);

  return () => {
    const goomba = new Goomba(sprite, animationRouter);
    goomba.size.set(16, 16);

    goomba.addTrait(new Physics());
    goomba.addTrait(new Solid());
    goomba.addTrait(new PendulumMove());
    goomba.addTrait(new Behaviour());
    goomba.addTrait(new Killable());

    return goomba;
  };
};