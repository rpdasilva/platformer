import { Sides } from './constants';
import { Entity } from './Entity';
import { Matrix } from './math';
import { TileResolver } from './TileResolver';

const optimizeDirection = (dir: 'x' | 'y', entity: Entity) =>
  entity.vel[dir] > 0
    ? entity.pos[dir] + entity.size[dir]
    : entity.vel[dir] < 0
      ? entity.pos[dir]
      : undefined;

export class TileCollider {
  tiles: TileResolver;

  constructor(tiles: Matrix) {
    this.tiles = new TileResolver(tiles);
  }

  checkX(entity: Entity) {
    const x = optimizeDirection('x', entity);

    if (!x) {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.pos.y,
      entity.pos.y + entity.size.y,
    );

    matches.forEach(match => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
          entity.pos.x = match.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.x = match.x2;
          entity.vel.x = 0;
        }
      }
    })
  }

  checkY(entity: Entity) {
    const y = optimizeDirection('y', entity);

    if (!y) {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      y,
      y
    );

    matches.forEach(match => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
          entity.obstruct(Sides.BOTTOM);
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
          entity.obstruct(Sides.TOP);
        }
      }
    })
  }

  test(entity: Entity) {
    this.checkY(entity);
  }
}