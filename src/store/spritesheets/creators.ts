import { Dispatch } from 'redux';
import { loadImage } from '../../core/loaders/image';
import { loadJson } from '../../core/loaders/json';
import { defineSpriteSheet, defineTiles } from '../../core/sprites';
import { spriteSheetUrls, tileUrls } from '../../core/constants';
import { Sprites, SpriteSheetSpec, TileMap } from "./types";

export const onSpriteSheetRequest = (assetKey: string) =>
  (dispatch: Dispatch<any>) => {
    const spriteSheet = spriteSheetUrls[assetKey];
    const tileImage = spriteSheet
      .then(({ tilesKey }) => tileUrls[tilesKey])
      .then(loadImage);

    const defineTile = Promise.all([tileImage, spriteSheet])
      .then(([image, spec]) => defineSpriteSheet(image, spec.tileW, spec.tileH));

    return Promise.all([defineTile, spriteSheet])
      .then(([defineTile, { tiles }]) => defineTiles(defineTile, tiles))
      .then(onTilesDefined)
      .then(dispatch);
  };

export const onTilesDefined = (tileMaps: TileMap[]) => ({
  type: Sprites.TILES_DEFINED,
  payload: tileMaps
});
