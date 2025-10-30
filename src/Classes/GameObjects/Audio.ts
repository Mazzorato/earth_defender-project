export class AudioManager {
  static startBackgroundMusic(): void {
    const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement | null;
    if (backgroundMusic) backgroundMusic.play();
  }

  static stopBackgroundMusic(): void {
    const backgroundMusic = document.getElementById('backgroundMusic') as HTMLAudioElement | null;
    if (!backgroundMusic) return;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  static playEnemyDestroyedSound(volume: number = 1): void {
    const enemyDestroyedSound = document.getElementById('enemyDestroyedSound') as HTMLAudioElement | null;
    if (!enemyDestroyedSound) return;
    enemyDestroyedSound.currentTime = 0;
    enemyDestroyedSound.volume = volume;
    enemyDestroyedSound.play();
  }
}
