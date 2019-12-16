import { createSelector } from 'reselect';
import { LevelSpec } from './types';

export const getLevel = (name: string) => (state: any): LevelSpec =>
  state.levels[name];

export const getLevelLayers = (name: string) =>
  createSelector([getLevel(name)], ({ layers }) => layers);

export const getLevelLayersTiles = (name: string) =>
  createSelector([getLevelLayers(name)], layers =>
    layers.map(({ tiles }) => tiles));
