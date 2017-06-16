import {Util} from "../utils/Util";
/**
 * Created by beou on 4/18/17.
 */



export class Account {
    accountID: number;          accountType: number;        notifyEmail: number;        speedUnits: number;
    distanceUnits: number;      volumeUnits: number;        pressureUnits: number;      economyUnits: number;
    temperatureUnits: number;   latLonFormat: number;       geocoderMode: number;       privateLabelName: number;
    isBorderCrossing: number;   retainedEventAge: number;   maximumDevices: number;     totalPingCount: number;
    maxPingCount: number;       autoAddDevices: number;     dcsPropertiesID: number;    expirationTime: number;
    defaultUser: number;        password: number;           token: number;              contactName: number;
    contactPhone: number;       contactEmail: number;       timeZone: number;           passwdQueryTime: number;
    lastLoginTime: number;      isActive: number;           displayName: number;        description: number;
    notes: number;              mapLegendDevice: number;    mapLegendGroup: number;     isAccountManager: number;
    managerID: number;          requestPassCode: number;    requestIPAddress: number;   dataPushURL: number;
    lastDataRequestTime: number;lastDataPushTime: number;   smsEnabled: number;         smsProperties: number;
    emailProperties: number;    passwdChangeTime: number;   addressLine1: number;       addressLine2: number;
    addressLine3: number;       addressCity: number;        addressState: number;       addressPostalCode: number;
    addressCountry: number;     allowNotify: number;        currencyUnits: number;      fuelCostPerLiter: number;
    roleID: number;             allowWebService: number;    lastUpdateTime: number;     lastUpdateUser: number;
    creationTime: number;
    constructor () {
        this.accountID = 1;             this.accountType = 0;       this.notifyEmail = 1;       this.speedUnits = 1;
        this.distanceUnits = 1;         this.volumeUnits = 1;       this.pressureUnits = 1;     this.economyUnits = 1;
        this.temperatureUnits = 1;      this.latLonFormat = 0;      this.geocoderMode = 0;      this.privateLabelName = 0;
        this.isBorderCrossing = 0;      this.retainedEventAge = 0;  this.maximumDevices = 1;    this.totalPingCount = 0;
        this.maxPingCount = 0;          this.autoAddDevices = 0;    this.dcsPropertiesID = 0;   this.expirationTime = 1;
        this.defaultUser = 0;           this.password = 0;          this.token = 0;             this.contactName = 1;
        this.contactPhone = 0;          this.contactEmail = 1;      this.timeZone = 1;          this.passwdQueryTime = 0;
        this.lastLoginTime = 0;         this.isActive = 1;          this.displayName = 1;       this.description = 1;
        this.notes = 1;                 this.mapLegendDevice = 0;   this.mapLegendGroup = 0;    this.isAccountManager = 0;
        this.managerID = 0;             this.requestPassCode = 0;   this.requestIPAddress = 0;  this.dataPushURL = 0;
        this.lastDataRequestTime = 0;   this.lastDataPushTime = 0;  this.smsEnabled = 1;        this.smsProperties = 0;
        this.emailProperties = 0;       this.passwdChangeTime = 0;  this.addressLine1 = 1;      this.addressLine2 = 1;
        this.addressLine3 = 0;          this.addressCity = 1;       this.addressState = 1;      this.addressPostalCode = 1;
        this.addressCountry = 0;        this.allowNotify = 1;       this.currencyUnits = 1;     this.fuelCostPerLiter = 0;
        this.roleID = 0;                this.allowWebService = 1;   this.lastUpdateTime = 1;    this.lastUpdateUser = 0;
        this.creationTime = 1;
    }
    static setValue(acc: Account, value: number) {
        if (!acc) {
            acc = new Account;
        }
        acc.accountID = value;             acc.accountType = value;       acc.notifyEmail = value;       acc.speedUnits = value;
        acc.distanceUnits = value;         acc.volumeUnits = value;       acc.pressureUnits = value;     acc.economyUnits = value;
        acc.temperatureUnits = value;      acc.latLonFormat = value;      acc.geocoderMode = value;      acc.privateLabelName = value;
        acc.isBorderCrossing = value;      acc.retainedEventAge = value;  acc.maximumDevices = value;    acc.totalPingCount = value;
        acc.maxPingCount = value;          acc.autoAddDevices = value;    acc.dcsPropertiesID = value;   acc.expirationTime = value;
        acc.defaultUser = value;           acc.password = value;          acc.token = value;             acc.contactName = value;
        acc.contactPhone = value;          acc.contactEmail = value;      acc.timeZone = value;          acc.passwdQueryTime = value;
        acc.lastLoginTime = value;         acc.isActive = value;          acc.displayName = value;       acc.description = value;
        acc.notes = value;                 acc.mapLegendDevice = value;   acc.mapLegendGroup = value;    acc.isAccountManager = value;
        acc.managerID = value;             acc.requestPassCode = value;   acc.requestIPAddress = value;  acc.dataPushURL = value;
        acc.lastDataRequestTime = value;   acc.lastDataPushTime = value;  acc.smsEnabled = value;        acc.smsProperties = value;
        acc.emailProperties = value;       acc.passwdChangeTime = value;  acc.addressLine1 = value;      acc.addressLine2 = value;
        acc.addressLine3 = value;          acc.addressCity = value;       acc.addressState = value;      acc.addressPostalCode = value;
        acc.addressCountry = value;        acc.allowNotify = value;       acc.currencyUnits = value;     acc.fuelCostPerLiter = value;
        acc.roleID = value;                acc.allowWebService = value;   acc.lastUpdateTime = value;    acc.lastUpdateUser = value;
        acc.creationTime = value;
        return acc;
    }

