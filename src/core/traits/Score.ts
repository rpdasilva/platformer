import { EventTypes } from '../constants';
import { Trait, Entity } from '../Entity';
import { scoreProvider } from '../ScoreProvider';
import { Font } from '../Font';
import { Level } from '../Level';

class ScoreDisplay extends Entity {
  displayTime = 0.5;

  constructor(private value: number, private font: Font) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.font.print(this.value.toString(), context, 0, 0, 0.75);
  }
}

export class Score extends Trait {
  static readonly NAME = 'score';

  value = this.initialValue;
  scoreDisplays = new Set<ScoreDisplay>();
  level: Level;

  constructor(private initialValue = 100) {
    super(Score.NAME);
  }

  update(_: Entity, deltaTime: number, level: Level) {
    if (!this.level) {
      this.level = level;
    }

    this.scoreDisplays.forEach(scoreDisplay => {
      scoreDisplay.pos.y -= 50 * deltaTime;
      scoreDisplay.displayTime -= deltaTime;

      if (scoreDisplay.displayTime <= 0) {
        this.scoreDisplays.delete(scoreDisplay);
        level.entities.delete(scoreDisplay);
      }
    });
  }

  display(entity: Entity, stackable = false) {
    const stackedScore = this.value + scoreProvider.lastScore;
    const scoreDisplay = new ScoreDisplay(stackedScore, this.level.font);
    scoreDisplay.pos.set(entity.pos.x, entity.pos.y);

    this.scoreDisplays.add(scoreDisplay);
    this.level.entities.add(scoreDisplay);

    this.events.publish(EventTypes.ON_SCORE, {
      score: stackedScore,
      stackable
    });
  }

  reset() {
    this.value = this.initialValue;
  }
}
