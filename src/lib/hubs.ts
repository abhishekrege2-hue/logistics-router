export type HubTier = "primary" | "secondary" | "tertiary";

export interface LogisticsHub {
  city: string;
  code: string;
  country: string;
  continent: "APAC" | "EMEA" | "AMER";
  tier: HubTier;
  x: number;
  y: number;
}

const PRIMARY = new Set([
  "Mumbai","Singapore","Dubai","Rotterdam","Los Angeles","Shanghai","Hamburg","New York",
]);
const SECONDARY = new Set([
  "Pune","Chennai","Aarhus","Copenhagen","Antwerp","Ho Chi Minh City","Santos","Sydney","Johannesburg",
]);

const HUB_SEED: Array<{ city: string; code: string; country: string; continent: "APAC" | "EMEA" | "AMER" }> = [
  { city: "Mumbai", code: "BOM", country: "India", continent: "APAC" },{ city: "Pune", code: "PNQ", country: "India", continent: "APAC" },{ city: "Delhi", code: "DEL", country: "India", continent: "APAC" },{ city: "Chennai", code: "MAA", country: "India", continent: "APAC" },{ city: "Bengaluru", code: "BLR", country: "India", continent: "APAC" },{ city: "Kolkata", code: "CCU", country: "India", continent: "APAC" },{ city: "Hyderabad", code: "HYD", country: "India", continent: "APAC" },{ city: "Mundra", code: "INMUN", country: "India", continent: "APAC" },
  { city: "Singapore", code: "SIN", country: "Singapore", continent: "APAC" },{ city: "Shanghai", code: "PVG", country: "China", continent: "APAC" },{ city: "Shenzhen", code: "SZX", country: "China", continent: "APAC" },{ city: "Hong Kong", code: "HKG", country: "China", continent: "APAC" },{ city: "Qingdao", code: "TAO", country: "China", continent: "APAC" },{ city: "Ningbo", code: "CNNGB", country: "China", continent: "APAC" },{ city: "Tianjin", code: "TSN", country: "China", continent: "APAC" },{ city: "Dalian", code: "DLC", country: "China", continent: "APAC" },
  { city: "Tokyo", code: "NRT", country: "Japan", continent: "APAC" },{ city: "Osaka", code: "KIX", country: "Japan", continent: "APAC" },{ city: "Nagoya", code: "NGO", country: "Japan", continent: "APAC" },{ city: "Yokohama", code: "JPYOK", country: "Japan", continent: "APAC" },{ city: "Seoul", code: "ICN", country: "Korea", continent: "APAC" },{ city: "Busan", code: "PUS", country: "Korea", continent: "APAC" },
  { city: "Bangkok", code: "BKK", country: "Thailand", continent: "APAC" },{ city: "Laem Chabang", code: "THLCH", country: "Thailand", continent: "APAC" },{ city: "Ho Chi Minh City", code: "SGN", country: "Vietnam", continent: "APAC" },{ city: "Hanoi", code: "HAN", country: "Vietnam", continent: "APAC" },{ city: "Jakarta", code: "CGK", country: "Indonesia", continent: "APAC" },{ city: "Surabaya", code: "SUB", country: "Indonesia", continent: "APAC" },
  { city: "Manila", code: "MNL", country: "Philippines", continent: "APAC" },{ city: "Cebu", code: "CEB", country: "Philippines", continent: "APAC" },{ city: "Kuala Lumpur", code: "KUL", country: "Malaysia", continent: "APAC" },{ city: "Port Klang", code: "MYPKG", country: "Malaysia", continent: "APAC" },{ city: "Penang", code: "PEN", country: "Malaysia", continent: "APAC" },
  { city: "Colombo", code: "CMB", country: "Sri Lanka", continent: "APAC" },{ city: "Karachi", code: "KHI", country: "Pakistan", continent: "APAC" },{ city: "Chittagong", code: "CGP", country: "Bangladesh", continent: "APAC" },{ city: "Dhaka", code: "DAC", country: "Bangladesh", continent: "APAC" },{ city: "Kathmandu", code: "KTM", country: "Nepal", continent: "APAC" },
  { city: "Perth", code: "PER", country: "Australia", continent: "APAC" },{ city: "Sydney", code: "SYD", country: "Australia", continent: "APAC" },{ city: "Melbourne", code: "MEL", country: "Australia", continent: "APAC" },{ city: "Brisbane", code: "BNE", country: "Australia", continent: "APAC" },{ city: "Auckland", code: "AKL", country: "New Zealand", continent: "APAC" },
  { city: "Dubai", code: "DXB", country: "UAE", continent: "EMEA" },{ city: "Abu Dhabi", code: "AUH", country: "UAE", continent: "EMEA" },{ city: "Jebel Ali", code: "AEJEA", country: "UAE", continent: "EMEA" },{ city: "Doha", code: "DOH", country: "Qatar", continent: "EMEA" },{ city: "Riyadh", code: "RUH", country: "Saudi Arabia", continent: "EMEA" },{ city: "Jeddah", code: "JED", country: "Saudi Arabia", continent: "EMEA" },
  { city: "Kuwait City", code: "KWI", country: "Kuwait", continent: "EMEA" },{ city: "Muscat", code: "MCT", country: "Oman", continent: "EMEA" },{ city: "Bahrain", code: "BAH", country: "Bahrain", continent: "EMEA" },{ city: "Istanbul", code: "IST", country: "Turkey", continent: "EMEA" },{ city: "Mersin", code: "TRMER", country: "Turkey", continent: "EMEA" },
  { city: "Rotterdam", code: "RTM", country: "Netherlands", continent: "EMEA" },{ city: "Amsterdam", code: "AMS", country: "Netherlands", continent: "EMEA" },{ city: "Antwerp", code: "ANR", country: "Belgium", continent: "EMEA" },{ city: "Brussels", code: "BRU", country: "Belgium", continent: "EMEA" },
  { city: "Hamburg", code: "HAM", country: "Germany", continent: "EMEA" },{ city: "Frankfurt", code: "FRA", country: "Germany", continent: "EMEA" },{ city: "Munich", code: "MUC", country: "Germany", continent: "EMEA" },{ city: "Berlin", code: "BER", country: "Germany", continent: "EMEA" },{ city: "Bremen", code: "DEBRE", country: "Germany", continent: "EMEA" },
  { city: "London", code: "LHR", country: "United Kingdom", continent: "EMEA" },{ city: "Manchester", code: "MAN", country: "United Kingdom", continent: "EMEA" },{ city: "Felixstowe", code: "GBFXT", country: "United Kingdom", continent: "EMEA" },{ city: "Southampton", code: "GBSOU", country: "United Kingdom", continent: "EMEA" },
  { city: "Aarhus", code: "DKAAR", country: "Denmark", continent: "EMEA" },{ city: "Copenhagen", code: "CPH", country: "Denmark", continent: "EMEA" },{ city: "Gothenburg", code: "GOT", country: "Sweden", continent: "EMEA" },{ city: "Stockholm", code: "ARN", country: "Sweden", continent: "EMEA" },{ city: "Oslo", code: "OSL", country: "Norway", continent: "EMEA" },{ city: "Helsinki", code: "HEL", country: "Finland", continent: "EMEA" },
  { city: "Paris", code: "CDG", country: "France", continent: "EMEA" },{ city: "Marseille", code: "MRS", country: "France", continent: "EMEA" },{ city: "Le Havre", code: "FRLEH", country: "France", continent: "EMEA" },{ city: "Lyon", code: "LYS", country: "France", continent: "EMEA" },{ city: "Lisbon", code: "LIS", country: "Portugal", continent: "EMEA" },{ city: "Porto", code: "OPO", country: "Portugal", continent: "EMEA" },{ city: "Madrid", code: "MAD", country: "Spain", continent: "EMEA" },{ city: "Barcelona", code: "BCN", country: "Spain", continent: "EMEA" },{ city: "Valencia", code: "VLC", country: "Spain", continent: "EMEA" },{ city: "Algeciras", code: "ESALG", country: "Spain", continent: "EMEA" },
  { city: "Genoa", code: "ITGOA", country: "Italy", continent: "EMEA" },{ city: "Milan", code: "MXP", country: "Italy", continent: "EMEA" },{ city: "Trieste", code: "TRS", country: "Italy", continent: "EMEA" },{ city: "Piraeus", code: "GRPIR", country: "Greece", continent: "EMEA" },{ city: "Athens", code: "ATH", country: "Greece", continent: "EMEA" },
  { city: "Warsaw", code: "WAW", country: "Poland", continent: "EMEA" },{ city: "Gdansk", code: "GDN", country: "Poland", continent: "EMEA" },{ city: "Prague", code: "PRG", country: "Czechia", continent: "EMEA" },{ city: "Vienna", code: "VIE", country: "Austria", continent: "EMEA" },{ city: "Zurich", code: "ZRH", country: "Switzerland", continent: "EMEA" },{ city: "Geneva", code: "GVA", country: "Switzerland", continent: "EMEA" },
  { city: "Dublin", code: "DUB", country: "Ireland", continent: "EMEA" },{ city: "Budapest", code: "BUD", country: "Hungary", continent: "EMEA" },{ city: "Bucharest", code: "OTP", country: "Romania", continent: "EMEA" },{ city: "Sofia", code: "SOF", country: "Bulgaria", continent: "EMEA" },{ city: "Belgrade", code: "BEG", country: "Serbia", continent: "EMEA" },{ city: "Kyiv", code: "KBP", country: "Ukraine", continent: "EMEA" },
  { city: "Johannesburg", code: "JNB", country: "South Africa", continent: "EMEA" },{ city: "Cape Town", code: "CPT", country: "South Africa", continent: "EMEA" },{ city: "Durban", code: "DUR", country: "South Africa", continent: "EMEA" },{ city: "Nairobi", code: "NBO", country: "Kenya", continent: "EMEA" },{ city: "Mombasa", code: "MBA", country: "Kenya", continent: "EMEA" },{ city: "Lagos", code: "LOS", country: "Nigeria", continent: "EMEA" },{ city: "Abuja", code: "ABV", country: "Nigeria", continent: "EMEA" },{ city: "Accra", code: "ACC", country: "Ghana", continent: "EMEA" },{ city: "Dar es Salaam", code: "DAR", country: "Tanzania", continent: "EMEA" },{ city: "Addis Ababa", code: "ADD", country: "Ethiopia", continent: "EMEA" },{ city: "Casablanca", code: "CMN", country: "Morocco", continent: "EMEA" },{ city: "Tangier", code: "TNG", country: "Morocco", continent: "EMEA" },{ city: "Cairo", code: "CAI", country: "Egypt", continent: "EMEA" },{ city: "Alexandria", code: "ALY", country: "Egypt", continent: "EMEA" },
  { city: "New York", code: "JFK", country: "United States", continent: "AMER" },{ city: "Los Angeles", code: "LAX", country: "United States", continent: "AMER" },{ city: "Long Beach", code: "USLGB", country: "United States", continent: "AMER" },{ city: "Chicago", code: "ORD", country: "United States", continent: "AMER" },{ city: "Houston", code: "IAH", country: "United States", continent: "AMER" },{ city: "Savannah", code: "USSAV", country: "United States", continent: "AMER" },{ city: "Seattle", code: "SEA", country: "United States", continent: "AMER" },{ city: "Miami", code: "MIA", country: "United States", continent: "AMER" },{ city: "Atlanta", code: "ATL", country: "United States", continent: "AMER" },{ city: "Dallas", code: "DFW", country: "United States", continent: "AMER" },{ city: "Memphis", code: "MEM", country: "United States", continent: "AMER" },{ city: "San Francisco", code: "SFO", country: "United States", continent: "AMER" },{ city: "Oakland", code: "USOAK", country: "United States", continent: "AMER" },{ city: "Boston", code: "BOS", country: "United States", continent: "AMER" },{ city: "Charleston", code: "USCHS", country: "United States", continent: "AMER" },
  { city: "Toronto", code: "YYZ", country: "Canada", continent: "AMER" },{ city: "Vancouver", code: "YVR", country: "Canada", continent: "AMER" },{ city: "Montreal", code: "YUL", country: "Canada", continent: "AMER" },{ city: "Calgary", code: "YYC", country: "Canada", continent: "AMER" },{ city: "Halifax", code: "YHZ", country: "Canada", continent: "AMER" },
  { city: "Mexico City", code: "MEX", country: "Mexico", continent: "AMER" },{ city: "Manzanillo", code: "MXZLO", country: "Mexico", continent: "AMER" },{ city: "Veracruz", code: "MXVER", country: "Mexico", continent: "AMER" },{ city: "Monterrey", code: "MTY", country: "Mexico", continent: "AMER" },
  { city: "Panama City", code: "PTY", country: "Panama", continent: "AMER" },{ city: "Colon", code: "PACLN", country: "Panama", continent: "AMER" },{ city: "San Jose", code: "SJO", country: "Costa Rica", continent: "AMER" },{ city: "Santo Domingo", code: "SDQ", country: "Dominican Republic", continent: "AMER" },
  { city: "Bogota", code: "BOG", country: "Colombia", continent: "AMER" },{ city: "Cartagena", code: "CTG", country: "Colombia", continent: "AMER" },{ city: "Lima", code: "LIM", country: "Peru", continent: "AMER" },{ city: "Callao", code: "PECLL", country: "Peru", continent: "AMER" },{ city: "Quito", code: "UIO", country: "Ecuador", continent: "AMER" },{ city: "Guayaquil", code: "GYE", country: "Ecuador", continent: "AMER" },
  { city: "Sao Paulo", code: "GRU", country: "Brazil", continent: "AMER" },{ city: "Santos", code: "BRSSZ", country: "Brazil", continent: "AMER" },{ city: "Rio de Janeiro", code: "GIG", country: "Brazil", continent: "AMER" },{ city: "Curitiba", code: "CWB", country: "Brazil", continent: "AMER" },{ city: "Recife", code: "REC", country: "Brazil", continent: "AMER" },
  { city: "Buenos Aires", code: "EZE", country: "Argentina", continent: "AMER" },{ city: "Rosario", code: "ARRSA", country: "Argentina", continent: "AMER" },{ city: "Montevideo", code: "MVD", country: "Uruguay", continent: "AMER" },{ city: "Asuncion", code: "ASU", country: "Paraguay", continent: "AMER" },{ city: "Santiago", code: "SCL", country: "Chile", continent: "AMER" },{ city: "Valparaiso", code: "VAP", country: "Chile", continent: "AMER" },{ city: "Antofagasta", code: "ANF", country: "Chile", continent: "AMER" }
];

