import { AnyAction } from 'redux';
import { buildStrategy } from '../../lib/redux-helpers';
import { Sprites, TileMap } from './types';

const emptyState = () => ({
});

// const addSheet = (state: SpriteSheets, { payload }: AnyAction) => ({
//   ...state, ...payload
// });

const tileDefined = (state: TileMap, { payload }: AnyAction) => ({
  ...state, ...payload
})

export const tiles = buildStrategy(emptyState(), {
  [Sprites.TILE_DEFINED]: tileDefined
});