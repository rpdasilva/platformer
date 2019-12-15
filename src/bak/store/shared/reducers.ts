import { buildStrategy } from '../../lib/redux-helpers';
import { Shared } from './types';

const emptyState = () => ({
  spriteSheets: ['overworld'],
  levels: ['1-1'],
  assetsLoaded: false
});

const assetsLoaded = (state: any) => ({ ...state, assetsLoaded: true });

export const shared = buildStrategy(emptyState(), {
  [Shared.ASSETS_LOADED]: assetsLoaded
});