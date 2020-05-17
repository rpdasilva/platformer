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

export const levels = ['1-1', 'debug-coin'];
export const spriteSheets = ['overworld', 'underworld'];

export const levelUrls: AssetMap<Promise<any>>  = {
  '1-1': Promise.resolve(require('../assets/levels/1-1.json')),
  '1-2': Promise.resolve(require('../assets/levels/1-2.json')),

  // DEBUG
  'debug-coin': Promise.resolve(require('../assets/levels/debug-coin.json')),
  'debug-progression': Promise.resolve(require('../assets/levels/debug-progression.json'))
};

export const spriteSheetUrls: AssetMap<Promise<any>>  = {
  goomba: Promise.resolve(require('../assets/sprites/goomba.json')),
  koopa: Promise.resolve(require('../assets/sprites/koopa.json')),
  mario: Promise.resolve(require('../assets/sprites/mario.json')),
  bulletBill: Promise.resolve(require('../assets/sprites/bullet-bill.json')),
  overworld: Promise.resolve(require('../assets/sprites/overworld.json')),
  underworld: Promise.resolve(require('../assets/sprites/underworld.json'))
};

export const spriteUrls: AssetMap<Promise<string>> = {
  characters: Promise.resolve(require('../assets/images/characters.gif')),
  font: Promise.resolve(require('../assets/images/font.png')),
  items: Promise.resolve(require('../assets/images/items.png')),
  tiles: Promise.resolve(require('../assets/images/tiles.png'))
};

export const patternUrls: AssetMap<Promise<string>> = {
  'overworld-patterns': Promise.resolve(require('../assets/sprites/patterns/overworld-patterns.json'))
}

export const soundEffectUrls: AssetMap<Promise<string>> = {
  coin: Promise.resolve(require('../assets/audio/coin.ogg')),
  jump: Promise.resolve(require('../assets/audio/jump.ogg')),
  stomp: Promise.resolve(require('../assets/audio/stomp.ogg')),
  thwomp: Promise.resolve(require('../assets/audio/thwomp.ogg'))
};

export const audioSheetUrls: AssetMap<Promise<any>>  = {
  mario: Promise.resolve(require('../assets/sounds/mario.json')),
  cannon: Promise.resolve(require('../assets/sounds/cannon.json'))
};

export const musicUrls: AssetMap<Promise<string>> = {
  hurry: Promise.resolve(require('../assets/audio/music/hurry.ogg')),
  overworld: Promise.resolve(require('../assets/audio/music/overworld.ogg')),
  underworld: Promise.resolve(require('../assets/audio/music/underworld.ogg')),
  silent: Promise.resolve(''),
};

export const musicSheetUrls: AssetMap<Promise<any>>  = {
  overworld: Promise.resolve(require('../assets/music/overworld.json')),
  underworld: Promise.resolve(require('../assets/music/underworld.json')),
  silent: Promise.resolve(require('../assets/music/silent.json'))
};
