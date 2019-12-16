import { Dispatch } from 'redux';

import { levelUrls } from '../../core/constants';
import { drawTileRange } from '../../core/sprites';
import { select } from '../../store';
import { getAvailableLevels } from '../shared/selectors';
import { getLevelLayersTiles } from './selectors';
import { Levels, LevelSpec, TileSpec } from './types';

export const onLevelsRequest = () =>
  (dispatch: Dispatch<any>) => {
    select(getAvailableLevels)
      .map(onLevelRequest)
      .forEach(dispatch);

    // Promise.all(onResolvedLevels)
    //   .then(onLevelsLoaded)
    //   .then(dispatch);
  };

export const onLevelRequest = (assetKey: string) =>
  (dispatch: Dispatch<any>) => {
    return levelUrls[assetKey]
      .then(onLevelReceived(assetKey))
      .then(dispatch);
  };

export const onLevelReceived = (name: string) => (levelSpec: LevelSpec) => ({
  type: Levels.LEVEL_RECEIVED,
  payload: { name, levelSpec }
});

export const onLevelDraw = (name: string, context: CanvasRenderingContext2D) =>
  () => {
    select(getLevelLayersTiles(name))
      .forEach(drawLevelTiles(context));
  };

const drawLevelTiles = (context: CanvasRenderingContext2D) =>
  (tiles: TileSpec[]) => tiles
    .filter(({ name }) => !!name)
    .map(({ name, ranges }) => {
      ranges.forEach((range) => {
        drawTileRange(name, ...range)(context);
      });
  });
