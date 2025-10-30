import { GameObject } from "./GameObjects/GameObject.js";
import { Player } from "./GameObjects/Player.js";
import { Input } from "./Input.js";
import { Alien } from "./GameObjects/Alien.js";
import { Star } from "./GameObjects/Star.js";
import { Laser } from "./GameObjects/Laser.js";
import { Earth } from "./GameObjects/Earth.js";

export class Game {

    //Public attributs
    public readonly CANVAS_WIDTH: number = 900;
    public readonly CANVAS_HEIGHT: number = 600;

    //Private attributs
    private context: CanvasRenderingContext2D;
    private player: Player;
    private nbAliens: number = 10;
    private gameObjects: GameObject[] = [];
    private nbstar: number = 50;
    private stars : Star [] = [];
    // private heart : Heart; // si non utilisé, garder commenté

    // HUD / état
    private earthHp: number = 3;
    private earthHpMax: number = 3;
    private kills: number = 0;

    // Objectif cumulatif de kills (affichage “kills / objectif”)
    private totalKillsTarget: number = 10;  // palier courant d’objectif (10, 22, 36, …)
    private initialWaveAliens: number = 10; // taille de la 1re vague (utilisée pour l’objectif de départ)

    // Vagues (illimitées)
    private waveIndex: number = 0;                 // 0-based
    private betweenWavesMs: number = 1200;         // délai entre vagues
    private isNextWaveScheduled: boolean = false;  // empêche multiples setTimeout

    private loopId: number | undefined;
    private isOver: boolean = false;

    constructor() {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        canvas.width = this.CANVAS_WIDTH;
        canvas.height = this.CANVAS_HEIGHT;
        this.context = canvas.getContext("2d");
    }

    public getEarthHp(): number {
        return this.earthHp;
    }
    public get EartHpMax(): number {
        return this.earthHpMax;
    }
    public getKills(): number {
        return this.kills;
    }
    public addKill(): void {
        this.kills++;
    }

    public start(): void {
        this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
        this.context.fillStyle = "#141414";
        this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

        //J'instancie un GameObject
        const gameObject = new GameObject(this);

        //Je le dessine 
        this.draw(gameObject);

        // Player
        this.player = new Player(this);
        this.instanciate(this.player);

        // Earth
        this.instanciate(new Earth(this));

        // Vague initiale: conserver ta boucle for nbAliens
        for (let i = 0; i < this.nbAliens; i++) {
            this.instanciate(new Alien(this));
        }

        // Initialise l’objectif de kills pour la 1re vague
        this.totalKillsTarget = 10;

        // Stars
        for (let i = 0; i < this.nbstar; i++) {
            const star = new Star(this);
            this.stars.push(star);
        }

        Input.listen();
        this.loop();
    }

