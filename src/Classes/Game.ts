import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";


export class Game {

    //Public attributs
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;


    //Private attributs
    private context: CanvasRenderingContext2D;
    private player: Player;
    private nbAliens: number = 10;
    private gameObjects: GameObject[] = [];
    private nbstar : number = 100;

    constructor() {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.context = canvas.getContext("2d");
    }

    public start(): void {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        //J'instancie un GameObject
        const gameObject = new GameObject(this);
        
        //Je le dessine 
        this.draw(gameObject);
        //Player ajouter au tableau de GameObject
        this.player = new Player(this);
        this.instanciate(this.player);

        //  this.draw(this.alien);

        for (let i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }

        

        for (let i = 0; i < this.nbstar; i++) {
            this.instanciate(new Star(this));
        }
        Input.listen();


        this.loop();
    }
    //tableau vide de GameObject

    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }
    private draw(gameObject: GameObject) {
        this.context.drawImage(
            gameObject.getImage(),
            gameObject.getPosition().x,
            gameObject.getPosition().y,
            gameObject.getImage().width,
            gameObject.getImage().height
        );
    }

    private loop() {
        setInterval(() => {
            //console.log("Frame");

            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

            this.gameObjects.forEach(go => {
                go.callUpdate();
                this.draw(go);

                // methode overlap
                if(go instanceof Alien && this.player.overlap(go)){ 
                console.log("Alien touche le joueur");
                go.callCollide(this.player);
                }
            })
        }, 10);
    }
}

