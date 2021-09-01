import { Type } from "typescript";

class Util{
    public static checkAndGetUndifined = (variable: any) =>{
        let typeofVar = typeof variable;
        if(typeofVar == 'string'){
            return variable != null ? variable : "";
        }
        else if(typeofVar == 'number'){
            return variable != null ? variable : 0;
        }
        else if(Array.isArray(variable)){
            return variable != null ? variable : [];
        }
        else if(variable instanceof HTMLImageElement){
            if(variable.src != ""){
                return variable;
            }
            const tmpImage = new window.Image();
            tmpImage.src = 'img/top/loading.gif';
            return tmpImage;
        }
        return variable != null ? variable : false;
    }

    public static getHTMLImage = (path: string | string[], callback: (image: HTMLImageElement | HTMLImageElement[])=>void = ()=>{}) =>{
        if(Array.isArray(path)){
            let images: HTMLImageElement[] = [];

            let loadImgae = (imagePath: string) => new Promise((resolve) => {
                let image = new window.Image();
                image.src = window.location.origin+"/img/"+imagePath;
                image.onload = () => {
                    // setState will redraw layer
                    // because "image" property is changed
                    images.push(image);
                    resolve(null);
                };
            });

            (async () => {
                await path.reduce( (promise, p) => {
                    return promise.then( async () => {
                        await loadImgae(p);
                    });
                }, Promise.resolve());
                callback(images);
                return images;
            })();
        }
        let image = new window.Image();
        image.src = window.location.origin+"/img/"+path;
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            callback(image);
            return image;
        };
    }

    public static getImgPath = () =>{
        return window.location.origin + "/img";
    }

    public static checkType = (s: any, type: string) =>{
        return typeof s == type ? s : "";
    }
}

export default Util;