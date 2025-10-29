import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
var Game = /** @class */ (function () {
    function Game() {
        //Public attributs
        this.CANVAS_WIDTH = 900;
        this.CANVAS_HEIGHT = 600;
        this.nbAliens = 10;
        this.gameObjects = [];
        this.nbstar = 50;
        var canvas = document.querySelector("canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.context = canvas.getContext("2d");
    }
    Game.prototype.start = function () {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        //J'instancie un GameObject
        var gameObject = new GameObject(this);
        //Je le dessine 
        this.draw(gameObject);
        //Player ajouter au tableau de GameObject
        this.player = new Player(this);
        this.instanciate(this.player);
        //  this.draw(this.alien);
        for (var i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }
        for (var i = 0; i < this.nbstar; i++) {
            this.instanciate(new Star(this));
        }
        Input.listen();
        this.loop();
    };
    //tableau vide de GameObject
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
    //private isOver = false;
    Game.prototype.over = function () {
        //  if (this.isOver) return;
        //this.isOver = true;
        alert("GameOver");
        window.location.reload();
    };
    Game.prototype.loop = function () {
        var _this = this;
        setInterval(function () {
            _this.context.clearRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.context.fillStyle = "#141414";
            _this.context.fillRect(0, 0, _this.CANVAS_WIDTH, _this.CANVAS_HEIGHT);
            _this.gameObjects.forEach(function (go) {
                go.callUpdate();
                _this.draw(go);
                _this.gameObjects.forEach(function (other) {
                    if (other !== go && go.overlap(_this.player)) {
                        //console.log("Alien touche le joueur");
                        go.callCollide(_this.player);
                    }
                });
            });
        }, 10);
    };
    return Game;
}());
export { Game };
