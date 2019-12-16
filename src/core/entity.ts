import { Vec2 } from './math';

export abstract class Entity {
  position = new Vec2(0, 0);
  velocity = new Vec2(0, 0);

  abstract draw(context: CanvasRenderingContext2D): void;
  abstract update(deltaTime: number): void;
}
