import { buildStrategy } from '../../lib/redux-helpers';
import { Shared } from './types';

const emptyState = () => ({ assetsLoaded: false });

const assetsLoaded = (state: any) => ({ ...state, assetsLoaded: true });

export const shared = buildStrategy(emptyState(), {
  [Shared.ASSETS_LOADED]: assetsLoaded
});