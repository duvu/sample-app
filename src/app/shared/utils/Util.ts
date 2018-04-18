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

    static getTimeRangeString(timestamp: number): string {
        const time_range = ((new Date()).getTime() - timestamp) / 1000;

        if (time_range < 60) {
            return 'few seconds ago';
        } else if (time_range < 60 * 60) {
            return 'about '+ Math.round(time_range/60) +' minutes ago';
        } else if (time_range < 24 * 60 * 60) {
            return 'about ' + Math.round(time_range / (60 * 60)) + ' hours ago';
        } else {
            return 'about ' + Math.round(time_range / (24 * 60 * 60)) + ' days ago';
        }
    }

}