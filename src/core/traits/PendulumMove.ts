import { Sides } from '../constants';
import { Entity, Trait } from '../Entity';

const INITIAL_SPEED = -30;

export class PendulumMove extends Trait {
  static readonly NAME = 'pendulumMove';

  speed = INITIAL_SPEED;
  enabled = true;

  constructor() {
    super(PendulumMove.NAME);
  }

  update(entity: Entity, deltaTime: number) {
    if (this.enabled) {
      entity.vel.x = this.speed;
    }
  }

  obstruct(_: Entity, side: Sides) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  reset() {
    this.speed = INITIAL_SPEED;
  }
}
