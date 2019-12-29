import { BoundingBox } from './BoundingBox';
import { Vec2 } from './math';

export class Trait {
  constructor(public NAME: string) {}

  update(context: Entity, deltaTime: number) {
    console.warn('Unhandled update call', deltaTime, context);
  }

  obstruct(context: Entity, side: string) {}
}

export abstract class Entity {
  pos = new Vec2(0, 0);
  vel = new Vec2(0, 0);
  size = new Vec2(0, 0);
  offset = new Vec2(0, 0);
  bounds = new BoundingBox(this.pos, this.size, this.offset);
  traits: Trait[] = [];
  lifetime = 0;

  abstract draw(context: CanvasRenderingContext2D): void;

  addTrait(trait: Trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime: number) {
    this.traits.forEach(trait => trait.update(this, deltaTime));
    this.lifetime += deltaTime;
  }

  obstruct(side: string) {
    this.traits.forEach(trait => trait.obstruct(this, side));
  }
}
