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
  getContext,
  makeCanvas
} from '../lib/canvas-helpers';
import { pipe } from '../lib/function-helpers';

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
  const tileBuffers: Tile = [1, -1].map((scaleY: 1 | -1) =>
    pipe(
      makeCanvas,
      getContext,
      flipContext(width, scaleY),
      drawImage(image, x, y, width, height, 0, 0, width, height)
    )(width, height));

  return { [name]: tileBuffers };
}

export const makeDefineTile = (
  image: HTMLImageElement,
  tileWidth: number,
  tileHeight: number
): DefineTile => (name: string, x: number, y: number) => {
  console.log({ name, x, y, tileWidth, tileHeight });
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
    console.log({tile, context});
    return drawImage(context, x, y);
  }

