import { BoundingBox } from './BoundingBox';
import { Sides } from './constants';
import { globalEventManager } from './EventManager';
import { Level } from './Level';
import { Vec2 } from './math';
import { Jump } from './traits/Jump';
import { Killable } from './traits/Killable';
import { Move } from './traits/Move';
import { PendulumMove } from './traits/PendulumMove';
import { Physics } from './traits/Physics';
import { PlayerController } from './traits/PlayerController';
import { Score } from './traits/Score';
import { Solid } from './traits/Solid';
import { Stomper } from './traits/Stomper';
import { TileMatch } from './types';


export class Trait {
  tasks = new Set<() => void>();
  events = globalEventManager;

  constructor(public NAME: string) {}

  update(context: Entity, deltaTime: number, level: Level) {}
  obstruct(context: Entity, side: Sides, match: TileMatch) {}
  collides(us: Entity, them: Entity) {}

  queue(task: () => void) {
    this.tasks.add(task);
  }

  finalize() {
    this.tasks.forEach(task => task());
    this.tasks.clear();
  }
}

export interface Entity {
  jump?: Jump;
  killable?: Killable;
  move?: Move;
  pendulumMove?: PendulumMove;
  physics?: Physics;
  playerController?: PlayerController;
  score?: Score;
  solid?: Solid;
  stomper?: Stomper;
}

export abstract class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  traits: Set<Trait> = new Set();
  events = globalEventManager;
  lifetime = 0;

  draw(context: CanvasRenderingContext2D) {}

  addTrait(trait: Trait) {
    this.traits.add(trait);
    this[trait.NAME] = trait;
  }

  hasTrait(name: string) {
    return this.traits.has(this[name]);
  }

  update(deltaTime: number, level: Level) {
    this.traits.forEach(trait => trait.update(this, deltaTime, level));
    this.lifetime += deltaTime;
  }

  obstruct(side: Sides, match?: TileMatch) {
    this.traits.forEach(trait => trait.obstruct(this, side, match));
  }

  collides(candidate: Entity) {
    this.traits.forEach(trait => trait.collides(this, candidate));
  }

  finalize() {
    this.traits.forEach(trait => trait.finalize());
  }
}
