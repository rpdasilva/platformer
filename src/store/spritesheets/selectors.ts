import { Tile } from './types';

export const getTile = (tileName: string) =>
  (state: any): Tile => state.tiles[tileName];
