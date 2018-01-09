import { AnyAction } from 'redux';
import { buildStrategy } from '../../lib/redux-helpers';
import { Levels } from './types';

const emptyState = () => ({});

const levelReceived = (state: any, { payload: { name, levelSpec } }: AnyAction) => ({
  ...state, ...{ [name]: levelSpec }
})

export const levels = buildStrategy(emptyState(), {
  [Levels.LEVEL_RECEIVED]: levelReceived
});
