export class Input{
    
    private static axisX : Direction = 0;
    private static isShooting : boolean = false;
    public static getAxisX() : Direction {
        return this.axisX;
    }
    public static getIsShooting() : boolean{
        return Input.isShooting;
    }


    public static listen () {
        //Key Down
        document.addEventListener("keydown", (event)=> {
           // console.log(event.key);
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
                case " ":
                    Input.isShooting = true;
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
                case " ":
                    Input.isShooting = false;
                    break;
                default: 
                    break;
            }
        });
    }
}

export type Direction = 0 | 1 | -1;

