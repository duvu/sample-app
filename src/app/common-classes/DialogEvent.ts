/**
 * Created by beou on 5/28/17.
 */
export class DialogEvent {
    private _cancel: boolean;
    private _success: boolean;
    private _error: boolean;
    private _message: string;


    get cancel(): boolean {
        return this._cancel;
    }

    set cancel(value: boolean) {
        this._cancel = value;
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    get error(): boolean {
        return this._error;
    }

    set error(value: boolean) {
        this._error = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }

    setCancel() {
        this.cancel = true;
        this.error = false;
        this.success = false;
        this.message = null;
    }
    setError() {
        this.cancel = false;
        this.error = true;
        this.success = false;
        this.message = null;
    }
    setSuccess() {
        this.cancel = false;
        this.error = false;
        this.success = true;
        this.message = null;
    }
}