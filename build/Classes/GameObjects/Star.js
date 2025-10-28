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
import { GameObject } from "./GameObject.js";
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 0.5;
        return _this;
    }
    Star.prototype.start = function () {
        this.setImage(Assets.getStarImage());
        this.setPosition({
            x: Math.random() * this.getGame().CANVAS_WIDTH,
            y: Math.random() * this.getGame().CANVAS_HEIGHT - 10,
        });
    };
    Star.prototype.update = function () {
        this.setPosition({
            x: this.getPosition().x,
            y: this.getPosition().y + 1
        });
        if (this.getPosition().y > this.getGame().CANVAS_HEIGHT) {
            this.setPosition({
                x: this.getPosition().x,
                y: 0
            });
        }
    };
    return Star;
}(GameObject));
export { Star };
