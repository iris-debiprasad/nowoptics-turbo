const sqlToIANAMap: any = {
  AST: "America/Anguilla",
  EST: "America/New_York",
  CST: "America/Chicago",
  MST: "America/Denver", // ( on sql server MST means MT mountain time UTC-6);
  PST: "America/Los_Angeles",
  AKST: "America/Anchorage",
  HST: "Pacific/Honolulu",
  HAST: "Pacific/Honolulu",
  CHST: "Pacific/Guam",
  SST: "Pacific/Pago_Pago",
  IST: "Asia/Kolkata",
  MTAZ: "America/Phoenix", //all year follows MST (America/Arizona does not observe Daylight Saving Time except for Navajo County which will use MDT during day light saving time DST) ;
  UTC: "Etc/UTC",
  EDT: "America/New_York",
  CDT: "America/Chicago",
  MDT: "America/Denver",
  PDT: "America/Los_Angeles",
};

export function timezoneConverter(sqlTimeZone: string) {
  return sqlToIANAMap[sqlTimeZone] || sqlTimeZone;
}
