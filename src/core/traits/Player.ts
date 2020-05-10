import { Entity, Trait } from '../Entity';
import { Level } from '../Level';
import { Stomper } from '../traits/Stomper';
import { GameContext } from '../../core/types';

export class Player extends Trait {
  static readonly NAME = 'player';

  name: string;
  coins = 0;
  lives = 4;
  score = 0;

  constructor(name = 'MARIO') {
    super(Player.NAME);
    this.name = name;

    this.listen(Stomper.EVENT_STOMP, () => this.score += 100);
  }

  update(entity: Entity, { deltaTime }: GameContext, level: Level) {
    // entity.pos.x += entity.vel.x * deltaTime;
    // entity.pos.y += entity.vel.y * deltaTime;
  }
}
