var AudioManager = /** @class */ (function () {
    function AudioManager() {
    }
    AudioManager.startBackgroundMusic = function () {
        var backgroundMusic = document.getElementById('backgroundMusic');
        if (backgroundMusic)
            backgroundMusic.play();
    };
    AudioManager.stopBackgroundMusic = function () {
        var backgroundMusic = document.getElementById('backgroundMusic');
        if (!backgroundMusic)
            return;
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    };
    AudioManager.playEnemyDestroyedSound = function (volume) {
        if (volume === void 0) { volume = 1; }
        var enemyDestroyedSound = document.getElementById('enemyDestroyedSound');
        if (!enemyDestroyedSound)
            return;
        enemyDestroyedSound.currentTime = 0;
        enemyDestroyedSound.volume = volume;
        enemyDestroyedSound.play();
    };
    return AudioManager;
}());
export { AudioManager };
