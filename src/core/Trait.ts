import { Sides } from './constants';
import { Entity } from './Entity';
import { Level } from './Level';
import { Handler, Listener, TileMatch, GameContext } from './types';

export class Trait {
  static readonly EVENT_TASK = Symbol('Task');

  private listeners: Listener<any>[] = [];

  update(context: Entity, gameContext: GameContext, level: Level) {}
  obstruct(context: Entity, side: Sides, match: TileMatch) {}
  collides(us: Entity, them: Entity) {}

  queue(task: (entity: Entity) => void) {
    this.listen(Trait.EVENT_TASK, task, 1);
  }

  finalize(entity: Entity) {
    this.listeners = this.listeners.filter(listener => {
      const { eventName, handler } = listener;
      entity.events.process(eventName, handler);
      return --listener.count;
    });
  }

  listen<T>(eventName: Symbol, handler: Handler<T>, count = Infinity) {
    this.listeners.push({ eventName, handler, count });
  }
}
