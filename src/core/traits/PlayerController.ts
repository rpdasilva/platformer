import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';
import { Stomper } from './Stomper';
import { GameContext } from '../../core/types';

const DEFAULT_TIME = 300;

export class PlayerController extends Trait {
  static readonly NAME = 'playerController';

  player: Entity;
  checkpoint = new Vec2(0, 0);
  time = DEFAULT_TIME;
  score = 0;

  constructor() {
    super(PlayerController.NAME);

    this.listen(Stomper.EVENT_STOMP, () => {
      this.score += 100
    });
  }

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(_: Entity, { deltaTime }: GameContext, level: Level) {
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
  }
}
