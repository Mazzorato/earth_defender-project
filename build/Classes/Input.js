var Input = /** @class */ (function () {
    function Input() {
    }
    Input.getAxisX = function () {
        return this.axisX;
    };
    Input.listen = function () {
        //Key Down
        document.addEventListener("keydown", function (event) {
            switch (event.key) {
                //Droite
                case "d":
                case "D":
                    Input.axisX = 1;
                    break;
                //Gauche
                case "q":
                case "Q":
                    Input.axisX = -1;
                    break;
                default:
                    break;
            }
        });
        //Key Up
        document.addEventListener("keyup", function (event) {
            switch (event.key) {
                //Player stop
                case "d":
                case "D":
                case "q":
                case "Q":
                    Input.axisX = 0;
                    break;
                default:
                    break;
            }
        });
    };
    Input.axisX = 0;
    return Input;
}());
export { Input };
