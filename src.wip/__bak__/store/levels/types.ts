export enum Levels {
  LEVEL_REQUESTED = 'LEVEL_REQUESTED',
  LEVEL_RECEIVED = 'LEVEL_RECEIVED'
};

export interface TileSpec {
  name: string;
  type?: string;
  ranges: number[][];
}

export interface Pattern {
  name?: string;
  pattern?: string;
  type?: string;
  ranges: number[][];
}

export interface Entity {
  name: string;
  pos: number[];
}

export interface TileGroup<T> {
  tiles: T[];
}

export type Layer = TileGroup<TileSpec>;

export interface LevelSpec {
  patterns: {
    [patternName: string]: TileGroup<Pattern>;
  };
  layers: Layer[];
  entities: Entity[];
}
