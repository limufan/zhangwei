export class Utility{
    static arrayEquals(array1, array2){
        if(array1 === array2){
            return true;
        }

        let array1Json = "";
        if(array1){
            array1Json = JSON.stringify(array1);
        }

        let array2Json = "";
        if(array2){
            array2Json = JSON.stringify(array2);
        }

        if(array1Json === array2Json){
            return true;
        }

        return false;
    }
}