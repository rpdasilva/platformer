import { Sides } from '../constants';
import { Entity, Trait } from '../Entity';

export class PendulumWalk extends Trait {
  speed = -30;

  constructor() {
    super('pendulumWalk');
  }

  update(entity: Entity, deltaTime: number) {
    entity.vel.x = this.speed;
  }

  obstruct(_: Entity, side: string) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }
}
