import { Entity } from './Entity';

export interface GameContext {
  audioContext: AudioContext;
  deltaTime: number;
}

export type LoadEntity = (audioContext: AudioContext) => Promise<() => Entity>

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
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};
