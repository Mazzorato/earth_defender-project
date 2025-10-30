import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";

export class Heart extends GameObject {
    protected start() : void {
        this.setImage(Assets.getHeartImage());

        this.setPosition({
            x : this.getGame().CANVAS_WIDTH  - this.getImage().width,
            y : this.getGame().CANVAS_HEIGHT - this.getImage().height
        })
    }

    protected update(): void {
        this.setPosition({
            x : this.getPosition().x,
            y : this.getPosition().y
        })
    }
}