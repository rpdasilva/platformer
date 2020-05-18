import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Level } from '../Level';
import { Vec2 } from '../math';
import { Killable } from './Killable';
import { GameContext } from '../../core/types';

export class PlayerController extends Trait {
  player: Entity;
  checkpoint = new Vec2(0, 0);

  setPlayer(entity: Entity) {
    this.player = entity;
  }

  update(_: Entity, _1: GameContext, level: Level) {
    if (!level.entities.has(this.player)) {
      this.player.getTrait(Killable).revive();
      this.player.pos.set(
        this.checkpoint.x,
        this.checkpoint.y
      );
      level.entities.add(this.player);
    }
  }
}
