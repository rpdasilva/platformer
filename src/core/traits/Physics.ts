import { Entity, Trait } from '../Entity';
import { Level } from '../Level';

export class Physics extends Trait {
  static readonly NAME = 'physics';

  constructor() {
    super(Physics.NAME);
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider.checkY(entity);

    entity.vel.y += level.gravity * deltaTime;
  }
}
