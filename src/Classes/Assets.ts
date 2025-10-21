export class Assets {
    public static getDefaultImage() {
        const image : HTMLImageElement = document.querySelector("img#asset_default");
        if(image == null) {
            throw Error("No assets found");
        }
        return image;
    }
}