/**
 * Created by beou on 5/4/17.
 */
export class Device {
    //- device info
    accountID: string;
    uniqueID: string;
    groupID: string;
    deviceID: string;
    isActive: boolean;
    equipmentType: string;
    serialNumber: string;
    simPhoneNumber: string;
    smsEmail: string;
    imeiNumber: string;
    simID: string;
    expirationTime: number;

    //- vehicle info
    vehicleID: string;
    vehicleMake: string;
    vehicleModel: string;
    licensePlate: string;
    deviceCode: string;
    deviceType: string;
    speedLimitKPH: number;
    fuelCapacity: number;
    fuelEconomy: number;
    planDistanceKM: number;
    dcsPropertiesID: string;
    pushpinID: string;
    displayColor: string;

    driverID: string;
    driverStatus: number;

    dataKey: string;
    ignitionIndex: number;
    codeVersion: number;
    featureSet: string;
    ipAddressValid: string;
    lastTotalConnectTime: number;
    lastDuplexConnectTime: number;
    pendingPingCommand: string;
    lastPingTime: number;
    totalPingCount: number;
    maxPingCount: number;

    dcsConfigMask: number;
    supportsDMTP: boolean;
    supportedEncodings: boolean;
    unitLimitInterval: number;
    maxAllowedEvents: number;
    totalProfileMask: string;
    totalMaxConn: number;
    totalMaxConnPerMin: number;
    duplexProfileMask: string;
    duplexMaxConn: number;
    duplexMaxConnPerMin: number;
    ipAddressCurrent: string;
    remotePortCurrent: number;
    listenPortCurrent: number;

    //- last event info
    lastInputState: number;
    lastBatteryLevel: number;
    lastFuelLevel: number;
    lastFuelTotal: number;
    lastOilLevel: number;
    lastValidLatitude: number;
    lastValidLongitude: number;
    lastValidHeading: number;
    lastGPSTimestamp: number;
    lastEventTimestamp: number;
    lastCellServingInfo: string;
    expectAck: boolean;
    lastAckCommand: string;
    lastAckTime: number;
    lastTcpSessionID: string;
    lastIgnitionHours: number;
    lastStopTime: number;
    lastStartTime: number;

    lastOdometerKM: number;
    odometerOffsetKM: number;
    lastEngineHours: number;
    engineHoursOffset: number;
    lastIgnitionOnTime: number;
    lastIgnitionOffTime: number;
    displayName: string;
    description: string;
    notes: string;
    lastUpdateTime:number;
    lastUpdateUser: string;
    deviceKey: string;
    creationTime: number;
    allowNotify: boolean;
    lastNotifyTime: number;
    lastNotifyCode: number;
    notifyEmail: string;

    //- notify
    notifySelector: string;
    notifyAction: number;
    notifyDescription: string;
    notifySubject: string;
    notifyText: string;
    notifyUseWrapper: boolean;
    notifyPriority: number;


    parkedLatitude: number;
    parkedLongitude: number;
    parkedRadius: number;
    lastDataPushTime: number;
    lastEventCreateMillis: number;
    activeCorridor: string;
    fixedLatitude: number;
    fixedLongitude: number;
    fixedAddress: string;
    fixedContactPhone: string;
    fixedServiceTime: number;
    linkURL: string;
    linkDescription: string;
    borderCrossing: boolean;
    lastBorderCrossTime: number;

    //- maintain interval
    maintIntervalKM0: number;
    maintOdometerKM0: number;
    maintIntervalKM1: number;
    maintOdometerKM1: number;
    maintIntervalHR0: number;
    maintEngHoursHR0: number;
    maintNotes: string;

    //- job
    workOrderID: string;
    jobNumber: string;
    jobLatitude: number;
    jobLongitude: number;
    jobRadius: number;
    customAttributes: string;
    destination: string;


    lastMalfunctionLamp: boolean;
    lastFaultCode: string;
    lastNotifyRule: string;
    assignedUserID: string;
    thermalProfile: string;
    reminderMessage: string;
    reminderInterval: string;
    reminderTime: number;
    lastServiceTime: number;
    nextServiceTime: number;
    lastDistanceKM: number;


    installTime: number;
    resetTime: number;
    commandStateMask: number;
    expectAckCode: number;
    dcsCommandHost: string;
    lastOutputState: number;
    hoursOfOperation: string;
    statusCodeState: number;
    lastEngineOnTime: number;
    lastEngineOffTime: number;
    lastEventsPerSecondMS: number;
    lastEventsPerSecond: number;
    equipmentStatus: string;
    licenseExpire: number;
    fuelRatePerHour: number;
    dcsConfigString: string;
    lastValidSpeedKPH: number;
    lastEngineOnHours: number;
    lastIgnitionOnHours: number;
    pendingMessage: string;
    pendingMessageACK: string;
    fuelMillimeter: number;
    fuelCostPerLiter: number;
    fuelTankProfile: string;
    insuranceExpire: number;
    parkedMaxSpeedKPH: number;
}