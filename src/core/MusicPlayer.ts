export class MusicPlayer {
  tracks = new Map();

  addTrack(name: string, url: string) {
    const audio = new Audio();
    audio.loop = true;
    audio.src = url;
    this.tracks.set(name, audio);
  }

  playTrack(name: string) {
    this.tracks.get(name).play();
  }
}
