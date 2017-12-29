export enum Sprites {
  SHEET_ADDED = 'SHEET_ADDED',
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
