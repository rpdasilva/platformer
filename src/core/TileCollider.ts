import { Entity } from './Entity';
import { Level } from './Level';
import { TileResolver } from './TileResolver';
import { Matrix } from './math';
import { GameContext, TileCollisionContext, TileHandlers, TileMatch } from './types';
import { groundTileHandlers } from './tiles/ground';
import { brickTileHandlers } from './tiles/brick';

const getSideByDirection = (dir: 'x' | 'y', entity: Entity) => {
  const sides = {
    x: (v: number) => v > 0 ? 'right' : v < 0 ? 'left' : undefined,
    y: (v: number) => v > 0 ? 'bottom' : v < 0 ? 'top' : undefined,
  };

  const side = sides[dir](entity.vel[dir]);
  return entity.bounds[side];
}

const handlers: { [tileType: string]: TileHandlers } = {
  ground: groundTileHandlers,
  brick: brickTileHandlers
};

export class TileCollider {
  tileResolvers: TileResolver[] = [];

  addGrid(matrix: Matrix) {
    this.tileResolvers.push(new TileResolver(matrix));
  }

  checkX(entity: Entity, gameContext: GameContext, level: Level) {
    const x = getSideByDirection('x', entity);

    if (!x) {
      return;
    }

    this.tileResolvers.forEach(tileResolver => {
      const matches = tileResolver.searchByRange(
        x,
        x,
        entity.bounds.top,
        entity.bounds.bottom,
      );

      matches.forEach(match => this.handleTile(0, entity, match, tileResolver, gameContext, level));
    });
  }

  checkY(entity: Entity, gameContext: GameContext, level: Level) {
    const y = getSideByDirection('y', entity);

    if (!y) {
      return;
    }

    this.tileResolvers.forEach(tileResolver => {
      const matches = tileResolver.searchByRange(
        entity.bounds.left,
        entity.bounds.right,
        y,
        y
      );

      matches.forEach(match => this.handleTile(1, entity, match, tileResolver, gameContext, level));
    });
  }

  handleTile(index: number, entity: Entity, match: TileMatch, tileResolver: TileResolver, gameContext: GameContext, level: Level) {
    const tileCollisionContext: TileCollisionContext = {
      entity,
      match,
      tileResolver,
      gameContext,
      level
    };
    const tileHandlers = handlers[match.tile.type] || [];
    const tileHandler = tileHandlers[index] || (() => {});
    tileHandler(tileCollisionContext);
  }
}