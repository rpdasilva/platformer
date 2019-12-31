import { Entity, Trait } from '../Entity';
import { Level } from '../Level';

export class Killable extends Trait {
  static readonly NAME = 'killable';

  dead = false;
  deadTime = 0;
  removeTime = 2;

  constructor() {
    super(Killable.NAME);
  }

  kill() {
    this.queue(() => this.dead = true);
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, deltaTime: number, level: Level) {
    if (this.dead) {
      this.deadTime += deltaTime;

      if (this.deadTime > this.removeTime) {
        this.queue(() => level.entities.delete(entity));
      }
    }
  }
}
