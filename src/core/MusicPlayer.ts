const AUDIO_LOOP_BUFFER = 0.3;

export class MusicPlayer {
  tracks = new Map<string, HTMLAudioElement>();

  addTrack(name: string, url: string) {
    const audio = new Audio();
    audio.loop = true;
    audio.src = url;

    audio.addEventListener('timeupdate', function(){
      if(audio.loop && audio.currentTime >= audio.duration - AUDIO_LOOP_BUFFER){
        audio.currentTime = 0;
      }
    });

    this.tracks.set(name, audio);
  }

  playTrack(name: string) {
    const audio = this.tracks.get(name);

    this.pauseAll();
    audio.play();

    return audio;
  }

  pauseAll() {
    [...this.tracks.values()].forEach(track => track.pause());
  }
}
