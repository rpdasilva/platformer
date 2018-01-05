export enum Levels {
  LEVEL_REQUESTED = 'LEVEL_REQUESTED',
  LEVEL_RECEIVED = 'LEVEL_RECEIVED'
};

export interface TileSpec {
  name: string;
  type?: string;
  ranges: number[];
}

export interface Pattern {
  name?: string;
  pattern?: string;
  type?: string;
  ranges: number[];
}

export interface PatternGroup<T> {
  tiles: T[];
}

export interface LevelSpec {
  spriteSheet: string;
  patterns: {
    [patternName: string]: PatternGroup<Pattern>[];
  };
  layers: PatternGroup<TileSpec>[];
  entities: {
    name: string;
    pos: number[];
  };
}
