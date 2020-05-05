import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

const SPAWN_INTERVAL = 4;

export class Spawner extends Trait {
  static readonly NAME = 'spawner';

  interval = SPAWN_INTERVAL;
  coolDownTime = SPAWN_INTERVAL;
  spawners: any[] = [];

  constructor() {
    super(Spawner.NAME);
  }

  spawn(entity: Entity, level: Level) {
    this.spawners.forEach(spawner => spawner(entity, level));
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    this.coolDownTime -= deltaTime;

    if (this.coolDownTime <= 0) {
      this.spawn(entity, level);
      this.coolDownTime = this.interval;
    }
  }
}
