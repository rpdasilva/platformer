import { Compositor } from './Compositor';
import { Matrix } from './math';
import { Entity } from './Entity';
import { EntityCollider } from './EntityCollider';
import { TileCollider } from './TileCollider';

export class Level {
  gravity = 1500;
  totalTime = 0;
  comp = new Compositor();
  entities = new Set<Entity>();
  entityCollider = new EntityCollider(this.entities);
  tileCollider: TileCollider;

  setCollisionGrid(matrix: Matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  update(deltaTime: number) {
    this.entities.forEach(entity => entity.update(deltaTime, this));
    this.entities.forEach(entity => this.entityCollider.check(entity));
    this.entities.forEach(entity => entity.finalize());

    this.totalTime += deltaTime;
  }
}