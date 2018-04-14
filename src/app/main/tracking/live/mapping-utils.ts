export class MappingUtils {
    public static COLOR_LIVING: string  = "#00e80e";
    public static COLOR_IDLE: string    = "#ffb403";
    public static COLOR_STOPPED: string = "#e23015";

    public static COLOR_SCHEME = [
        MappingUtils.COLOR_LIVING,
        MappingUtils.COLOR_IDLE,
        MappingUtils.COLOR_STOPPED
    ];
    public static getStatus(timestamp: number): string {
        const now = (new Date()).getTime();
        if (now - timestamp <= 300000 /*300 seconds*/) {
            return 'live';
        } else if (now - timestamp <= 30*60*1000) {
            return 'idle';
        } else {
            return 'stop';
        }
    }

    public static getColor(timestamp: number): string {
        const st = this.getStatus(timestamp);
        switch (st) {
            case 'live':
                return this.COLOR_LIVING;
            case 'idle':
                return this.COLOR_IDLE;
            case 'stop':
                return this.COLOR_STOPPED;
            default:
                return this.COLOR_STOPPED;
        }
    }
}