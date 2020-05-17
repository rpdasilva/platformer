import { Compositor } from './Compositor';
import { EventEmitter } from './EventEmitter';
import { GameContext } from './types';

export class Scene {
  static readonly EVENT_COMPLETE = Symbol('Scene Complete');

  comp = new Compositor();
  events = new EventEmitter();

  draw({ videoContext }: GameContext) {
    this.comp.draw(videoContext);
  }

  update(gameContext: GameContext) {}

  pause() {}
}