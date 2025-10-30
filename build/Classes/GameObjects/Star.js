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
import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.verticalSpeed = 0.3;
        return _this;
    }
    Star.prototype.start = function () {
        var _a, _b;
        var starImage = (_b = (_a = Assets.getStarImage) === null || _a === void 0 ? void 0 : _a.call(Assets)) !== null && _b !== void 0 ? _b : Assets.getDefaultImage();
        this.setImage(starImage);
        var game = this.getGame();
        this.setPosition({
            x: Math.floor(Math.random() * game.CANVAS_WIDTH),
            y: Math.floor(Math.random() * game.CANVAS_HEIGHT)
        });
    };
    Star.prototype.update = function () {
        var game = this.getGame();
        var position = this.getPosition();
        position.y += 0.3;
        if (position.y >= game.CANVAS_HEIGHT)
            position.y = 0;
    };
    return Star;
}(GameObject));
export { Star };
