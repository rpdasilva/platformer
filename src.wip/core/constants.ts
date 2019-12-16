import { LevelSpec } from '../types/levels';
import { SpriteSheetSpec } from '../types/spritesheets';

export const FPS = 1/60;

export type AssetMap<T> = { [k: string]: T };

export const levels = ['1-1'];
export const spriteSheets = ['overworld'];

export const levelUrls: AssetMap<Promise<LevelSpec>>  = {
  '1-1': Promise.resolve(require('../assets/levels/1-1.json'))
};

export const spriteSheetUrls: AssetMap<Promise<SpriteSheetSpec>>  = {
  overworld: Promise.resolve(require('../assets/sprites/overworld.json'))
};

export const tileUrls: AssetMap<string> = {
  overworld: require('../assets/images/tiles.png')
};
