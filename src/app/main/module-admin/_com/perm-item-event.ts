/**
 * Created by beou on 5/11/17.
 */
export class PermItemEvent {
    private _value: number;
    private _name: string;

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }
    constructor(name: string, value: number) {
        this.value = value;
        this.name = name;
    }
}