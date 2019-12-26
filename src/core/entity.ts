import { Vec2 } from './math';

export class Trait {
  constructor(public NAME: string) {}

  update(context: Entity, deltaTime: number) {
    console.warn('Unhandled update call', deltaTime, context);
  }
}

export abstract class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  traits: Trait[] = [];

  abstract draw(context: CanvasRenderingContext2D): void;

  addTrait(trait: Trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime: number) {
    this.traits.forEach(trait => trait.update(this, deltaTime));
  }
}
