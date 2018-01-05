import { Dispatch } from 'redux';

import { levelUrls } from '../../core/constants';
import { Levels, LevelSpec } from './types';

export const onLevelRequest = (assetKey: string) =>
  (dispatch: Dispatch<any>) => {
    levelUrls[assetKey]
      .then(onLevelReceived)
      .then(dispatch);
  };

export const onLevelReceived = (levelSpec: LevelSpec) => ({
  type: Levels.LEVEL_RECEIVED,
  payload: levelSpec
});
