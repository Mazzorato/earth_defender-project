export class Input{
    
    private static axisX : Direction = 0;
    public static getAxisX() : Direction {
        return this.axisX;
    }
    public static listen () {
        //Key Down
        document.addEventListener("keydown", (event)=> {
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
        document.addEventListener("keyup", (event)=> {
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
    }
}

export type Direction = 0 | 1 | -1;