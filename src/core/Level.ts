import { Compositor } from './Compositor';
import { Matrix } from './math';
import { Entity } from './Entity';
import { TileCollider } from './TileCollider';

export class Level {
  gravity = 2000;
  comp = new Compositor();
  entities = new Set<Entity>();
  tiles = new Matrix();
  tileCollider = new TileCollider(this.tiles);

  update(deltaTime: number) {
    this.entities.forEach(entity => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });
  }
}