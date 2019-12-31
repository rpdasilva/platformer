import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Vec2 } from '../math';

export class PlayerController extends Trait {
  static readonly NAME = 'playerController';

  player: Entity;
  checkpoint = new Vec2(0, 0);

  constructor() {
    super(PlayerController.NAME);
  }

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(_: Entity, _1: number, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.pos.set(
        this.checkpoint.x,
        this.checkpoint.y
      );
      level.entities.add(this.player);
    }
  }
}
