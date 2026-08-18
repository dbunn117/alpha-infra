/*
 * ILLUSTRATIVE sample data for the interactive Asset Map demo. Entirely
 * fictional — it mirrors the shape of the real-estate portfolio dashboard David
 * built at Stockbridge without exposing any confidential data.
 */

export type SampleAsset = {
  name: string;
  manager: string;
  sf: number; // rentable sq ft (thousands)
  rentPsf: number; // $/sf/yr
  occupancy: number; // 0..1
  tenants: string[];
};

export type Market = {
  id: string;
  name: string;
  x: number; // 0 (west) .. 1 (east)
  y: number; // 0 (north) .. 1 (south)
  assets: SampleAsset[];
};

export const MARKETS: Market[] = [
  {
    id: "sea",
    name: "Seattle",
    x: 0.08,
    y: 0.12,
    assets: [
      { name: "Elliott Bay Tower", manager: "N. Ferreira", sf: 420, rentPsf: 52, occupancy: 0.94, tenants: ["Cloudline", "Rainier Bio"] },
      { name: "Cascade Logistics", manager: "N. Ferreira", sf: 610, rentPsf: 19, occupancy: 0.97, tenants: ["Northpac Freight"] },
    ],
  },
  {
    id: "sf",
    name: "San Francisco",
    x: 0.06,
    y: 0.42,
    assets: [
      { name: "Mission & 4th", manager: "P. Adeyemi", sf: 380, rentPsf: 74, occupancy: 0.86, tenants: ["Vantacore", "Loop AI"] },
      { name: "Bayfront Labs", manager: "P. Adeyemi", sf: 240, rentPsf: 88, occupancy: 0.91, tenants: ["Helix Bio"] },
    ],
  },
  {
    id: "la",
    name: "Los Angeles",
    x: 0.17,
    y: 0.56,
    assets: [
      { name: "Arts District Lofts", manager: "R. Okafor", sf: 300, rentPsf: 46, occupancy: 0.9, tenants: ["Studio Nine", "Meridian"] },
      { name: "Vernon Distribution", manager: "R. Okafor", sf: 850, rentPsf: 16, occupancy: 0.99, tenants: ["WestGoods"] },
    ],
  },
  {
    id: "phx",
    name: "Phoenix",
    x: 0.29,
    y: 0.63,
    assets: [
      { name: "Camelback Commons", manager: "S. Villanueva", sf: 260, rentPsf: 33, occupancy: 0.88, tenants: ["Sunbelt Health"] },
      { name: "Sky Harbor Logistics", manager: "S. Villanueva", sf: 720, rentPsf: 14, occupancy: 0.95, tenants: ["Desert Freight", "PackRight"] },
    ],
  },
  {
    id: "den",
    name: "Denver",
    x: 0.43,
    y: 0.44,
    assets: [
      { name: "LoDo Exchange", manager: "T. Brenner", sf: 340, rentPsf: 41, occupancy: 0.83, tenants: ["Front Range Cap"] },
    ],
  },
  {
    id: "dal",
    name: "Dallas",
    x: 0.55,
    y: 0.68,
    assets: [
      { name: "Uptown Tower", manager: "M. Castellano", sf: 500, rentPsf: 38, occupancy: 0.92, tenants: ["Lone Star Fin", "Brightwork"] },
      { name: "DFW Trade Center", manager: "M. Castellano", sf: 980, rentPsf: 13, occupancy: 0.98, tenants: ["ShipCo"] },
    ],
  },
  {
    id: "chi",
    name: "Chicago",
    x: 0.64,
    y: 0.34,
    assets: [
      { name: "Loop 210", manager: "K. Osei", sf: 620, rentPsf: 44, occupancy: 0.81, tenants: ["Midwest Mutual", "Grainline"] },
      { name: "Pilsen Works", manager: "K. Osei", sf: 410, rentPsf: 22, occupancy: 0.93, tenants: ["Maker Collective"] },
    ],
  },
  {
    id: "atl",
    name: "Atlanta",
    x: 0.76,
    y: 0.6,
    assets: [
      { name: "Midtown 12", manager: "D. Whitfield", sf: 450, rentPsf: 36, occupancy: 0.9, tenants: ["Peachtree Health", "Kudzu Labs"] },
    ],
  },
  {
    id: "nyc",
    name: "New York",
    x: 0.9,
    y: 0.3,
    assets: [
      { name: "Hudson Yards 55", manager: "L. Marchetti", sf: 720, rentPsf: 96, occupancy: 0.88, tenants: ["Keystone Capital", "Arbor & Co"] },
      { name: "Flatiron 22", manager: "L. Marchetti", sf: 300, rentPsf: 82, occupancy: 0.94, tenants: ["Signal Media"] },
    ],
  },
  {
    id: "mia",
    name: "Miami",
    x: 0.86,
    y: 0.88,
    assets: [
      { name: "Brickell Bay", manager: "C. Delgado", sf: 390, rentPsf: 58, occupancy: 0.95, tenants: ["Sunward Wealth", "Marea"] },
    ],
  },
];

export type MetricKey = "sf" | "rentPsf" | "occupancy";

export const METRICS: { key: MetricKey; label: string; short: string }[] = [
  { key: "sf", label: "Square footage", short: "SF" },
  { key: "rentPsf", label: "Rent PSF", short: "Rent" },
  { key: "occupancy", label: "Occupancy", short: "Occ." },
];

// Aggregation helpers
export function marketTotalSf(m: Market): number {
  return m.assets.reduce((s, a) => s + a.sf, 0);
}
export function marketAvgRent(m: Market): number {
  const totalSf = marketTotalSf(m);
  if (!totalSf) return 0;
  return m.assets.reduce((s, a) => s + a.rentPsf * a.sf, 0) / totalSf;
}
export function marketAvgOccupancy(m: Market): number {
  const totalSf = marketTotalSf(m);
  if (!totalSf) return 0;
  return m.assets.reduce((s, a) => s + a.occupancy * a.sf, 0) / totalSf;
}
export function marketMetric(m: Market, key: MetricKey): number {
  if (key === "sf") return marketTotalSf(m);
  if (key === "rentPsf") return marketAvgRent(m);
  return marketAvgOccupancy(m);
}
