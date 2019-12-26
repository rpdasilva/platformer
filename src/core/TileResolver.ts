import { Matrix } from './math';
import { equals, filter, flatten, pipe } from 'ramda';

export class TileResolver {
  constructor(public matrix: Matrix, public tileSize = 16) {}

  toIndex(pos: number) {
    return Math.floor(pos / this.tileSize);
  }

  toIndexRange(pos1: number, pos2: number) {
    const max = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;

    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < max)

    return range;
  }

  getByIndex(x: number, y: number) {
    const tile = this.matrix.get(x, y);

    if (tile) {
      const x1 = x * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = y * this.tileSize;
      const y2 = y1 + this.tileSize;

      return {
        tile,
        x1,
        x2,
        y1,
        y2
      };
    }
  }

  searchByPosition(x: number, y: number) {
    return this.getByIndex(
      this.toIndex(x),
      this.toIndex(y),
    );
  }

  searchByRange(x1: number, x2: number, y1: number, y2: number) {
    // const matches = [];

    // this.toIndexRange(x1, x2)
    //   .forEach(indexX => this.toIndexRange(y1, y2)
    //     .forEach(indexY => {
    //       const match = this.getByIndex(indexX, indexY);
    //       if (match) {
    //         matches.push(match);
    //       }
    //     }));

    // return matches;

    const indices = this.toIndexRange(x1, x2)
      .map(indexX => this.toIndexRange(y1, y2)
        .map(indexY => this.getByIndex(indexX, indexY)));

    return filter(
      pipe(Boolean, equals(true)),
      flatten(indices)
    );
  }
}