    set(value: number) {
        this.accountID = value;             this.accountType = value;       this.notifyEmail = value;       this.speedUnits = value;
        this.distanceUnits = value;         this.volumeUnits = value;       this.pressureUnits = value;     this.economyUnits = value;
        this.temperatureUnits = value;      this.latLonFormat = value;      this.geocoderMode = value;      this.privateLabelName = value;
        this.isBorderCrossing = value;      this.retainedEventAge = value;  this.maximumDevices = value;    this.totalPingCount = value;
        this.maxPingCount = value;          this.autoAddDevices = value;    this.dcsPropertiesID = value;   this.expirationTime = value;
        this.defaultUser = value;           this.password = value;          this.token = value;             this.contactName = value;
        this.contactPhone = value;          this.contactEmail = value;      this.timeZone = value;          this.passwdQueryTime = value;
        this.lastLoginTime = value;         this.isActive = value;          this.displayName = value;       this.description = value;
        this.notes = value;                 this.mapLegendDevice = value;   this.mapLegendGroup = value;    this.isAccountManager = value;
        this.managerID = value;             this.requestPassCode = value;   this.requestIPAddress = value;  this.dataPushURL = value;
        this.lastDataRequestTime = value;   this.lastDataPushTime = value;  this.smsEnabled = value;        this.smsProperties = value;
        this.emailProperties = value;       this.passwdChangeTime = value;  this.addressLine1 = value;      this.addressLine2 = value;
        this.addressLine3 = value;          this.addressCity = value;       this.addressState = value;      this.addressPostalCode = value;
        this.addressCountry = value;        this.allowNotify = value;       this.currencyUnits = value;     this.fuelCostPerLiter = value;
        this.roleID = value;                this.allowWebService = value;   this.lastUpdateTime = value;    this.lastUpdateUser = value;
        this.creationTime = value;
    }
    get() {
        let arr = [
            this.accountID,             this.accountType,       this.notifyEmail,       this.speedUnits,
            this.distanceUnits,         this.volumeUnits,       this.pressureUnits,     this.economyUnits,
            this.temperatureUnits,      this.latLonFormat,      this.geocoderMode,      this.privateLabelName,
            this.isBorderCrossing,      this.retainedEventAge,  this.maximumDevices,    this.totalPingCount,
            this.maxPingCount,          this.autoAddDevices,    this.dcsPropertiesID,   this.expirationTime,
            this.defaultUser,           this.password,          this.token,             this.contactName,
            this.contactPhone,          this.contactEmail,      this.timeZone,          this.passwdQueryTime,
            this.lastLoginTime,         this.isActive,          this.displayName,       this.description,
            this.notes,                 this.mapLegendDevice,   this.mapLegendGroup,    this.isAccountManager,
            this.managerID,             this.requestPassCode,   this.requestIPAddress,  this.dataPushURL,
            this.lastDataRequestTime,   this.lastDataPushTime,  this.smsEnabled,        this.smsProperties,
            this.emailProperties,       this.passwdChangeTime,  this.addressLine1,      this.addressLine2,
            this.addressLine3,          this.addressCity,       this.addressState,      this.addressPostalCode,
            this.addressCountry,        this.allowNotify,       this.currencyUnits,     this.fuelCostPerLiter,
            this.roleID,                this.allowWebService,   this.lastUpdateTime,    this.lastUpdateUser,
            this.creationTime
        ];

        if (Util.arraySameValue(arr)) {
            return arr[0];
        } else {
            return 4; /*custom*/
        }
    }
}
export class Role {
    accountID: number;
    roleID: number;
    displayName: number;
    description: number;
    isActive: number;
    global: number;
    default: number;
    notes:number;
    constructor() {
        this.accountID = 0;
        this.roleID = 0;
        this.displayName = 0;
        this.description = 0;
        this.isActive = 0;
        this.global = 0;
        this.default = 0;
        this.notes = 3;
    }
    set(value: number) {
        this.accountID = value;
        this.roleID = value;
        this.displayName = value;
        this.description = value;
        this.isActive = value;
        this.global = value;
        this.default = value;
        this.notes = value;
    }
    get() {
        let arr = [
            this.accountID,
            this.roleID,
            this.displayName,
            this.description,
            this.isActive,
            this.global,
            this.default,
            this.notes,
        ];
        if (Util.arraySameValue(arr)) {
            return arr[0];
        } else {
            return 4; /*custom*/
        }
    }
}
export class Device {
    accountID: number;
    deviceID: number;
    constructor() {
        this.accountID = 0;
        this.deviceID = 0;
    }
    set(value: number) {
        this.accountID = value;
        this.deviceID = value;
    }
    get() {
        let arr = [
            this.accountID, this.deviceID
        ];
        if (Util.arraySameValue(arr)) {
            return arr[0];
        } else {
            return 4; /*custom*/
        }
    }
}

export class Pages {
    "map:live": number;
    "map:history": number;
    "report:summary": number;
    "report:speeding": number;
    "report:parking": number;
    "report:geozone": number;
    "admin:account": number;
    "admin:role": number;
    "admin:device": number;
    "admin:geozone": number;
    "admin:alert": number;
    constructor() {
        this["map:live"] = 0;
        this["map:history"] = 0;
        this["report:summary"] = 0;
        this["report:speeding"] = 0;
        this["report:parking"] = 0;
        this["report:geozone"] = 0;
        // this["admin:account"] = 0;
        // this["admin:role"] = 0;
        // this["admin:device"] = 0;
        // this["admin:geozone"] = 0;
        // this["admin:alert"] = 0;
    }
}
export class Fileds {
    account: Account;
    role: Role;
    device: Device;

    constructor() {
        this.account = new Account;
        this.role = new Role;
        this.device = new Device;
    }
}
//export class
export class RoleAcl {
    pages: Pages;
    fields: Fileds;
    constructor() {
        this.pages = new Pages();
        this.fields = new Fileds();
    }
}