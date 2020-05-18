import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

const SPAWN_INTERVAL = 4;

export class Spawner extends Trait {
  interval = SPAWN_INTERVAL;
  coolDownTime = SPAWN_INTERVAL;
  spawners: any[] = [];

  spawn(entity: Entity, gameContext: GameContext, level: Level) {
    this.spawners.forEach(spawner => spawner(entity, gameContext, level));
  }

  update(entity: Entity, gameContext: GameContext, level: Level) {
    this.coolDownTime -= gameContext.deltaTime;

    if (this.coolDownTime <= 0) {
      this.spawn(entity, gameContext, level);
      this.coolDownTime = this.interval;
    }
  }
}
