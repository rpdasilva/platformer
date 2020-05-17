import { Entity } from './Entity';

export class InputRouter {
  receivers = new Set<Entity>();

  addReceiver(receiver: Entity) {
    this.receivers.add(receiver);
  }

  removeReceiver(receiver: Entity) {
    this.receivers.delete(receiver);
  }

  route(routeInput: (entity: Entity) => void) {
    this.receivers.forEach(routeInput);
  }
}