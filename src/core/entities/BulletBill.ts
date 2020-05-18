import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { loadSpritesheet } from '../loaders/spriteSheet';
import { SpriteSheet } from '../SpriteSheet';
import { Gravity } from '../traits/Gravity';
import { Killable } from '../traits/Killable';
import { Stomper } from '../traits/Stomper';
import { Velocity } from '../traits/Velocity';
import { LoadEntity, GameContext } from '../types';

class Behaviour extends Trait {
  private gravity = new Gravity();

  collides(us: BulletBill, them: Entity) {
    const killableTrait = us.getTrait(Killable);
    if (killableTrait.dead) {
      return;
    }

    if (them.hasTrait(Stomper)) {
      if (them.vel.y > us.vel.y) {
        this.stop(us);
        killableTrait.kill();
        us.vel.set(100, -200);
      }
      else if (them.hasTrait(Killable)) {
        them.getTrait(Stomper).bounce(them, us);
        them.getTrait(Killable).kill();
      }
    }
  }

  stop(us: BulletBill) {
    us.vel.x = 0;
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {
    if (entity.getTrait(Killable).dead) {
      this.gravity.update(entity, gameContext, level);
    }
  }
}

export class BulletBill extends Entity {
  constructor(
    private sprite: SpriteSheet,
    private animationRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.animationRouter(this), context, 0, 0, this.vel.x < 0);
  }
}

const createAnimations = (_: SpriteSheet) => {
  return (_: BulletBill) => 'bullet';
};


export const loadBulletBill: LoadEntity = () =>
  loadSpritesheet('bulletBill').then(createBulletBillFactory);

const createBulletBillFactory = (sprite: SpriteSheet) => {
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