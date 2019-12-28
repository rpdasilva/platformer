import { Drag } from '../constants';
import { Entity, Trait } from '../Entity';
import { Mario } from '../entities';

export class Move extends Trait {
  dir = 0;
  acceleration = 400;
  deceleration = 300;
  dragFactor = Drag.HIGH;
  engagedTime = 0;
  distance = 0;
  heading = 1;

  constructor() {
    super('move');
  }

  update(entity: (Entity & Mario), deltaTime: number) {
    const absX = Math.abs(entity.vel.x);

    if (this.dir !== 0) {
      entity.vel.x += this.acceleration * deltaTime * this.dir;

      if (entity.jump) {
        if (!entity.jump.falling) {
          this.heading = this.dir;
        }
      } else {
        this.heading = this.dir;
      }
    } else if (entity.vel.x !== 0) {
      const deceleration = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -deceleration : deceleration;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * absX;
    entity.vel.x -= drag;
    this.distance += absX * deltaTime;
  }
}
