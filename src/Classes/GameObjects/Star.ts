import { GameObject } from "./GameObject.js";
import { Assets } from "../Assets.js";

export class Star extends GameObject {
    private verticalSpeed: number = 0.3;

    protected start(): void {
        const starImage = Assets.getStarImage?.() ?? Assets.getDefaultImage();
        this.setImage(starImage);
        const game = this.getGame();
        this.setPosition({
            x: Math.floor(Math.random() * game.CANVAS_WIDTH),
            y: Math.floor(Math.random() * game.CANVAS_HEIGHT)
        });
    }

    protected update(): void {
        const game = this.getGame();
        const position = this.getPosition();
        position.y += 0.3;
        if (position.y >= game.CANVAS_HEIGHT) position.y = 0;
    }
}
