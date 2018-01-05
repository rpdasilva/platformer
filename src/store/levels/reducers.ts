import { AnyAction } from 'redux';
import { buildStrategy } from '../../lib/redux-helpers';
import { Levels } from './types';

const emptyState = () => ({});

const levelReceived = (state: any, { payload: { name, level } }: AnyAction) => ({
  ...state, { name, level }
})

export const tiles = buildStrategy(emptyState(), {
  [Levels.LEVEL_RECEIVED]: levelReceived
});
