import { Trait } from '../Trait';
import { Stomper } from '../traits/Stomper';

const COIN_THRESHOLD = 100;

export class Player extends Trait {
  name: string;
  coins = 0;
  lives = 4;
  score = 0;

  constructor() {
    super();
    this.listen(Stomper.EVENT_STOMP, () => this.score += 100);
  }

  addCoins(count: number) {
    this.coins += count;
    this.queue(entity => entity.sounds.add('coin'));

    if (this.coins >= COIN_THRESHOLD) {
      const lives = Math.floor(this.coins / COIN_THRESHOLD);
      this.addLives(lives);
      this.coins = this.coins % COIN_THRESHOLD;
    }
  }

  addLives(count: number) {
    this.lives += count;
  }
}
