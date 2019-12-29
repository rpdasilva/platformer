import { Entity } from '../Entity';
import { loadSpritesheet } from '../loaders';
import { Spritesheet } from '../Spritesheet';
import { PendulumWalk } from '../traits/PendulumWalk';

export class Goomba extends Entity {
  walk: PendulumWalk;

  constructor(
    private sprite: Spritesheet,
    private walkAnimRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(this.walkAnimRouter(this), context, 0, 0);
  }
}

const createWalkAnimation = (sprite: Spritesheet) => {
  const runAnim = sprite.animations.get('walk');

  return (goomba: Goomba) => {
    return runAnim(goomba.lifetime);
  }
};

export const loadGoomba = () =>
  loadSpritesheet('goomba').then(createGoombaFactory);

const createGoombaFactory = (sprite: Spritesheet) => {
  const walkAnimRouter = createWalkAnimation(sprite);

  return () => {
    const goomba = new Goomba(sprite, walkAnimRouter);
    goomba.size.set(16, 16);
    goomba.addTrait(new PendulumWalk());

    return goomba;
  };
};