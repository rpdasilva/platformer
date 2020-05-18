import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { GameContext, Nullable } from '../../core/types';

const TOTAL_TIME = 300;
const HURRY_TIME = 100;

export class LevelTimer extends Trait {
  static readonly EVENT_TIMER_HURRY = Symbol('Timer Hurry');
  static readonly EVENT_TIMER_OK = Symbol('Timer OK');

  totalTime = TOTAL_TIME;
  currentTime = TOTAL_TIME;
  hurryEmitted: Nullable<boolean> = null;

  update(_: Entity, { deltaTime }: GameContext, level: Level) {
    this.currentTime -= deltaTime * 2;

    if (this.hurryEmitted !== true && this.currentTime < HURRY_TIME) {
      level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
      this.hurryEmitted = true;
    }

    if (this.hurryEmitted !== false && this.currentTime > HURRY_TIME) {
      level.events.emit(LevelTimer.EVENT_TIMER_OK);
      this.hurryEmitted = false;
    }
  }
}
