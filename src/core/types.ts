import { Entity } from './Entity';
import { Level } from './Level';
import { TileResolver } from './TileResolver';

export type Nullable<T> = null | T;

export interface GameContext {
  audioContext: AudioContext;
  videoContext: CanvasRenderingContext2D;
  entityFactory: EntityFactories;
  deltaTime: number;
}

export interface TileCollisionContext {
  entity: Entity;
  match: TileMatch;
  tileResolver: TileResolver;
  gameContext: GameContext;
  level: Level;
}

export type EntityFactory = () => Entity;
export type EntityFactories = { [name: string]: () => Entity; };
export type LoadEntity = (audioContext: AudioContext) => Promise<EntityFactory>;
export type Handler<T> = (...args: T[]) => void;
export type Listener<T> = {
  eventName: Symbol;
  handler: Handler<T>;
  count?: number;
}

export type TileHandler = (tileCollisionContext: TileCollisionContext) => void;
export type TileHandlers = [TileHandler, TileHandler];

export type KeyState = 1 | 0;

type Range2 = [number, number];
type Range3 = [number, number, number];
type Range4 = [number, number, number, number];
export type Range = Range2 | Range3 | Range4;

export interface Tile {
  name: string;
  type?: string;
  pattern?: string;
  ranges: Range[];
}

export interface Pattern {
  tiles: Tile[];
}

export interface Patterns {
  [name: string]: Pattern;
}

export type AnimationRouter = (entity: Entity) => string;
export type TileMatch = {
  tile: any;
  indexX: number;
  indexY: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
