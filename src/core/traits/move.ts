import { Entity, Trait } from '../Entity';

export class Move extends Trait {
  dir = 0;
  speed = 6000;
  engagedTime = 0;

  constructor() {
    super('move');
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed * this.dir * deltaTime;
  }
}
