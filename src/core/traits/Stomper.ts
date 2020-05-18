import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { Killable } from './Killable';

export class Stomper extends Trait {
  static readonly NAME = 'stomper';
  static readonly EVENT_STOMP = Symbol('Stomp');

  bounceSpeed = 250;

  bounce(us: Entity, them: Entity) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  collides(us: Entity, them: Entity) {
    const killableTrait = them.getTrait(Killable);
    if (!killableTrait || killableTrait.dead) {
      return;
    }

    if (us.vel.y > them.vel.y) {
      this.queue(() => this.bounce(us, them));
      us.sounds.add('stomp');
      us.events.emit(Stomper.EVENT_STOMP, us, them);
    }
  }
}
