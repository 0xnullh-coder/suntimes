export type EventCategory =
  | "food"
  | "music"
  | "markets"
  | "family"
  | "outdoor"
  | "arts"
  | "sports"
  | "festival";

export interface SuntimesEvent {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  suburb: string | null;
  category: EventCategory;
  description: string;
  venueName: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  startDate: Date;
  endDate: Date | null;
  isRecurring: boolean;
  recurrencePattern: string | null;
  price: string | null;
  website: string | null;
  insiderTip: string | null;
  isSuntimesPick: boolean;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
