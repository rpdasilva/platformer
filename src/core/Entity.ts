import { BoundingBox } from './BoundingBox';
import { Sides } from './constants';
import { Level } from './Level';
import { Vec2 } from './math';
import { Trait } from './Trait';
import { AudioBoard } from './AudioBoard';
import { EventBuffer } from './EventBuffer';
import { TileMatch, GameContext } from './types';

export abstract class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  traits: Map<Function, Trait> = new Map();
  lifetime = 0;
  audioBoard = new AudioBoard();
  sounds = new Set<string>();
  events = new EventBuffer();

  draw(context: CanvasRenderingContext2D) {}

  addTrait(trait: Trait) {
    this.traits.set(trait.constructor, trait);
  }

  getTrait<T extends Trait>(trait: new () => T) {
    return this.traits.get(trait) as T;
  }

  hasTrait<T extends Trait>(trait: new () => T) {
    return this.traits.has(trait);
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
    this.events.emit(Trait.EVENT_TASK, this);
    this.traits.forEach(trait => trait.finalize(this));
    this.events.clear();
  }

  playSounds(audioBoard: AudioBoard, audioContext: AudioContext) {
    this.sounds.forEach(sound => audioBoard.play(sound, audioContext));
    this.sounds.clear();
  }
}
