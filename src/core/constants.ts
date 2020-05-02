export const FPS = 1/60;
export const KEY_PRESSED = 1;
export const KEY_RELEASED = 0;
export enum KeyMap {
  SPACE = 'Space',
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
  A = 'KeyA',
  D = 'KeyD',
  O = 'KeyO',
  P = 'KeyP'
}
export enum Sides {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left'
}

export enum Drag {
  HIGH = 1/2500,
  LOW = 1/5500
}

export type AssetMap<T> = { [k: string]: T };

export const levels = ['1-1'];
export const spriteSheets = ['overworld'];

export const levelUrls: AssetMap<Promise<any>>  = {
  '1-1': Promise.resolve(require('../assets/levels/1-1.json'))
};

export const spriteSheetUrls: AssetMap<Promise<any>>  = {
  goomba: Promise.resolve(require('../assets/sprites/goomba.json')),
  koopa: Promise.resolve(require('../assets/sprites/koopa.json')),
  mario: Promise.resolve(require('../assets/sprites/mario.json')),
  overworld: Promise.resolve(require('../assets/sprites/overworld.json')),
  underworld: Promise.resolve(require('../assets/sprites/underworld.json'))
};

export const spriteUrls: AssetMap<Promise<string>> = {
  characters: Promise.resolve(require('../assets/images/characters.gif')),
  font: Promise.resolve(require('../assets/images/font.png')),
  items: Promise.resolve(require('../assets/images/items.png')),
  tiles: Promise.resolve(require('../assets/images/tiles.png'))
};

export const soundEffectUrls: AssetMap<Promise<string>> = {
  coin: Promise.resolve(require('../assets/audio/coin.ogg')),
  jump: Promise.resolve(require('../assets/audio/jump.ogg')),
  stomp: Promise.resolve(require('../assets/audio/stomp.ogg')),
  thwomp: Promise.resolve(require('../assets/audio/thwomp.ogg'))
};

export const musicUrls: AssetMap<Promise<string>> = {
  hurry: Promise.resolve(require('../assets/audio/music/hurry.ogg')),
  overworld: Promise.resolve(require('../assets/audio/music/overworld.ogg')),
  underworld: Promise.resolve(require('../assets/audio/music/underworld.ogg'))
};

export const audioSheetUrls: AssetMap<Promise<any>>  = {
  mario: Promise.resolve(require('../assets/sounds/mario.json'))
};
