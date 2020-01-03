import { spriteUrls } from '../constants';
import { Font } from '../Font';
import { Spritesheet } from '../Spritesheet';
import { loadImage } from './image';

const CHARS = [
  ' !"#$%&\'()*+,-./0123456789:;<=>?@',
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`',
  'abcdefghijklmnopqrstuvwxyz{|}~'
].join('');

export const loadFont = () =>
  spriteUrls.font
    .then(loadImage)
    .then(image => {
      const sprites = new Spritesheet(image, 8, 8);
      const tileSize = 8;
      const rowLength = image.width;

      CHARS.split('').forEach((char, index) =>
        sprites.define(
          char,
          index * tileSize % rowLength,
          Math.floor(index * tileSize / rowLength) * tileSize,
          tileSize,
          tileSize
        )
      );

      return new Font(sprites, tileSize);
    });