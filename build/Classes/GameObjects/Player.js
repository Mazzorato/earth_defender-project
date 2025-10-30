var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Assets } from "../Assets.js";
import { Input } from "../Input.js";
import { GameObject } from "./GameObject.js";
import { Laser } from "./Laser.js";
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastShootTime = Date.now();
        _this.shootInterval_ms = 200;
        return _this;
    }
    Player.prototype.start = function () {
        this.setImage(Assets.getPlayerImage());
        this.setPosition({
            x: this.getGame().CANVAS_WIDTH / 2 - this.getImage().width / 2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 80
        });
    };
    ;
    Player.prototype.update = function () {
        //console.log(Input.getAxisX());
        this.setPosition({
            //console.log(this.getPosition());
            x: this.getPosition().x + 10 * Input.getAxisX(),
            y: this.getPosition().y
        });
        //q d console.log((Input.getAxisX));
        console.log(Input.getIsShooting());
        if (Input.getIsShooting() &&
            ((Date.now() - this.lastShootTime) >= this.shootInterval_ms)) {
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }
    };
    return Player;
}(GameObject));
export { Player };
