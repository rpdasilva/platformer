import { AnyAction } from 'redux';
import { buildStrategy } from '../../lib/redux-helpers';
import { Sprites, TileMap } from './types';

const emptyState = () => ({
});

// const addSheet = (state: SpriteSheets, { payload }: AnyAction) => ({
//   ...state, ...payload
// });

const tilesDefined = (state: TileMap, { payload }: AnyAction) => ({
  ...state, ...Object.assign({}, ...payload)
})

export const tiles = buildStrategy(emptyState(), {
  [Sprites.TILES_DEFINED]: tilesDefined
});