export const FPS = 1/60;

export type AssetMap<T> = { [k: string]: T };

export const spriteSheetUrls: AssetMap<Promise<string>>  = {
  overworld: import('../assets/sprites/overworld.json')
};

export const tileUrls: AssetMap<string>  = {
  overworld: `/dist/${require('../assets/images/tiles.png')}`
};
