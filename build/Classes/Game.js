import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Laser } from "./GameObjects/Laser.js";
import { Earth } from "./GameObjects/Earth.js";
var Game = /** @class */ (function () {
    function Game() {
        //Public attributs
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.nbAliens = 10;
        this.gameObjects = [];
        this.nbstar = 50;
        this.stars = [];
        // private heart : Heart; // si non utilisé, garder commenté
        // HUD / état
        this.earthHp = 3;
        this.earthHpMax = 3;
        this.kills = 0;
        // Objectif cumulatif de kills (affichage “kills / objectif”)
        this.totalKillsTarget = 10; // palier courant d’objectif (10, 22, 36, …)
        this.initialWaveAliens = 10; // taille de la 1re vague (utilisée pour l’objectif de départ)
        // Vagues (illimitées)
        this.waveIndex = 0; // 0-based
        this.betweenWavesMs = 1200; // délai entre vagues
        this.isNextWaveScheduled = false; // empêche multiples setTimeout
        this.isOver = false;
        var canvas = document.querySelector("canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.getEarthHp = function () {
        return this.earthHp;
    };
    Object.defineProperty(Game.prototype, "EartHpMax", {
        get: function () {
            return this.earthHpMax;
        },
        enumerable: false,
        configurable: true
    });
    Game.prototype.getKills = function () {
        return this.kills;
    };
    Game.prototype.addKill = function () {
        this.kills++;
    };
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        //J'instancie un GameObject
        var gameObject = new GameObject(this);
        //Je le dessine 
        this.draw(gameObject);
        // Player
        this.player = new Player(this);
        this.instanciate(this.player);
        // Earth
        this.instanciate(new Earth(this));
        // Vague initiale: conserver ta boucle for nbAliens
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }
        // Initialise l’objectif de kills pour la 1re vague
        this.totalKillsTarget = 10;
        // Stars
        for (var i = 0; i < this.nbstar; i++) {
            var star = new Star(this);
            this.stars.push(star);
        }
        Input.listen();
        this.loop();
    };
    Game.prototype.destroy = function (gameObject) {
        this.gameObjects = this.gameObjects.filter(function (go) { return go != gameObject; });
    };
    Game.prototype.instanciate = function (gameObject) {
        this.gameObjects.push(gameObject);
    };
    Game.prototype.getPlayer = function () {
        return this.player;
    };
    Game.prototype.draw = function (gameObject) {
        this.context.drawImage(gameObject.getImage(), gameObject.getPosition().x, gameObject.getPosition().y, gameObject.getImage().width, gameObject.getImage().height);
    };
    // HUD minimal: kills + vague + PV Terre
    Game.prototype.drawHUD = function () {
        // Kills en haut gauche (affiche “kills cumulés / objectif cumulatif”)
        this.context.fillStyle = "#ffffff";
        this.context.font = "20px sans-serif";
        this.context.textAlign = "left";
        this.context.fillText("".concat(this.kills, "/").concat(this.totalKillsTarget), 20, 30);
        // Info vague
        this.context.fillStyle = "#bfbfbf";
        this.context.fillText("Wave ".concat(this.waveIndex + 1), 20, 54);
        // PV Terre en bas centre
        this.context.textAlign = "center";
        this.context.fillStyle = "#ff4d4d";
        this.context.fillText("".concat(this.earthHp, " \u2665"), this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT - 12);
    };
    // Vague illimitée: génère en fonction du numéro de vague (difficulté croissante)
    Game.prototype.spawnCurrentWave = function () {
        var aliensPerWave = 10;
        var currentAliens = this.gameObjects.filter(function (go) { return go instanceof Alien; }).length;
        var toSpawn = Math.max(0, aliensPerWave - currentAliens);
        var level = this.waveIndex + 1;
        var speed = Math.min(3.0, 0.1 + (level - 1) * 0.1);
        for (var i = 0; i < toSpawn; i++) {
            var alien = new Alien(this);
            alien.speed = speed;
            this.instanciate(alien);
        }
    };
    Game.prototype.loop = function () {
        var _this = this;
        this.loopId = window.setInterval(function () {
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.stars.forEach(function (star) {
                star.callUpdate();
                var img = star.getImage();
                var position = star.getPosition();
                if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                    _this.context.drawImage(img, position.x, position.y, img.width, img.height);
                }
                else {
                    _this.context.fillStyle = "#ffffff";
                    _this.context.fillRect(position.x, position.y, 2, 2);
                }
            });
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                var position = go.getPosition();
                var img = go.getImage();
                position.x = Math.min(_this.CANVAS_WIDTH - img.width, Math.max(0, position.x));
                position.y = Math.min(_this.CANVAS_HEIGHT - img.height, Math.max(0, position.y));
                // Si un Alien atteint le bas du canvas ⇒ Terre -1 PV et Alien détruit (même s’il n’est pas tué)
                if (go instanceof Alien) {
                    var yBottom = go.getPosition().y + go.getImage().height;
                    if (yBottom >= _this.CANVAS_HEIGHT) {
                        _this.earthHp = Math.max(0, _this.earthHp - 1);
                        _this.destroy(go);
                        if (_this.earthHp <= 0 && !_this.isOver)
                            _this.over();
                        return; // ne pas traiter les collisions d’un Alien déjà détruit
                    }
                }
                // Collisions
                _this.gameObjects.forEach(function (other) {
                    var _a, _b;
                    if (other !== go && go.overlap(other)) {
                        // Alien → Player
                        if (go instanceof Alien && other === _this.player) {
                            go.callCollide(_this.player);
                        }
                        // Laser → Alien
                        if (go instanceof Laser && other instanceof Alien) {
                            go.callCollide(other);
                            _this.addKill();
                        }
                        // Alien ↔ Earth ⇒ Terre -1 PV, Alien détruit
                        if (go instanceof Alien && ((_a = other.constructor) === null || _a === void 0 ? void 0 : _a.name) === "Earth") {
                            _this.earthHp = Math.max(0, _this.earthHp - 1);
                            _this.destroy(go);
                            if (_this.earthHp <= 0 && !_this.isOver)
                                _this.over();
                        }
                        if (((_b = go.constructor) === null || _b === void 0 ? void 0 : _b.name) === "Earth" && other instanceof Alien) {
                            _this.earthHp = Math.max(0, _this.earthHp - 1);
                            _this.destroy(other);
                            if (_this.earthHp <= 0 && !_this.isOver)
                                _this.over();
                        }
                    }
                });
            });
            // HUD
            _this.drawHUD();
            // Enchaînement des vagues: planifier UNE SEULE fois la suivante quand il ne reste plus d'aliens
            if (!_this.isOver) {
                var hasAliens = _this.gameObjects.some(function (go) { return go instanceof Alien; });
                if (!hasAliens && !_this.isNextWaveScheduled) {
                    _this.isNextWaveScheduled = true;
                    window.setTimeout(function () {
                        // Passe à la vague suivante
                        _this.waveIndex++;
                        // Calcule la taille de la vague suivante pour mettre à jour l’objectif cumulatif
                        var nextLevel = _this.waveIndex + 1;
                        var nextCount = 10;
                        _this.totalKillsTarget += nextCount;
                        // Pose la nouvelle vague (illimitée)
                        _this.spawnCurrentWave();
                        // Autorise la planification d’une prochaine vague
                        _this.isNextWaveScheduled = false;
                    }, _this.betweenWavesMs);
                }
            }
        }, 10);
    };
    Game.prototype.over = function () {
        if (this.isOver)
            return;
        this.isOver = true;
        if (this.loopId !== undefined) {
            clearInterval(this.loopId);
        }
        alert("GameOver");
        window.location.reload();
    };
    return Game;
}());
export { Game };
