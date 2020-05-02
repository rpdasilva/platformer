import { Sides } from '../constants';
import { Entity, Trait } from '../Entity';
import { GameContext } from '../../core/types';

export class Jump extends Trait {
  static readonly NAME = 'jump';

  enabled = 0;
  duration = 0.25;
  velocity = 200;
  boost = 0.15;
  engagedTime = 0;
  requestTime = 0;
  gracePeriod = 0.1;

  constructor() {
    super(Jump.NAME);
  }

  get falling() {
    return this.enabled < 0;
  }

  start() {
    this.requestTime = this.gracePeriod;
  }

  cancel() {
    this.engagedTime = 0;
    this.requestTime = 0;
  }

  update(entity: Entity, { deltaTime }: GameContext) {
    if (this.requestTime > 0) {
      if (this.enabled > 0) {
        this.sounds.add('jump');
        this.engagedTime = this.duration;
        this.requestTime = 0;
      }

      this.requestTime -= deltaTime;
    }

    if (this.engagedTime > 0) {
      entity.vel.y = -(this.velocity + Math.abs(entity.vel.x) * this.boost);
      this.engagedTime -= deltaTime;
    }

    this.enabled--;
  }

  obstruct(_: Entity, side: Sides) {
    if (side === Sides.BOTTOM) {
      this.enabled = 1;
    }

    if (side === Sides.TOP) {
      this.cancel();
    }
  }
}
