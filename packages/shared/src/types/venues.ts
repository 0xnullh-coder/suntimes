export type VenueType =
  | "restaurant"
  | "cafe"
  | "bar"
  | "attraction"
  | "beach"
  | "park"
  | "market"
  | "experience"
  | "accommodation";

export type PriceLevel = "free" | "budget" | "moderate" | "upscale" | "luxury";

export interface Venue {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  suburb: string | null;
  type: VenueType;
  cuisine: string | null;
  priceLevel: PriceLevel;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  phone: string | null;
  website: string | null;
  googlePlaceId: string | null;
  suntimesRating: number;
  googleRating: number | null;
  insiderTip: string;
  description: string;
  tags: string[];
  isVerified: boolean;
  isFeatured: boolean;
  openingHours: Record<string, string> | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
