import { Entity, Trait } from '../Entity';
import { loadSpritesheet } from '../loaders/spritesheet';
import { Spritesheet } from '../Spritesheet';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { GameContext, LoadEntity } from '../types';

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behaviour extends Trait {
  state = STATE_WALKING;
  hideTime = 0;
  hideDuration = 5;
  panicSpeed = 300;

  constructor() {
    super('behaviour');
  }

  collides(us: Koopa, them: Entity) {
    if (us.killable.dead) {
      return;
    }

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      }
      else {
        this.handleKick(us, them);
      }
    }
  }

  handleKick(us: Koopa, them: Entity) {
    if (this.state === STATE_WALKING) {
      if (them.killable) {
        them.killable.kill();
      }
    }
    else if (this.state === STATE_HIDING) {
      this.panic(us, them);
    }
    else if (this.state === STATE_PANIC) {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);

      if (
        them.killable
        && travelDir
        && travelDir !== impactDir
      ) {
        them.killable.kill();
      }
    }
  }

  handleStomp(us: Koopa, them: Entity) {
    if (this.state === STATE_WALKING || this.state === STATE_PANIC) {
      this.hide(us);
    }
    else if (this.state === STATE_HIDING) {
      us.killable.kill();
      us.vel.set(100, -200);
      us.solid.obstructs = false;
    }
  }

  panic(us: Koopa, them: Entity) {
    this.state = STATE_PANIC;
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
  }

  hide(us: Koopa) {
    us.vel.x = 0;
    us.pendulumMove.enabled = false;
    this.state = STATE_HIDING;
    this.hideTime = 0;
  }

  unhide(us: Koopa) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.reset();
    this.state = STATE_WALKING;
  }

  update(us: Koopa, { deltaTime }: GameContext) {
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime;

      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    }
  }
}

export class Koopa extends Entity {
  behaviour: Behaviour;

  constructor(
    private sprite: Spritesheet,
    private animationRouter: (entity: Entity) => string
  ) {
    super();
  }

  draw(context: CanvasRenderingContext2D) {
    this.sprite.draw(
      this.animationRouter(this),
      context,
      0,
      0,
      this.vel.x < 0
    );
  }
}

const createAnimations = (sprite: Spritesheet) => {
  const walkAnim = sprite.animations.get('walk');
  const wakeAnim = sprite.animations.get('wake');

  return (koopa: Koopa) => {
    if (
      koopa.behaviour.state === STATE_HIDING
      && koopa.behaviour.hideTime > 3
    ) {
      return wakeAnim(koopa.lifetime);
    }
    else if (
      koopa.behaviour.state === STATE_HIDING
      || koopa.behaviour.state === STATE_PANIC
    ) {
      return 'hiding';
    }

    return walkAnim(koopa.lifetime);
  }
};

export const loadKoopa: LoadEntity = () =>
  loadSpritesheet('koopa').then(createKoopaFactory);

const createKoopaFactory = (sprite: Spritesheet) => {
  const animationRouter = createAnimations(sprite);

  return () => {
    const koopa = new Koopa(sprite, animationRouter);
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.addTrait(new Physics());
    koopa.addTrait(new Solid());
    koopa.addTrait(new PendulumMove());
    koopa.addTrait(new Killable());
    koopa.addTrait(new Behaviour());

    return koopa;
  };
};