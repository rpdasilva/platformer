import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../types';

export class Trigger extends Trait {
  static readonly NAME = 'trigger';

  collisions = new Set<Entity>();
  conditions: ((
    entity: Entity,
    collision: Set<Entity>,
    gameContext: GameContext,
    level: Level) => void
  )[] = [];

  constructor() {
    super(Trigger.NAME);
  }

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
