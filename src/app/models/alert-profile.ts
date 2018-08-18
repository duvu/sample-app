import { ContactLittle } from 'app/models/little/contact.little';
import { DaySelected } from 'app/shared/scheduler/weekday/weekday';

export class AlertProfile {
    id: number;
    name: string;
    description: string;
    publicInCompany: boolean;
    type: string;
    active: boolean;
    speedKph: number;
    zoneId: number;
    param1: number;
    param2: string;
    weekDays: DaySelected;
    dayTime: any;
    alertEmail: boolean;
    alertSms: boolean;
    alertApp: boolean;
    cannedAction: string;
    contacts: Array<ContactLittle>;
    subject: string;
    text: string;
    templateId: string;
    private createdBy: string;
    private updatedBy: string;
    private createdOn: Date;
    private updatedOn: Date;
}