    public destroy(gameObject: GameObject): void {
        this.gameObjects = this.gameObjects.filter(go => go != gameObject);
    }
    public instanciate(gameObject: GameObject): void {
        this.gameObjects.push(gameObject);
    }
    public getPlayer(): Player {
        return this.player;
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

    // HUD minimal: kills + vague + PV Terre
    private drawHUD(): void {
        // Kills en haut gauche (affiche “kills cumulés / objectif cumulatif”)
        this.context.fillStyle = "#ffffff";
        this.context.font = "20px sans-serif";
        this.context.textAlign = "left";
        this.context.fillText(`${this.kills}/${this.totalKillsTarget}`, 20, 30);

        // Info vague
        this.context.fillStyle = "#bfbfbf";
        this.context.fillText(`Wave ${this.waveIndex + 1}`, 20, 54);

        // PV Terre en bas centre
        this.context.textAlign = "center";
        this.context.fillStyle = "#ff4d4d";
        this.context.fillText(`${this.earthHp} ♥`, this.CANVAS_WIDTH / 2, this.CANVAS_HEIGHT - 12);
    }

    // Vague illimitée: génère en fonction du numéro de vague (difficulté croissante)
    private spawnCurrentWave(): void {
        const aliensPerWave = 10;
        const currentAliens = this.gameObjects.filter(go => go instanceof Alien).length;
        const toSpawn = Math.max(0, aliensPerWave - currentAliens);
        const level = this.waveIndex + 1;
        const speed = Math.min(3.0, 0.1 + (level - 1) * 0.1);

        for (let i = 0; i < toSpawn; i++) {
            const alien = new Alien(this);
            (alien as any).speed = speed;
            this.instanciate(alien);
        }
    }

    private loop() {
        this.loopId = window.setInterval(() => {

            this.context.clearRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);
            this.context.fillStyle = "#141414";
            this.context.fillRect(0, 0, this.CANVAS_WIDTH, this.CANVAS_HEIGHT);

            this.stars.forEach(star => {
                star.callUpdate();
                const img = star.getImage();
                const position = star.getPosition();
                if (img && img.complete && img.naturalWidth > 0 && img.naturalHeight > 0){
                    this.context.drawImage(img, position.x, position.y, img.width, img.height);
                }else {
                    this.context.fillStyle = "#ffffff";
                    this.context.fillRect(position.x, position.y, 2, 2);
                }
            });
            this.gameObjects.forEach(go => {
                go.callUpdate();
                this.draw(go);
                const position = go.getPosition();
                const img = go.getImage();
                position.x = Math.min(this.CANVAS_WIDTH - img.width, Math.max(0, position.x));
                position.y = Math.min(this.CANVAS_HEIGHT - img.height, Math.max(0, position.y));

                // Si un Alien atteint le bas du canvas ⇒ Terre -1 PV et Alien détruit (même s’il n’est pas tué)
                if (go instanceof Alien) {
                    const yBottom = go.getPosition().y + go.getImage().height;
                    if (yBottom >= this.CANVAS_HEIGHT) {
                        this.earthHp = Math.max(0, this.earthHp - 1);
                        this.destroy(go);
                        if (this.earthHp <= 0 && !this.isOver) this.over();
                        return; // ne pas traiter les collisions d’un Alien déjà détruit
                    }
                }

                // Collisions
                this.gameObjects.forEach(other => {
                    if (other !== go && go.overlap(other)) {
                        // Alien → Player
                        if (go instanceof Alien && other === this.player) {
                            go.callCollide(this.player);
                        }

                        // Laser → Alien
                        if (go instanceof Laser && other instanceof Alien) {
                            go.callCollide(other);
                            this.addKill();
                        }

                        // Alien ↔ Earth ⇒ Terre -1 PV, Alien détruit
                        if (go instanceof Alien && (other as any).constructor?.name === "Earth") {
                            this.earthHp = Math.max(0, this.earthHp - 1);
                            this.destroy(go);
                            if (this.earthHp <= 0 && !this.isOver) this.over();
                        }
                        if ((go as any).constructor?.name === "Earth" && other instanceof Alien) {
                            this.earthHp = Math.max(0, this.earthHp - 1);
                            this.destroy(other);
                            if (this.earthHp <= 0 && !this.isOver) this.over();
                        }
                    }
                })
            });

            // HUD
            this.drawHUD();

            // Enchaînement des vagues: planifier UNE SEULE fois la suivante quand il ne reste plus d'aliens
            if (!this.isOver) {
                const hasAliens = this.gameObjects.some(go => go instanceof Alien);
                if (!hasAliens && !this.isNextWaveScheduled) {
                    this.isNextWaveScheduled = true;
                    window.setTimeout(() => {
                        // Passe à la vague suivante
                        this.waveIndex++;

                        // Calcule la taille de la vague suivante pour mettre à jour l’objectif cumulatif
                        const nextLevel = this.waveIndex + 1;
                        const nextCount = 10;
                        this.totalKillsTarget += nextCount;

                        // Pose la nouvelle vague (illimitée)
                        this.spawnCurrentWave();

                        // Autorise la planification d’une prochaine vague
                        this.isNextWaveScheduled = false;
                    }, this.betweenWavesMs);
                }
            }

        }, 10);
    }

    public over(): void {
        if (this.isOver) return;
        this.isOver = true;
        if (this.loopId !== undefined) {
            clearInterval(this.loopId);
        }
        alert("GameOver");
        window.location.reload();
    }
}
