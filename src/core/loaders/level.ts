import { range } from 'ramda';

import { levelUrls } from '../constants';
import { createBackgroundLayer, createSpriteLayer } from '../layers';
import { Level } from '../Level';
import { loadBackgroundSprites } from './sprites';

const createTiles = (level: Level, backgrounds) => {
  backgrounds.forEach(background =>
    background.ranges.forEach(([x1, x2, y1, y2]) =>
      range(x1, x2).forEach(x =>
        range(y1, y2).forEach(y =>
          level.tiles.set(x, y, { name: background.tile }))))
  );
}

export const loadLevel = (name: string) =>
  Promise.all([
    levelUrls[name],
    loadBackgroundSprites()
  ])
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
