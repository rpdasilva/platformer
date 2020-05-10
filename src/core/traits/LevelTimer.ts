import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext, Nullable } from '../../core/types';

const TOTAL_TIME = 300;
const HURRY_TIME = 100;

export class LevelTimer extends Trait {
  static readonly NAME = 'levelTimer';
  static readonly EVENT_TIMER_HURRY = Symbol('timerHurry');
  static readonly EVENT_TIMER_OK = Symbol('timerOk');

  totalTime = TOTAL_TIME;
  currentTime = TOTAL_TIME;
  hurryEmitted: Nullable<boolean> = null;


  constructor() {
    super(LevelTimer.NAME);
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
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
