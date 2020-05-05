import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { GameContext } from '../../core/types';

export class Player extends Trait {
  static readonly NAME = 'player';

  lives = 4;
  score = 0;

  constructor() {
    super(Player.NAME);
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    // entity.pos.x += entity.vel.x * deltaTime;
    // entity.pos.y += entity.vel.y * deltaTime;
  }
}
