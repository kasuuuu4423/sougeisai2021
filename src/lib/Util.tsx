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
}

export default Util;