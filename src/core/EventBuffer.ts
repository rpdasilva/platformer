import { Handler } from './types';

export class EventBuffer {
  private events: Set<any> = new Set();

  emit<T>(eventName: Symbol, ...args: T[]) {
    const event = { name: eventName, args };
    this.events.add(event);
    console.log(this.events);
  }

  process<T>(eventName: Symbol, handler: Handler<T>) {
    this.events.forEach(event => {
      if (event.name === eventName) {
        handler(event.args);
      }
    })
  }

  clear() {
    this.events.clear();
  }
}