function hash(seed: string) {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

function mapPoint(continent: LogisticsHub["continent"], seed: string) {
  const h = hash(seed);
  const xSpread = (h % 1000) / 1000;
  const ySpread = ((h / 1000) % 1000) / 1000;
  if (continent === "AMER") return { x: 8 + xSpread * 24, y: 20 + ySpread * 56 };
  if (continent === "EMEA") return { x: 35 + xSpread * 26, y: 12 + ySpread * 60 };
  return { x: 63 + xSpread * 28, y: 16 + ySpread * 58 };
}

export const GLOBAL_LOGISTICS_HUBS: LogisticsHub[] = HUB_SEED.map((hub) => {
  const p = mapPoint(hub.continent, `${hub.city}-${hub.code}`);
  return {
    ...hub,
    tier: PRIMARY.has(hub.city) ? "primary" : SECONDARY.has(hub.city) ? "secondary" : "tertiary",
    x: Number(p.x.toFixed(2)),
    y: Number(p.y.toFixed(2)),
  };
});

export const ROUTING_LOCATIONS = GLOBAL_LOGISTICS_HUBS.map(
  (hub) => `${hub.city}, ${hub.country} (${hub.code})`,
);

export const PRIMARY_HUB_NAMES = [...PRIMARY];
export const SECONDARY_HUB_NAMES = [...SECONDARY];

export const WEB_OF_TRADE_LANES: Array<[string, string]> = [
  ["Mumbai", "Rotterdam"],["Mumbai", "Aarhus"],["Mumbai", "Copenhagen"],["Pune", "Rotterdam"],["Pune", "Copenhagen"],
  ["Mumbai", "Singapore"],["Mumbai", "Dubai"],["Mumbai", "Shanghai"],["Singapore", "Rotterdam"],["Singapore", "Los Angeles"],
  ["Dubai", "Hamburg"],["Dubai", "New York"],["Shanghai", "Los Angeles"],["Shanghai", "Hamburg"],["Rotterdam", "New York"],
  ["Rotterdam", "Los Angeles"],["Hamburg", "New York"],["Dubai", "Santos"],["Singapore", "Sydney"],["Johannesburg", "Dubai"],
  ["Ho Chi Minh City", "Antwerp"],["Aarhus", "New York"],["Antwerp", "Los Angeles"],["Chennai", "Singapore"],["Pune", "Dubai"],
];
