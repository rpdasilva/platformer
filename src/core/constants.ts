export const FPS = 1/60;

export type AssetMap<T> = { [k: string]: T };

export const levels = ['1-1'];
export const spriteSheets = ['overworld'];

export const levelUrls: AssetMap<Promise<any>>  = {
  '1-1': Promise.resolve(require('../assets/levels/1-1.json'))
};

export const spriteSheetUrls: AssetMap<Promise<any>>  = {
  overworld: Promise.resolve(require('../assets/sprites/overworld.json'))
};

export const spriteUrls: AssetMap<Promise<string>> = {
  characters: Promise.resolve(require('../assets/images/characters.gif')),
  tiles: Promise.resolve(require('../assets/images/tiles.png'))
};
