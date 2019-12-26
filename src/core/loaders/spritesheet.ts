import { spriteSheetUrls, spriteUrls } from '../constants';
import { Spritesheet } from '../Spritesheet';
import { loadImage } from './image';

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

    sheetSpec.tiles.forEach(({
      name,
      index: [x, y]
    }) => sprites.defineTile(name, x, y))

    return sprites;
  })