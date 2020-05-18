import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Physics extends Trait {
  update(entity: Entity, gameContext: GameContext, level: Level) {
    const { deltaTime } = gameContext;
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider.checkX(entity, gameContext, level);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider.checkY(entity, gameContext, level);

    entity.vel.y += level.gravity * deltaTime;
  }
}
