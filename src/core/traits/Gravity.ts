import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Gravity extends Trait {
  static readonly NAME = 'gravity';

  constructor() {
    super(Gravity.NAME);
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.vel.y += level.gravity * deltaTime;
  }
}
