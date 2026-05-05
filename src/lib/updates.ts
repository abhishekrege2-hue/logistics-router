export interface ServiceUpdate {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  lastUpdated: string;
  paragraphs: string[];
}

export const SERVICE_UPDATES: ServiceUpdate[] = [
  {
    slug: "middle-east-operational-update",
    title: "Middle East Operational Update",
    summary:
      "Transit adjustments across GCC lanes are improving reliability for India-Middle East e-commerce volumes.",
    publishedAt: "2026-04-11",
    lastUpdated: "2026-05-03 14:20 UTC",
    paragraphs: [
      "As of May 2026, westbound volumes from India into the Gulf Cooperation Council corridor remain elevated by 12.8% year over year, led by consumer electronics and pharma replenishment flows. To maintain transit predictability, Meridian SCM has expanded linehaul frequency via Dubai - DXB Logistics Park and introduced dynamic cutoff windows for Mumbai and Chennai export gateways.",
      "Our network monitoring indicates average dwell time reduction of 9 hours on key India-UAE lanes after introducing pre-clearance document validation at origin. Current lane performance shows median transit of 2.4 days for premium air and 7.1 days for deferred consolidated freight, with weather-related disruptions localized to less than 4% of weekly departures.",
      "Shippers moving into Saudi Arabia and Qatar are advised to continue early HS code validation and consignee VAT checks. These controls, combined with route balancing through Abu Dhabi and Doha hubs, are helping stabilize final-mile handoff and keeping on-time delivery above the 93% mark across priority trade lanes.",
    ],
  },
  {
    slug: "sustainability-innovation",
    title: "Sustainability Innovation",
    summary:
      "New green-fuel lane pilots and packaging optimization lowered modeled CO2 intensity across strategic corridors.",
    publishedAt: "2026-03-29",
    lastUpdated: "2026-05-04 09:05 UTC",
    paragraphs: [
      "During Q1-Q2 2026, Meridian SCM expanded sustainable fuel procurement on Asia-Europe and India-Singapore corridors. The blended low-emission fuel mix now covers 18% of contracted ocean capacity on selected services, while SAF-backed air allocations are available for enterprise premium shipments on request.",
      "The combined impact of fuel programs and carton right-sizing automation has reduced modeled emissions intensity by 11.6% on participating accounts. Enterprise dashboards now expose lane-level carbon estimates with shipment-level attribution so operations teams can compare cost, transit, and emissions trade-offs before booking.",
      "We are also rolling out reusable pallet wraps and returnable tote programs at high-throughput fulfillment nodes in Pune, Rotterdam, and Singapore. Early pilots suggest packaging material waste reductions between 14% and 19%, depending on SKU profile and reverse-logistics recovery rates.",
    ],
  },
  {
    slug: "global-trade-lane-outlook",
    title: "Global Trade Lane Outlook",
    summary:
      "2026 demand remains resilient, with selective capacity constraints and stronger digital compliance requirements.",
    publishedAt: "2026-04-21",
    lastUpdated: "2026-05-05 06:40 UTC",
    paragraphs: [
      "Globalization remains resilient in 2026 with diversified sourcing and nearshoring running in parallel. Our lane analytics show stable demand on APAC-EU and India-North America flows, while spot rate volatility persists on specific ocean loops due to equipment repositioning and periodic port congestion.",
      "Across regulated markets, digital customs filing and pre-arrival risk screening requirements are becoming stricter. Meridian SCM is expanding automated compliance checks, including invoice-country consistency, commodity risk flags, and origin-certificate validation, to reduce manual interventions and avoid clearance delays.",
      "Enterprise shippers should plan for scenario-based routing through multi-hub designs rather than single-gateway dependency. Customers using dual-hub playbooks with Rotterdam/Antwerp in Europe and Singapore/Hong Kong in Asia are currently seeing stronger schedule resilience under sudden lane disruptions.",
    ],
  },
];
