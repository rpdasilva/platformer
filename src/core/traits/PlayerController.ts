import { EventTypes } from '../constants';
import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';
import { scoreProvider } from '../ScoreProvider';

const DEFAULT_TIME = 300;

export class PlayerController extends Trait {
  static readonly NAME = 'playerController';

  player: Entity;
  checkpoint = new Vec2(0, 0);
  time = DEFAULT_TIME;
  score = 0;

  constructor() {
    super(PlayerController.NAME);

    this.events.subscribe(EventTypes.ON_SCORE, this, ({ score = 0 }) =>
      this.score += score
    );
  }

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(_: Entity, deltaTime: number, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.pos.set(
        this.checkpoint.x,
        this.checkpoint.y
      );
      level.entities.add(this.player);
      this.time = DEFAULT_TIME;
    } else {
      this.time -= deltaTime * 2;
    }

    scoreProvider.update(deltaTime);
  }
}
