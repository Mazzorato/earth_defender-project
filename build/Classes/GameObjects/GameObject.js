import { Assets } from "../Assets.js";
var GameObject = /** @class */ (function () {
    function GameObject(game) {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.game = game;
        this.start();
    }
    GameObject.prototype.start = function () { };
    GameObject.prototype.update = function () { };
    GameObject.prototype.collide = function (other) { };
    GameObject.prototype.callCollide = function (other) {
        this.collide(other);
    };
    GameObject.prototype.callUpdate = function () {
        this.update();
    };
    GameObject.prototype.overlap = function (other) {
        var L = this.left();
        var L1 = other.left();
        var R = this.right();
        var R1 = other.right();
        var T = this.top();
        var T1 = other.top();
        var B = this.bottom();
        var B1 = other.bottom();
        if (this.left() <= other.right() &&
            this.right() >= other.left() &&
            this.top() <= other.bottom() &&
            this.bottom() >= other.top()) {
            return true;
        }
        return false;
    };
    GameObject.prototype.top = function () {
        return this.position.y;
    };
    GameObject.prototype.bottom = function () {
        return this.position.y + this.image.height;
    };
    GameObject.prototype.left = function () {
        return this.position.x;
    };
    GameObject.prototype.right = function () {
        return this.position.x + this.image.width;
    };
    // Getter d'image et de position
    GameObject.prototype.getImage = function () {
        return this.image;
    };
    GameObject.prototype.getPosition = function () {
        return this.position;
    };
    GameObject.prototype.getGame = function () {
        return this.game;
    };
    GameObject.prototype.setImage = function (image) {
        this.image = image;
    };
    GameObject.prototype.setPosition = function (position) {
        this.position = position;
    };
    return GameObject;
}());
export { GameObject };
