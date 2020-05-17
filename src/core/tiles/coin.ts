import { Player } from '../traits/Player';
import { TileHandler, TileHandlers } from '../types';

const handle: TileHandler = ({ entity, match, tileResolver, level }) => {
  if (entity.hasTrait(Player.NAME)) {
    entity[Player.NAME].addCoins(1);
    const grid = tileResolver.matrix;
    grid.delete(match.indexX, match.indexY);
  }
}

export const coinTileHandlers: TileHandlers = [handle, handle];
