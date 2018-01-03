import { Tile } from './types';

export const getTile = (tileName: string) =>
  (store: any): Tile => store.getState().tiles[tileName];
