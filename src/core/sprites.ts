import { Tile } from '../store/spritesheets/types';
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
) => {
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
) => (name: string, x: number, y: number) => {
  return makeTileBuffers(
    image,
    name,
    x * tileWidth,
    y * tileHeight,
    tileWidth,
    tileHeight);
};