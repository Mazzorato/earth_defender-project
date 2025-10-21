var gameName = "EarthDefender!";
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
    var CANVAS_WIDTH = 900;
    var CANVAS_HEIGHT = 500;
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var alienImage = document.querySelector("img.alien");
    var playerImage = document.querySelector("img.player");
    var earthImage = document.querySelector("img.earth");
    var laserImage = document.querySelector("img.laster");
    var starImage = document.querySelector("img.star");
    var heartImage = document.querySelector("img.heart");
    setInterval(function () {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = "#141414";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    });
}
