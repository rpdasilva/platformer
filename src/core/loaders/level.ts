import flatten from 'ramda/es/flatten';
import range from 'ramda/es/range';

import { levelUrls } from '../constants';
import { createBackgroundLayer } from '../layers/background';
import { createSpriteLayer } from '../layers/sprites';
import { Matrix } from '../math';
import { Patterns, Range, Tile } from '../types';
import { Level } from '../Level';
import { MusicController } from '../MusicController';
import { loadMusicSheet } from './music';
import { loadSpritesheet } from './spritesheet';


const createSpan = (
  xStart: number,
  xLength: number,
  yStart: number,
  yLength: number
) =>  flatten(
  range(xStart, xStart + xLength).map(x =>
    range(yStart, yStart + yLength).map(y => ({ x, y }))
  )
);

const expandRange = (range: Range) => {
  const rangeArgs: Range = [
    range[0],
    range[2] !== undefined ? range[1] : 1,
    range[2] !== undefined ? range[2] : range[1],
    range[3] !== undefined ? range[3] : 1
  ];

  return createSpan(...rangeArgs);
}

const expandRanges = (ranges: Range[]) => flatten(ranges.map(expandRange));

const expandTiles = (
  tiles: Tile[],
  patterns: Patterns
) => {
  const walkTiles = (tiles, offsetX, offsetY) =>
    flatten(tiles.map(tile =>
      expandRanges(tile.ranges)
        .map(({ x, y }) => {
          const adjustedX = x + offsetX;
          const adjustedY = y + offsetY;

          if (tile.pattern) {
            const pattern = patterns[tile.pattern];
            return walkTiles(
              pattern.tiles,
              adjustedX,
              adjustedY
            );
          }
          else {
            return {
              tile,
              x: adjustedX,
              y: adjustedY
            };
          }
        })
    ));

  return walkTiles(tiles, 0, 0);
};

const createGrid = (tiles: Tile[], patterns: Patterns) => {
  const grid = new Matrix();

  expandTiles(tiles, patterns)
    .forEach(({ tile, x, y }) => grid.set(x, y, tile)
  );

  return grid;
}

const setupBackground = (
  levelSpec,
  backgroundSprites,
  level: Level
) => {
  levelSpec.layers.forEach(layer => {
    const grid = createGrid(
      layer.tiles,
      levelSpec.patterns
    );

    const backgroundLayer = createBackgroundLayer(
      level,
      grid,
      backgroundSprites
    );

    level.comp.addLayer(backgroundLayer);
    level.tileCollider.addGrid(grid);
  });
};

const setupEntities = (
  levelSpec,
  level: Level,
  entityFactory
) => {
  levelSpec.entities
    .forEach(({ name, pos: [x, y] }) => {
      const entity = entityFactory[name]();
      entity.pos.set(x, y);
      level.entities.add(entity);
    });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.addLayer(spriteLayer);
}

export const createLevelLoader = entityFactory => (name: string) =>
  levelUrls[name].then(levelSpec => Promise.all([
    levelSpec,
    loadSpritesheet(levelSpec.spritesheet),
    loadMusicSheet(levelSpec.musicSheet)
  ]))
  .then(([levelSpec, backgroundSprites, musicPlayer]) => {
    const level = new Level();
    level.music.setPlayer(musicPlayer);

    setupBackground(levelSpec, backgroundSprites, level);
    setupEntities(levelSpec, level, entityFactory);

    return level;
  });
