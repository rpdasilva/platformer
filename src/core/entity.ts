import { BoundingBox } from './BoundingBox';
import { Sides } from './constants';
import { Level } from './Level';
import { Vec2 } from './math';
import { Gravity } from './traits/Gravity';
import { Jump } from './traits/Jump';
import { Killable } from './traits/Killable';
import { Move } from './traits/Move';
import { PendulumMove } from './traits/PendulumMove';
import { Physics } from './traits/Physics';
import { Player } from './traits/Player';
import { PlayerController } from './traits/PlayerController';
import { Solid } from './traits/Solid';
import { Spawner } from './traits/Spawner';
import { Stomper } from './traits/Stomper';
import { Velocity } from './traits/Velocity';
import { TileMatch, GameContext } from './types';
import { AudioBoard } from './AudioBoard';
import { EventEmitter } from './EventEmitter';

export class Trait {
  tasks = new Set<() => void>();
  events = new EventEmitter();

  constructor(public NAME: string) {}

  update(context: Entity, gameContext: GameContext, level: Level) {}
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
  gravity?: Gravity;
  jump?: Jump;
  killable?: Killable;
  move?: Move;
  pendulumMove?: PendulumMove;
  physics?: Physics;
  player?: Player;
  playerController?: PlayerController;
  solid?: Solid;
  spawner?: Spawner;
  stomper?: Stomper;
  velocity?: Velocity;
}

export abstract class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  traits: Set<Trait> = new Set();
  lifetime = 0;
  audioBoard = new AudioBoard();
  sounds = new Set<string>();

  draw(context: CanvasRenderingContext2D) {}

  addTrait(trait: Trait) {
    this.traits.add(trait);
    this[trait.NAME] = trait;
  }

  hasTrait(name: string) {
    return this.traits.has(this[name]);
  }

  update(gameContext: GameContext, level: Level) {
    this.traits.forEach(trait => {
      trait.update(this, gameContext, level);
    });

    this.playSounds(this.audioBoard, gameContext.audioContext);
    this.lifetime += gameContext.deltaTime;
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

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach(sound => audioBoard.play(sound, audioContext));
    this.sounds.clear();
  }
}
