import { range } from 'ramda';

import { levelUrls } from '../constants';
import { createBackgroundLayer, createSpriteLayer } from '../layers';
import { Level } from '../Level';
import { loadSpritesheet } from './spritesheet';

const createTiles = (level: Level, backgrounds) => {
  const applyRange = (background, xStart, xLength, yStart, yLength) => {
    range(xStart, xStart + xLength).forEach(x =>
      range(yStart, yStart + yLength).forEach(y =>
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
        })));
  };

  backgrounds.forEach(background =>
    background.ranges.forEach(range => {
      const rangeArgs: {
        [key: number]: [number, number, number, number]
      } = {
        4: range,
        3: [range[0], range[1], range[2], 1],
        2: [range[0], 1, range[1], 1]
      };

      applyRange(background, ...rangeArgs[range.length]);
    }));
};

export const loadLevel = (name: string) =>
  levelUrls[name].then(levelSpec => Promise.all([
    levelSpec,
    loadSpritesheet(levelSpec.spritesheet)
  ]))
  .then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds)

    const backgroundLayer = createBackgroundLayer(
      level,
      backgroundSprites
    );
    level.comp.addLayer(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.addLayer(spriteLayer);

    return level;
  });
