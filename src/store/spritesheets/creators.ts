import { Sprites, SpriteSheet, TileMap } from "./types";

export const onSheetAdded = (sheet: SpriteSheet) => ({
  type: Sprites.SHEET_ADDED,
  payload: sheet
});

export const onTileDefined = (tileMap: TileMap) => ({
  type: Sprites.TILE_DEFINED,
  payload: tileMap
});
