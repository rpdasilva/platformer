export enum Sprites {
  SHEET_REQUESTED = 'SHEET_REQUESTED',
  TILES_DEFINED = 'TILES_DEFINED'
};

export type DefineTile = (name: string, x: number, y: number) => TileMap;

export type Tile = HTMLCanvasElement[];

export interface TileMap {
  [name: string]: Tile;
}

export interface TileSpec {
  name: string;
  index: [number, number];
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
