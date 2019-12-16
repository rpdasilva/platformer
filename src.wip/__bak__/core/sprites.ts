import {
  compose,
  cond,
  curry,
  identity,
  insert,
  range,
  T,
  xprod
} from 'ramda';

import {
  DefineTile,
  Tile,
  TileMap,
  TileSpec
} from '../store/spritesheets/types';
import { getTile } from '../store/spritesheets/selectors';
import {
  drawImage,
  flipContext,
  getCanvasFromContext,
  getContext,
  makeCanvas
} from '../lib/canvas-helpers';
import { expandRange, lengthEq } from '../lib/function-helpers';
import { select } from '../store';

export const defineSpriteSheet = (
  image: HTMLImageElement,
  tileWidth: number,
  tileHeight: number
) => {
  return makeDefineTile(image, tileWidth, tileHeight);
}

export const makeTileBuffers = (
  image: HTMLImageElement,
  name: string,
  x: number,
  y: number,
  width: number,
  height: number
): TileMap => {
  const tileBuffers: Tile = [1, -1].map((scaleX: 1 | -1) => {
    return compose(
      getCanvasFromContext,
      drawImage(image, x, y, width, height, 0, 0, width, height),
      flipContext(width, scaleX),
      getContext,
      curry(makeCanvas)(width)
    )(height);
  });

  return { [name]: tileBuffers };
}

export const makeDefineTile = (
  image: HTMLImageElement,
  tileWidth: number,
  tileHeight: number
): DefineTile => (name: string, x: number, y: number) => {
  return makeTileBuffers(
    image,
    name,
    x * tileWidth,
    y * tileHeight,
    tileWidth,
    tileHeight);
};

export const defineTiles = (defineTile: DefineTile, tiles: TileSpec[]) => {
  return tiles.map(({ name, index: [x, y] }) => defineTile(name, x, y));
}

export const drawTile = (tileName: string, x: number, y: number) =>
  (context: CanvasRenderingContext2D) => {
    const [tile] = select(getTile(tileName));
    return drawImage(tile, x * tile.width, y * tile.height)(context);
  }

export const drawTileRange = (
  tileName: string,
  ...tileRange: number[]
) =>
(context: CanvasRenderingContext2D) => {
  const [xStart, xLen, yStart, yLen] = expandRange(1, tileRange);
  const cols: number[] = range(xStart, xStart + xLen);
  const rows: number[] = range(yStart, yStart + yLen);

  xprod(cols, rows).forEach(([x, y]: number[]) => {
    drawTile(tileName, x, y)(context);
  });

  return context;
}
