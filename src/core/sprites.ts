import { compose, curry, range, xprod } from 'ramda';

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
import { fillRange } from '../lib/function-helpers';

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

export const drawTile = (store: any) => (tileName: string, x: number, y: number) =>
  (context: CanvasRenderingContext2D) => {
    const [tile] = getTile(tileName)(store);
    return drawImage(tile, x * tile.width, y * tile.height)(context);
  }

export const drawTileRange = (store: any) =>
(
  tileName: string,
  startX: number,
  endX: number,
  startY: number,
  endY: number
) =>
(context: CanvasRenderingContext2D) => {
  const cols: number[] = range(startX, endX);
  const rows: number[] = range(startY, endY);

  xprod(cols, rows).forEach(([x, y]: number[]) => {
    drawTile(store)(tileName, x, y)(context);
  });

  return context;
}
