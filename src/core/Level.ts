import { Compositor } from './Compositor';
import { Matrix } from './math';
import { Entity } from './Entity';
import { TileCollider } from './TileCollider';

export class Level {
  gravity = 1500;
  totalTime = 0;
  comp = new Compositor();
  entities = new Set<Entity>();
  tileCollider: TileCollider;

  setCollisionGrid(matrix: Matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}