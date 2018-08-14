export class AlertProfileRequest {
    name: string;
    description: string;
    companyId: number;
    accountIds: Array<number>;
    type: string;
    active: boolean;
    speedKph: number;
    zoneId: number;
    params1: string;
    params2: string;
    weekDays: string;
    time: string;
    cannedAction: string;
    notifyEmail: string;
    notifySms:string;
    emailSubject: string;
    emailText: string;
    emailTemplateId: string;

    smsText: string;
    sendCommand: string;
}
