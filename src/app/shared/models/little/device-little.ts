export class DeviceLittle {
    public id: number;

    public name: string;
    public deviceId: string;

    //--additional
    public selected: boolean;
    public state: number; //stopped, living, idle
    public address: string;
    public latitude: number;
    public longitude: number;
    public lastUpdateTime: number;
}
