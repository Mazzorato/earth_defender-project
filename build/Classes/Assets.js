var Assets = /** @class */ (function () {
    function Assets() {
    }
    Assets.getDefaultImage = function () {
        var image = document.querySelector("img#asset_default");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    Assets.getPlayerImage = function () {
        var image = document.querySelector("img#asset_player");
        if (image == null) {
            throw Error("No assets found");
        }
        return image;
    };
    Assets.getAlienImage = function () {
        var image = document.querySelector("img#asset_alien");
        if (image == null)
            throw Error("No assets found");
        return image;
    };
    Assets.getStarImage = function () {
        var image = document.querySelector("img#asset_star");
        if (image == null)
            throw Error("No assets found");
        return image;
    };
    Assets.getLaserImage = function () {
        var image = document.querySelector("img#asset_laser");
        if (image == null)
            throw Error("No assets found");
        return image;
    };
    Assets.getEarthImage = function () {
        var image = document.querySelector("img#asset_earth");
        if (image == null)
            throw Error("No assets found");
        return image;
    };
    return Assets;
}());
export { Assets };
