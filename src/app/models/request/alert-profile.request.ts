export class AlertProfileRequest {
    name: string;
    description: string;
    publicInCompany: boolean;
    type: string;
    active: boolean;
    speedKph: number;
    zoneId: number;
    params1: number;
    params2: string;
    weekDays: string;
    dayTime: string;

    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;
    cannedAction: string;

    contactIds: Array<number>;

    subject: string;
    text: string;
    templateId: string;
}
