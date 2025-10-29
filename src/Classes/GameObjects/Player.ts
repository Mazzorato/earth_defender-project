import { Assets } from "../Assets.js";
import { Input } from "../Input.js";
import { GameObject } from "./GameObject.js";
import { Laser } from "./Laser.js";

export class Player extends GameObject {

    public lastShootTime: number = Date.now();
    private shootInterval_ms: number = 200;
    protected start(): void {
        this.setImage(Assets.getPlayerImage());

        this.setPosition({
            x: this.getGame().CANVAS_WIDTH /2 - this.getImage().width/2,
            y: this.getGame().CANVAS_HEIGHT - this.getImage().height - 10
        });

    };

    protected update(): void {
        //console.log(Input.getAxisX());
        this.setPosition({
            //console.log(this.getPosition());
            x: this.getPosition().x + 10 * Input.getAxisX(),
            y: this.getPosition().y
        });
       //q d console.log((Input.getAxisX));
       console.log(Input.getIsShooting());   
          if(
            Input.getIsShooting() &&
            (
                (Date.now() - this.lastShootTime) >= this.shootInterval_ms
            )
        ){
            
            this.getGame().instanciate(new Laser(this.getGame()));
            this.lastShootTime = Date.now();
        }


    }
}
