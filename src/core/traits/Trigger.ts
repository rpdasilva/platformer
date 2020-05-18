import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext } from '../types';

export class Trigger extends Trait {
  collisions = new Set<Entity>();
  conditions: ((
    entity: Entity,
    collision: Set<Entity>,
    gameContext: GameContext,
    level: Level) => void
  )[] = [];

  collides(_: Entity, them: Entity) {
    this.collisions.add(them);
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {
    if (this.collisions.size) {
      this.conditions.forEach(condition => {
        condition(entity, this.collisions, gameContext, level);
      });
      this.collisions.clear();
    }
  }
}
