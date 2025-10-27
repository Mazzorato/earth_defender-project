import { Assets } from "../Assets.js";
import { Game } from "../Game.js";
import { Position } from "./Position.js";

export class GameObject {

    private position: Position;
    private image: HTMLImageElement;
    private game: Game;

    constructor(game: Game) {
        this.position = {
            x: 0,
            y: 0
        };
        this.image = Assets.getDefaultImage();
        this.game = game;

        this.start();
    }

    // Getter d'image et de position
    public getImage(): HTMLImageElement {
        return this.image;
    }
    public getPosition(): Position {
        return this.position;
    }
    public getGame(): Game {
        return this.game;
    }
    public setImage(image: HTMLImageElement) {
        this.image = image;
    }
    public setPosition(position: Position) {
        this.position = position;
    }
    protected start() {

    }
}

 