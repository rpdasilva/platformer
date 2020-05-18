import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Killable extends Trait {
  dead = false;
  deadTime = 0;
  removeTime = 2;

  kill() {
    this.queue(() => this.dead = true);
  }

  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    if (this.dead) {
      this.deadTime += deltaTime;

      if (this.deadTime > this.removeTime) {
        this.queue(() => level.entities.delete(entity));
      }
    }
  }
}
