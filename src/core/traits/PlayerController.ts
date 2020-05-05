import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';
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
  }

  setPlayer(entity: Entity) {
    this.player = entity;

    this.player.stomper.events.listen('stomp', () => {
      this.score += 100
    });
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
