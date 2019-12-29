import { Sides } from './constants';
import { Entity } from './Entity';
import { Matrix } from './math';
import { TileResolver } from './TileResolver';

const getSideByDirection = (dir: 'x' | 'y', entity: Entity) => {
  const sides = {
    x: v => v > 0 ? 'right' : v < 0 ? 'left' : undefined,
    y: v => v > 0 ? 'bottom' : v < 0 ? 'top' : undefined,
  };

  const side = sides[dir](entity.vel[dir]);
  return entity.bounds[side];
}

export class TileCollider {
  tiles: TileResolver;

  constructor(tiles: Matrix) {
    this.tiles = new TileResolver(tiles);
  }

  checkX(entity: Entity) {
    const x = getSideByDirection('x', entity);

    if (!x) {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom,
    );

    matches.forEach(match => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.right = match.x1;
          entity.vel.x = 0;

          entity.obstruct(Sides.RIGHT);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2;
          entity.vel.x = 0;
          entity.obstruct(Sides.LEFT);
        }
      }
    });
  }

  checkY(entity: Entity) {
    const y = getSideByDirection('y', entity);

    if (!y) {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    );

    matches.forEach(match => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.bottom = match.y1;
          entity.vel.y = 0;
          entity.obstruct(Sides.BOTTOM);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2;
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