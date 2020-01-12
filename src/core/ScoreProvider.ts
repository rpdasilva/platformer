import { EventTypes } from './constants';
import { globalEventManager, EventManager } from './EventManager';

const STACKED_SCORE_TIME = 0.5;

export class ScoreProvider {
  lastScore = 0;
  stackedScoreTime = 0;

  constructor(private events: EventManager) {
    this.events.subscribe(EventTypes.ON_SCORE, this, ({
      score,
      stackable
    }) => {
      this.lastScore = stackable ? score : 0;
      this.stackedScoreTime = stackable ? STACKED_SCORE_TIME : 0;
    });
  }

  update(deltaTime: number) {
    if (this.stackedScoreTime) {
      this.stackedScoreTime -= deltaTime;

      if (this.stackedScoreTime <= 0) {
        this.lastScore = 0;
        this.stackedScoreTime = 0;
      }
    }
  }
}

export const scoreProvider = new ScoreProvider(globalEventManager);
