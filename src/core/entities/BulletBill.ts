import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { loadSpritesheet } from '../loaders/spritesheet';
import { Spritesheet } from '../Spritesheet';
import { Killable } from '../traits/Killable';
import { Gravity } from '../traits/Gravity';
import { Velocity } from '../traits/Velocity';
import { LoadEntity, GameContext } from '../types';

class Behaviour extends Trait {
  private gravity = new Gravity();

  constructor() {
    super('behaviour');
  }

  collides(us: BulletBill, them: Entity) {
    if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.stop(us);
        us.killable.kill();
        us.vel.set(100, -200);
      }
      else if (them.killable) {
        them.stomper.bounce(them, us);
        them.killable.kill();
      }
    }
  }

  stop(us: BulletBill) {
    us.vel.x = 0;
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {
    if (entity.killable.dead) {
      this.gravity.update(entity, gameContext, level);
    }
  }
}

export class BulletBill extends Entity {
  constructor(
    private sprite: Spritesheet,
    private animationRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.animationRouter(this), context, 0, 0, this.vel.x < 0);
  }
}

const createAnimations = (_: Spritesheet) => {
  return (_: BulletBill) => 'bullet';
};


export const loadBulletBill: LoadEntity = () =>
  loadSpritesheet('bulletBill').then(createBulletBillFactory);

const createBulletBillFactory = (sprite: Spritesheet) => {
  const animationRouter = createAnimations(sprite);

  return () => {
    const bulletBill = new BulletBill(sprite, animationRouter);
    bulletBill.size.set(16, 14);

    bulletBill.addTrait(new Velocity());
    bulletBill.addTrait(new Behaviour());
    bulletBill.addTrait(new Killable());

    return bulletBill;
  };
};