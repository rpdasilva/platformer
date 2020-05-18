import { Sides } from '../constants';
import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { GameContext } from '../../core/types';

const INITIAL_SPEED = -30;

export class PendulumMove extends Trait {
  speed = INITIAL_SPEED;
  enabled = true;

  update(entity: Entity, { deltaTime }: GameContext) {
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
