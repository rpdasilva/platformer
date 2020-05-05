export class Matrix {
  grid = [];

  forEach(callback) {
    this.grid.forEach((col, x) =>
      col.forEach((value, y) => callback(value, x, y)));
  }

  get(x: number, y: number) {
      const col = this.grid[x];
      return col ? col[y] : undefined;
  }

  set(x: number, y: number, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }

    this.grid[x][y] = value;
  }

  delete(x: number, y: number) {
    const col = this.grid[x];
    if (col) {
      delete col[y];
    }
  }
}

export class Vec2 {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy(vec2: Vec2) {
    this.x = vec2.x;
    this.y = vec2.y;
  }
}
