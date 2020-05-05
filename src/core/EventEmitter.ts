import { Handler, Listener } from './types';

export class EventEmitter {
  private listeners: Listener<any>[] = [];

  listen<T>(eventName: string, handler: Handler<T>) {
    this.listeners.push({ eventName, handler });
  }

  emit<T>(event: string, ...args: T[]) {
    this.listeners
      .filter(({ eventName }) => eventName === event)
      .forEach(({ handler }) => handler(...args))
  }
}