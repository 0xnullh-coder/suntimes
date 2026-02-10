export type RegionId =
  | "brisbane"
  | "gold-coast"
  | "sunshine-coast"
  | "tropical-north-qld"
  | "whitsundays"
  | "fraser-coast"
  | "outback-qld";

export interface Region {
  id: RegionId;
  name: string;
  description: string;
  heroImage: string | null;
  latitude: number;
  longitude: number;
  zoomLevel: number;
  bomStationId: string | null;
  bestTimeToVisit: string | null;
  insiderSummary: string | null;
  displayOrder: number;
}
