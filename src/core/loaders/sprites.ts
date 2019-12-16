import { spriteUrls } from '../constants';
import { Spritesheet } from '../spritesheet';
import { loadImage } from './image';

export const loadMarioSprite = () =>
  spriteUrls.characters.then(loadImage)
    .then(image => {
      const sprites = new Spritesheet(image, 16, 16);
      sprites.define('idle', 276, 44, 16, 16);
      return sprites;
    });

export const loadBackgroundSprites = () =>
  spriteUrls.tiles.then(loadImage)
    .then(image => {
      const sprites = new Spritesheet(image, 16, 16);
      sprites.defineTile('ground', 0, 0);
      sprites.defineTile('sky', 3, 23);
      return sprites;
    });