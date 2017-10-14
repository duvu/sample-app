/**
 * Created by beou on 6/24/17.
 */
export enum SpeedUnits {
    mph = 0, //miles per hours
    kph,    //km per hours
    knots   //
}
export enum DistanceUnits {
    miles = 0,
    km,
    nm
}
export enum VolumnUnits {
    US_GALLONS = 0, //  (0, I18N.getString(Account.class,"Account.volume.usgal"  ,"gal"  ), Account.US_GALLONS_PER_LITER  ),
    LITERS, //      (1, I18N.getString(Account.class,"Account.volume.liter"  ,"Liter"), 1.0                           ),  // default
    UK_GALLONS, //  (2, I18N.getString(Account.class,"Account.volume.ukgal"  ,"IG"   ), Account.UK_GALLONS_PER_LITER  ),
    CUBIC_FEET, //  (3, I18N.getString(Account.class,"Account.volume.cubicFt","ft^3" ), Account.CUBIC_FEET_PER_LITER  );
}
export enum PresureUnits {
    KPA = 0, //         (0, I18N.getString(Account.class,"Account.pressure.kPa" ,"kPa"  ), 1.0                 ),
    PSI,//         (1, I18N.getString(Account.class,"Account.pressure.psi" ,"psi"  ), Account.PSI_PER_KPA ),
    MMHG,//         (2, I18N.getString(Account.class,"Account.pressure.mmHg","mmHg" ), Account.MMHG_PER_KPA),
    BAR //         (3, I18N.getString(Account.class,"Account.pressure.bar" ,"bar"  ), Account.BAR_PER_KPA );
}
export enum EconomyUnits {
    MPG = 0, //miles per gallon
    KPL, //km per littre
    KPG, //km per gallon
    LP100KM, //Little per 100km
}
export enum TemperatureUnits {
    F = 0,
    C
}
export enum CurrencyUnits {
    USD = 0,
    AUD,
    NZD,
    CAD,
    GBP,
    DOP,
    EUR, // France/Germany/Ireland/Italy/Luxembourg/Spain
    INR,
    MXN,
    RUB,
    SAR
}