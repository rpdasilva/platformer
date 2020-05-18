import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Velocity extends Trait {
  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
