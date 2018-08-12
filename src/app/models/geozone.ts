import { AccountLittle } from 'app/models/little/account.little';

export class Geofence {
    private _id: number;
    private _companyId: number;
    private _accounts: Array<AccountLittle>;
    private _name: string;
    private _color: string;
    private _maxSpeedKPH: number;
    private _reverseGeozone: boolean;
    private _privateArea: boolean;
    private _geometry: string | any;

    //track
    private _internalId: number;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(value: number) {
        this._companyId = value;
    }

    get accounts(): Array<AccountLittle> {
        return this._accounts;
    }

    set accounts(value: Array<AccountLittle>) {
        this._accounts = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get maxSpeedKPH(): number {
        return this._maxSpeedKPH;
    }

    set maxSpeedKPH(value: number) {
        this._maxSpeedKPH = value;
    }

    get reverseGeozone(): boolean {
        return this._reverseGeozone;
    }

    set reverseGeozone(value: boolean) {
        this._reverseGeozone = value;
    }

    get privateArea(): boolean {
        return this._privateArea;
    }

    set privateArea(value: boolean) {
        this._privateArea = value;
    }

    get geometry(): string | any {
        return this._geometry;
    }

    set geometry(value: string | any) {
        this._geometry = value;
    }

    get internalId(): number {
        return this._internalId;
    }

    set internalId(value: number) {
        this._internalId = value;
    }
}
