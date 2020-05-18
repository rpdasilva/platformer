import { Entity } from '../Entity';
import { Trait } from '../Trait';
import { loadSpritesheet } from '../loaders/spriteSheet';
import { SpriteSheet } from '../SpriteSheet';
import { Killable } from '../traits/Killable';
import { PendulumMove } from '../traits/PendulumMove';
import { Physics } from '../traits/Physics';
import { Solid } from '../traits/Solid';
import { Stomper } from '../traits/Stomper';
import { GameContext, LoadEntity } from '../types';

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behaviour extends Trait {
  state = STATE_WALKING;
  hideTime = 0;
  hideDuration = 5;
  panicSpeed = 300;

  collides(us: Koopa, them: Entity) {
    if (us.getTrait(Killable).dead) {
      return;
    }

    if (them.hasTrait(Stomper)) {
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
      if (them.hasTrait(Killable)) {
        them.getTrait(Killable).kill();
      }
    }
    else if (this.state === STATE_HIDING) {
      this.panic(us, them);
    }
    else if (this.state === STATE_PANIC) {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);

      if (
        them.hasTrait(Killable)
        && travelDir
        && travelDir !== impactDir
      ) {
        them.getTrait(Killable).kill();
      }
    }
  }

  handleStomp(us: Koopa, them: Entity) {
    if (this.state === STATE_WALKING || this.state === STATE_PANIC) {
      this.hide(us);
    }
    else if (this.state === STATE_HIDING) {
      us.getTrait(Killable).kill();
      us.vel.set(100, -200);
      us.getTrait(Solid).obstructs = false;
    }
  }

  panic(us: Koopa, them: Entity) {
    const pendulumMoveTrait = us.getTrait(PendulumMove);
    this.state = STATE_PANIC;
    pendulumMoveTrait.enabled = true;
    pendulumMoveTrait.speed = this.panicSpeed * Math.sign(them.vel.x);
  }

  hide(us: Koopa) {
    const pendulumMoveTrait = us.getTrait(PendulumMove);
    us.vel.x = 0;
    pendulumMoveTrait.enabled = false;
    this.state = STATE_HIDING;
    this.hideTime = 0;
  }

  unhide(us: Koopa) {
    const pendulumMoveTrait = us.getTrait(PendulumMove);
    pendulumMoveTrait.enabled = true;
    pendulumMoveTrait.reset();
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
    private sprite: SpriteSheet,
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

const createAnimations = (sprite: SpriteSheet) => {
  const walkAnim = sprite.animations.get('walk');
  const wakeAnim = sprite.animations.get('wake');

  return (koopa: Koopa) => {
    const behaviourTrait = koopa.getTrait(Behaviour);
    if (
      behaviourTrait.state === STATE_HIDING
      && behaviourTrait.hideTime > 3
    ) {
      return wakeAnim(koopa.lifetime);
    }
    else if (
      behaviourTrait.state === STATE_HIDING
      || behaviourTrait.state === STATE_PANIC
    ) {
      return 'hiding';
    }

    return walkAnim(koopa.lifetime);
  }
};

export const loadKoopa: LoadEntity = () =>
  loadSpritesheet('koopa').then(createKoopaFactory);

const createKoopaFactory = (sprite: SpriteSheet) => {
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