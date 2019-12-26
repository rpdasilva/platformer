import { Entity, Trait } from '../Entity';

export class Jump extends Trait {
  duration = 0.5;
  velocity = 200;
  engagedTime = 0;

  constructor() {
    super('jump');
  }

  start() {
    this.engagedTime = this.duration;
  }

  cancel() {
    this.engagedTime = 0;
  }

  update(entity: Entity, deltaTime: number) {
    if (this.engagedTime > 0) {
      entity.vel.y = -this.velocity;
      this.engagedTime -= deltaTime;
    }
  }
}
