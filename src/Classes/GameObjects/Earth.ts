import { Assets } from "../Assets";
import { GameObject } from "./GameObject";

export class Earth extends GameObject{

    protected start() : void {
        this.setImage(Assets.getEarthImage());

        this.setPosition({
            x : this.getGame().CANVAS_WIDTH /2 - this.getImage().width/2,
            y : this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        })
    }

    protected update(): void {
        this.setPosition({
            x : this.getPosition().x,
            y : this.getPosition().y
        });
    }
}