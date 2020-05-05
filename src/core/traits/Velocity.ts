import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Velocity extends Trait {
  static readonly NAME = 'velocity';

  constructor() {
    super(Velocity.NAME);
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
