/*
 * Illustrative data for the homepage morning view. Every name is fictional
 * and every figure is invented for the demo; the component labels it as
 * such. No money values on purpose: tiers stand in for account size, the
 * way Entec's own SimPRO tiering does. Ranking is deterministic and
 * explainable (see morning-view.tsx), which is the point: rules the owner
 * sets, applied to the signals, with the evidence shown.
 */
export type ItemKind = "account" | "enquiry" | "tender" | "service";

export type MorningItem = {
  id: string;
  name: string;
  kind: ItemKind;
  /* key accounts: invoicing pace versus last year, in percent (negative = behind) */
  pace?: number;
  tier?: "Diamond" | "Gold";
  /* enquiries: hours since it landed without a quote */
  hoursOpen?: number;
  /* public tenders: days until it closes */
  daysToClose?: number;
  /* completed installs with no service contract: days since completion */
  daysSinceInstall?: number;
};

export const MORNING_ITEMS: readonly MorningItem[] = [
  { id: "northgate", name: "Northgate Retail Park", kind: "account", pace: -18, tier: "Diamond" },
  { id: "marlow", name: "Marlow Logistics", kind: "account", pace: -12, tier: "Gold" },
  { id: "harbour", name: "Harbour Court Estates", kind: "account", pace: -6, tier: "Diamond" },
  { id: "westfield", name: "Westfield Dental", kind: "enquiry", hoursOpen: 52 },
  { id: "riverside", name: "Riverside Clinic", kind: "enquiry", hoursOpen: 30 },
  { id: "ashby", name: "Ashby Engineering", kind: "enquiry", hoursOpen: 9 },
  { id: "county", name: "County estates framework", kind: "tender", daysToClose: 6 },
  { id: "hillcrest", name: "Hillcrest Academy", kind: "service", daysSinceInstall: 41 },
  { id: "pinecrest", name: "Pinecrest Storage", kind: "service", daysSinceInstall: 12 },
] as const;

export const PACE_THRESHOLDS = [10, 15, 20] as const;
export const QUOTE_TARGETS = [24, 48] as const;

export const KIND_LABEL: Record<ItemKind, string> = {
  account: "key account",
  enquiry: "inquiry",
  tender: "tender",
  service: "service lead",
};
