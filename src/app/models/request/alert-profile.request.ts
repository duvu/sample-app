export class AlertProfileRequest {
    private _name: string;
    private _description: string;
    private _companyId: number;
    private _accountIds: Array<number>;
    private _type: string;
    private _active: boolean;
    private _speedKph: number;
    private _zoneId: number;
    private _params1: string;
    private _params2: string;
    private _weekDays: string;
    private _time: string;
    private _cannedAction: string;
    private _notifyEmail: string;
    private _notifySms:string;
    private _emailSubject: string;
    private _emailText: string;
    private _emailTemplateId: string;

    private _smsText: string;
    private _sendCommand: string;


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get companyId(): number {
        return this._companyId;
    }

    set companyId(value: number) {
        this._companyId = value;
    }

    get accountIds(): Array<number> {
        return this._accountIds;
    }

    set accountIds(value: Array<number>) {
        this._accountIds = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get speedKph(): number {
        return this._speedKph;
    }

    set speedKph(value: number) {
        this._speedKph = value;
    }

    get zoneId(): number {
        return this._zoneId;
    }

    set zoneId(value: number) {
        this._zoneId = value;
    }

    get params1(): string {
        return this._params1;
    }

    set params1(value: string) {
        this._params1 = value;
    }

    get params2(): string {
        return this._params2;
    }

    set params2(value: string) {
        this._params2 = value;
    }

    get weekDays(): string {
        return this._weekDays;
    }

    set weekDays(value: string) {
        this._weekDays = value;
    }

    get time(): string {
        return this._time;
    }

    set time(value: string) {
        this._time = value;
    }

    get cannedAction(): string {
        return this._cannedAction;
    }

    set cannedAction(value: string) {
        this._cannedAction = value;
    }

    get notifyEmail(): string {
        return this._notifyEmail;
    }

    set notifyEmail(value: string) {
        this._notifyEmail = value;
    }

    get notifySms(): string {
        return this._notifySms;
    }

    set notifySms(value: string) {
        this._notifySms = value;
    }

    get emailSubject(): string {
        return this._emailSubject;
    }

    set emailSubject(value: string) {
        this._emailSubject = value;
    }

    get emailText(): string {
        return this._emailText;
    }

    set emailText(value: string) {
        this._emailText = value;
    }

    get emailTemplateId(): string {
        return this._emailTemplateId;
    }

    set emailTemplateId(value: string) {
        this._emailTemplateId = value;
    }

    get smsText(): string {
        return this._smsText;
    }

    set smsText(value: string) {
        this._smsText = value;
    }

    get sendCommand(): string {
        return this._sendCommand;
    }

    set sendCommand(value: string) {
        this._sendCommand = value;
    }
}