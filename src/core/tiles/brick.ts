import { Sides } from '../constants';
import { Player } from '../traits/Player';
import { TileHandler, TileHandlers } from '../types';

const xHandler: TileHandler = ({ entity, match }) => {
  if (entity.vel.x > 0) {
    if (entity.bounds.right > match.x1) {
      entity.obstruct(Sides.RIGHT, match);
    }
  }
  else if (entity.vel.x < 0) {
    if (entity.bounds.left < match.x2) {
      entity.obstruct(Sides.LEFT, match);
    }
  }
};

const yHandler: TileHandler = ({
  entity,
  match,
  tileResolver,
  gameContext,
  level
}) => {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Sides.BOTTOM, match);
    }
  }
  else if (entity.vel.y < 0) {
    if (entity.hasTrait(Player.NAME)) {
      const grid = tileResolver.matrix;
      grid.delete(match.indexX, match.indexY);

      const goomba = gameContext.entityFactory.goomba();
      goomba.vel.set(50, -400);
      goomba.pos.set(match.x1, match.y1);
      level.entities.add(goomba);
    }

    if (entity.bounds.top < match.y2) {
      entity.obstruct(Sides.TOP, match);
    }
  }
}

export const brickTileHandlers: TileHandlers = [xHandler, yHandler];
