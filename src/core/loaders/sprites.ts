import { spriteUrls } from '../constants';
import { Spritesheet } from '../Spritesheet';
import { loadImage } from './image';

export const loadMarioSprite = () =>
  spriteUrls.characters.then(loadImage)
    .then(image => {
      const sprites = new Spritesheet(image, 16, 16);
      sprites.define('idle', 276, 44, 16, 16);
      return sprites;
    });
