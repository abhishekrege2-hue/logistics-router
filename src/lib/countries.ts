export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  continent: string;
}

const CONTINENT_COUNTRY_CODES = {
  Africa: [
    "DZ","AO","BJ","BW","BF","BI","CM","CV","CF","TD","KM","CG","CD","CI","DJ","EG","GQ","ER","SZ","ET","GA","GM","GH","GN","GW","KE","LS","LR","LY","MG","MW","ML","MR","MU","MA","MZ","NA","NE","NG","RW","ST","SN","SC","SL","SO","ZA","SS","SD","TZ","TG","TN","UG","ZM","ZW",
  ],
  Americas: [
    "AG","AR","BS","BB","BZ","BO","BR","CA","CL","CO","CR","CU","DM","DO","EC","SV","GD","GT","GY","HT","HN","JM","MX","NI","PA","PY","PE","KN","LC","VC","SR","TT","US","UY","VE",
  ],
  Asia: [
    "AF","AM","AZ","BH","BD","BT","BN","KH","CN","CY","GE","IN","ID","IR","IQ","IL","JP","JO","KZ","KW","KG","LA","LB","MY","MV","MN","MM","NP","KP","OM","PK","PS","PH","QA","SA","SG","KR","LK","SY","TW","TJ","TH","TL","TR","TM","AE","UZ","VN","YE",
  ],
  Europe: [
    "AL","AD","AT","BY","BE","BA","BG","HR","CZ","DK","EE","FI","FR","DE","GR","HU","IS","IE","IT","XK","LV","LI","LT","LU","MT","MD","MC","ME","NL","MK","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","UA","GB","VA",
  ],
  "Oceania": [
    "AU","FJ","KI","MH","FM","NR","NZ","PW","PG","WS","SB","TO","TV","VU",
  ],
} as const;

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

function codeToFlag(code: string) {
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0)),
    );
}

export const COUNTRY_OPTIONS: CountryOption[] = Object.entries(
  CONTINENT_COUNTRY_CODES,
).flatMap(([continent, codes]) =>
  [...codes]
    .sort((a, b) =>
      (regionNames.of(a) ?? a).localeCompare(regionNames.of(b) ?? b),
    )
    .map((code) => ({
      code,
      name: regionNames.of(code) ?? code,
      flag: codeToFlag(code),
      continent,
    })),
);

export const COUNTRY_OPTIONS_BY_CONTINENT = Object.fromEntries(
  Object.keys(CONTINENT_COUNTRY_CODES).map((continent) => [
    continent,
    COUNTRY_OPTIONS.filter((country) => country.continent === continent),
  ]),
) as Record<string, CountryOption[]>;
