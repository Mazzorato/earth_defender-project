export class Assets {
    public static getDefaultImage() {
        const image : HTMLImageElement = document.querySelector("img#asset_default");
        if(image == null) {
            throw Error("No assets found");
        }
        return image;
    }

    public static getPlayerImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_player");
        if(image == null){
            throw Error("No assets found");
        }
        return image;
    }

    public static getAlienImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_alien");
        if(image == null)  throw Error ("No assets found");
        
        return image;
    }

    public static getStarImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_star");
        if(image == null) throw Error ("No assets found");
        
        return image;
    }

    public static getLaserImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_laser");
        if(image == null) throw Error ("No assets found");
        return image;
    }

    public static getEarthImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_earth");
        if(image == null) throw Error ("No assets found");
        return image;
    }

    public static getHeartImage() : HTMLImageElement{
        const image : HTMLImageElement = document.querySelector("img#asset_heart");
        if(image == null) throw Error ("No assets found");
        return image;
    }
}