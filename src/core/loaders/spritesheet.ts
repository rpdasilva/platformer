import { createAnimation } from '../animation';
import { spriteSheetUrls, spriteUrls } from '../constants';
import { Spritesheet } from '../Spritesheet';
import { loadImage } from './image';

const defineTiles = (
  sprites: Spritesheet,
  tiles = []
) => tiles.forEach(({ name, index }: {
  name: string;
  index: [number, number];
}) => sprites.defineTile(name, ...index));

const defineRects = (
  sprites: Spritesheet,
  rects = []
) => rects.forEach(({ name, rect }: {
  name: string;
  rect: [number, number, number, number];
}) => sprites.define(name, ...rect));

const defineAnimations = (
  sprites: Spritesheet,
  animations = []
) => animations.forEach(({ name, frames, frameLen }: {
  name: string;
  frames: string[];
  frameLen: number;
}) => sprites.defineAnimation(name, createAnimation(frames, frameLen)));

export const loadSpritesheet = (name: string) => spriteSheetUrls[name]
  .then(sheetSpec => Promise.all([
    sheetSpec,
    spriteUrls[sheetSpec.imageName].then(loadImage)
  ]))
  .then(([sheetSpec, image]) => {
    const sprites = new Spritesheet(
      image,
      sheetSpec.tileW,
      sheetSpec.tileH
    );

    defineTiles(sprites, sheetSpec.tiles);
    defineRects(sprites, sheetSpec.frames);
    defineAnimations(sprites, sheetSpec.animations);

    return sprites;
  })