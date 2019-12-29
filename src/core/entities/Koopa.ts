import { Entity } from '../Entity';
import { loadSpritesheet } from '../loaders';
import { Spritesheet } from '../Spritesheet';
import { PendulumWalk } from '../traits/PendulumWalk';

export class Koopa extends Entity {
  walk: PendulumWalk;

  constructor(
    private sprite: Spritesheet,
    private walkAnimRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.walkAnimRouter(this), context, 0, 0, this.vel.x < 0);
  }
}

const createWalkAnimation = (sprite: Spritesheet) => {
  const runAnim = sprite.animations.get('walk');

  return (koopa: Koopa) => {
    return runAnim(koopa.lifetime);
  }
};

export const loadKoopa = () =>
  loadSpritesheet('koopa').then(createKoopaFactory);

const createKoopaFactory = (sprite: Spritesheet) => {
  const walkAnimRouter = createWalkAnimation(sprite);

  return () => {
    const koopa = new Koopa(sprite, walkAnimRouter);
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.addTrait(new PendulumWalk())

    return koopa;
  };
};