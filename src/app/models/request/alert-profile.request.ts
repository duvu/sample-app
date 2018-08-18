import { Weekday } from 'app/shared/scheduler/weekday/weekday';

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
    weekDays: Weekday;
    dayTime: any;

    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;
    cannedAction: string;

    contactIds: Array<number>;

    subject: string;
    text: string;
    templateId: string;
}
