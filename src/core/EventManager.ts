import { EventTypes } from './constants';
import { Entity, Trait } from './Entity';
import { EventPayloads } from './types';

type Subscriber = any; // Entity | Trait;
type Listener<T> = (payload: T) => void;
type Payload = EventPayloads[EventTypes];

export class EventManager {
  subscribers = new Map<
    EventTypes,
    Map<Subscriber, Listener<Payload>>
  >();

  publish(eventType: EventTypes, payload?: Payload) {
    this.subscribers.get(eventType).forEach(listener => listener(payload));
  }

  subscribe(
    eventType: EventTypes,
    subscriber: Subscriber,
    listener: Listener<Payload>
  ) {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Map());
    }

    this.subscribers.get(eventType).set(subscriber, listener);
  }

  unsubscribe(eventType: EventTypes, subscriber: Subscriber) {
    this.subscribers.get(eventType).delete(subscriber);
  }
}

export const globalEventManager = new EventManager();
