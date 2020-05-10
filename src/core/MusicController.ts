import { MusicPlayer } from './MusicPlayer';

export class MusicController {
  player: MusicPlayer;

  constructor() {}

  setPlayer(player: MusicPlayer) {
    this.player = player;
  }

  playTheme(playbackSpeed = 1) {
    const track = this.player.playTrack('main');
    track.playbackRate = playbackSpeed;
  }

  playHurry() {
    const track = this.player.playTrack('hurry');
    track.loop = false;

    track.addEventListener('ended', () => {
      this.playTheme(1.4);
    }, { once: true });
  }
}