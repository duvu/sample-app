/**
 * Created by beou on 5/11/17.
 */
export class ChangeEvent {
    private _type: string;
    private _value: number;

    constructor(type: string, value: number) {
        this._type = type;
        this._value = value;
    }
    set type(t: string) {
        this._type = t;
    }
    get type(): string {
        return this._type;
    }
    //--
    set value(v: number) {
        this._value = v;
    }
    get value(): number {
        return this._value;
    }
}