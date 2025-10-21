import { Assets } from "../Assets.js";
import { Position } from "./Position.js";

export class GameObject {

    private position: Position;
    private image : HTMLImageElement;

    constructor() {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
    }

    // Getter d'image et de position
    public getImage() : HTMLImageElement {
        return this.image;
    }
    public getPosition() : Position {
        return this.position;
    }
}