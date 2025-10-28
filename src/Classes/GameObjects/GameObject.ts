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
    protected start() {

    }
    protected update() { }
    public callUpdate() {
        this.update();
    }

    public overlap(other: GameObject): boolean {
        const L = this.left()
        const L1 = other.left()

        const R = this.right()
        const R1 = other.right()

        const T = this.top()
        const T1 = other.top()

        const B = this.bottom()
        const B1 = other.bottom()

        if (this.left() <= other.right() &&
            this.right() >= other.left() &&
            this.top() <= other.bottom() &&
            this.bottom() >= other.top()) {
            return true;
        }
            return false;
        
    }

    public top(): number {
        return this.position.y;
    }
    public bottom(): number {
        return this.position.y + this.image.height;
    }
    public left(): number {
        return this.position.x;
    }
    public right(): number {
        return this.position.x + this.image.width;
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

}

