import { Dispatch } from 'redux';
import { loadImage } from '../../core/loaders/image';
import { loadJson } from '../../core/loaders/json';
import { defineSpriteSheet } from '../../core/sprites';
import { spriteSheetUrls, tileUrls } from '../../core/constants';
import { Sprites, SpriteSheet, TileMap } from "./types";

export const onSpriteSheetRequest = (assetKey: string) =>
  (dispatch: Dispatch<any>) => {
    const spriteSheet = spriteSheetUrls[assetKey];
    const tileImage = spriteSheet
      .then(({ tilesKey }) => tileUrls[tilesKey])
      .then(loadImage);

    const defineTile = Promise.all([spriteSheet, tileImage])
      .then(([spec, image]) => defineSpriteSheet(image, spec.tileW, spec.tileH));

    return Promise.all([spriteSheet, defineTile])
      .then(([{ tiles }, defineTile]) => tiles.map(({ name, index }) => {
        return defineTile(name, index[0], index[0]);
      }))
      .then(tiles => tiles.map(onTileDefined))
      .then(tiles => tiles.forEach(dispatch));
  };

export const onTileDefined = (tileMap: TileMap) => ({
  type: Sprites.TILE_DEFINED,
  payload: tileMap
});
