export const getTile = (tileName: string) =>
  (store: any) => store.getState().tiles[tileName];
