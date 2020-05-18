import flatten from 'ramda/es/flatten';
import range from 'ramda/es/range';

import { levelUrls, patternUrls } from '../constants';
import { createBackgroundLayer } from '../layers/background';
import { createSpriteLayer } from '../layers/sprites';
import { LevelTimer } from '../traits/LevelTimer';
import { Trigger } from '../traits/Trigger';
import { Matrix } from '../math';
import { Patterns, Range, Tile } from '../types';
import { Level } from '../Level';
import { Entity } from '../Entity';
import { loadMusicSheet } from './music';
import { loadSpritesheet } from './spriteSheet';

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
  patterns,
  level: Level
) => {
  levelSpec.layers.forEach(layer => {
    const grid = createGrid(
      layer.tiles,
      patterns
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

const setupTriggers = (levelSpec, level: Level) => {
  const { triggers = [] } = levelSpec;

  triggers.forEach(triggerSpec => {
    const trigger = new Trigger();

    trigger.conditions.push(
      (triggerEntity, collisions, gameContext, level) =>
        level.events.emit(Level.EVENT_TRIGGER, triggerSpec, triggerEntity, collisions)
    );

    const entity =  new (class _Entity extends Entity {});
    entity.addTrait(trigger);
    entity.size.set(64, 64);
    entity.pos.set(triggerSpec.pos[0], triggerSpec.pos[1]);
    level.entities.add(entity);
  })
}

const createLevelTimer = () => {
  const timer = new (class LevelTimerEntity extends Entity {});
  timer.addTrait(new LevelTimer());

  return timer;
}

const setupBehaviour = (level: Level) => {
  const timer = createLevelTimer();
  level.entities.add(timer);
  level.events.listen(LevelTimer.EVENT_TIMER_OK, () =>
    level.music.playTheme());
  level.events.listen(LevelTimer.EVENT_TIMER_HURRY, () =>
    level.music.playHurry());
}

const loadPattern = (name: string) => patternUrls[name];

export const createLevelLoader = entityFactory => (name: string) =>
  levelUrls[name].then(levelSpec => Promise.all([
    levelSpec,
    loadSpritesheet(levelSpec.spriteSheet),
    loadMusicSheet(levelSpec.musicSheet),
    loadPattern(levelSpec.patterns)
  ]))
  .then(([levelSpec, backgroundSprites, musicPlayer, patterns]) => {
    const level = new Level();
    level.name = levelSpec.name;
    level.music.setPlayer(musicPlayer);

    setupBackground(levelSpec, backgroundSprites, patterns, level);
    setupEntities(levelSpec, level, entityFactory);
    setupTriggers(levelSpec, level);
    setupBehaviour(level);

    return level;
  });
