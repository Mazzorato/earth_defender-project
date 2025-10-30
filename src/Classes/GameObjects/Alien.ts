import { Assets } from "../Assets.js";
import { GameObject } from "./GameObject.js";
import { Player } from "./Player.js";


export class Alien extends GameObject{
    private speed : number = 0.2;

    protected start(): void {
        this.setImage(Assets.getAlienImage());
        // Apparition aléatoire dans le Canvas.
        this.setPosition({
            x : Math.random() * this.getGame().CANVAS_WIDTH,
            y : Math.random() * this.getGame().CANVAS_HEIGHT /4 - 50,
        });
    }
    protected update():void {
        //console.log(this.getPosition());

        this.setPosition({
            x : this.getPosition().x,
            y : this.getPosition().y += this.speed
            
        })
    }

    protected collide(other: GameObject): void {
        if (other instanceof Player) {
           // console.log("Miam Miam !")
            this.getGame().over()
        }
        
    }
}