/**
 * Created by beou on 5/5/17.
 */
export class Util {
    static arraySameValue (arr: Array<any>) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== arr[0]) {
                return false;
            }
        }
        return true;
    }
}