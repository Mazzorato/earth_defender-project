const gameName: string = "EarthDefender!";
console.log(gameName);


// POO =
// 1 class mère 
// 6 class "enfant"
// Enfant =>
//- Alien
//- Player
//- Star

window.onload = main;

function main() {

    const CANVAS_WIDTH = 900;
    const CANVAS_HEIGHT = 500;

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;



    const alienImage: HTMLImageElement = document.querySelector("img.alien");
    const playerImage: HTMLImageElement = document.querySelector("img.player");
    const earthImage: HTMLImageElement = document.querySelector("img.earth");
    const laserImage: HTMLImageElement = document.querySelector("img.laster");
    const starImage: HTMLImageElement = document.querySelector("img.star");
    const heartImage: HTMLImageElement = document.querySelector("img.heart");

    setInterval(()=> {
        context.clearRect(0,0, CANVAS_WIDTH,CANVAS_HEIGHT);
        context.fillStyle = "#141414";
        context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    })

}