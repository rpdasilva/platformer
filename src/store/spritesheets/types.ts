export enum Sprites {
  SHEET_REQUESTED = 'SHEET_REQUESTED',
  TILE_DEFINED = 'TILE_DEFINED'
};

export type Tile = CanvasRenderingContext2D[];

export interface TileMap {
  [name: string]: Tile;
}

export interface SpriteSheet {
  image: HTMLImageElement;
  tileHeight: number;
  tileWidth: number;
  tiles: TileMap;
}

export interface SpriteSheets {
  [name: string]: SpriteSheet;
}
