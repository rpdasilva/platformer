import { Sides } from '../constants';
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

const yHandler: TileHandler = ({ entity, match }) => {
  if (entity.vel.y > 0) {
    if (entity.bounds.bottom > match.y1) {
      entity.obstruct(Sides.BOTTOM, match);
    }
  }
  else if (entity.vel.y < 0) {
    if (entity.bounds.top < match.y2) {
      entity.obstruct(Sides.TOP, match);
    }
  }
}

export const groundTileHandlers: TileHandlers = [xHandler, yHandler];
