import { MusicPlayer } from './MusicPlayer';

export class MusicController {
  player: MusicPlayer;

  constructor() {}

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }
}