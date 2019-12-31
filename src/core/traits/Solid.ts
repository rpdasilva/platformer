import { Sides } from '../constants';
import { Entity, Trait } from '../Entity';
import { TileMatch } from '../types';

export class Solid extends Trait {
  static readonly NAME = 'solid';

  obstructs = true;

  constructor() {
    super(Solid.NAME);
  }

  obstruct(entity: Entity, side: Sides, match: TileMatch) {
    if (!this.obstructs) {
      return;
    }

    if (side === Sides.RIGHT) {
      entity.bounds.right = match.x1;
      entity.vel.x = 0;
    }
    else if (side === Sides.LEFT) {
      entity.bounds.left = match.x2;
      entity.vel.x = 0;
    }
    else if (side === Sides.BOTTOM) {
      entity.bounds.bottom = match.y1;
      entity.vel.y = 0;
    }
    else if (side === Sides.TOP) {
      entity.bounds.top = match.y2;
      entity.vel.y = 0;
    }
  }
}
