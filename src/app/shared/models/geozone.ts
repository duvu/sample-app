import { AccountLittle } from 'app/shared/models/little/account-little';

export class Geozone {
    id: number;
    companyId: number;
    accounts: Array<AccountLittle>;
    name: string;
    color: string;
    maxSpeedKPH: number;
    isReverseGeozone: boolean;
    isPrivateArea: boolean;
    geometry: string;
}