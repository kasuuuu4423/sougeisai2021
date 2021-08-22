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
        return variable != null ? variable : false;
    }

    public static getHTMLImage = (path: string, callback: (image: HTMLImageElement)=>void = ()=>{}) =>{
        let image = new window.Image();
        image.src = window.location.origin+"/img/"+path;
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            callback(image);
            return image;
        };
    }
}

export default Util;