import {
  pgTable,
  text,
  uuid,
  decimal,
  integer,
  boolean,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ── Regions ────────────────────────────────────────────────────────
export const regions = pgTable("regions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  heroImage: text("hero_image"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  zoomLevel: integer("zoom_level"),
  bomStationId: text("bom_station_id"),
  bestTimeToVisit: text("best_time_to_visit"),
  insiderSummary: text("insider_summary"),
  displayOrder: integer("display_order"),
});

// ── Venues ─────────────────────────────────────────────────────────
export const venues = pgTable("venues", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  regionId: text("region_id").references(() => regions.id),
  suburb: text("suburb"),
  type: text("type").notNull(),
  cuisine: text("cuisine"),
  priceLevel: text("price_level").notNull(),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  address: text("address"),
  phone: text("phone"),
  website: text("website"),
  googlePlaceId: text("google_place_id"),
  suntimesRating: decimal("suntimes_rating").notNull(),
  googleRating: decimal("google_rating"),
  insiderTip: text("insider_tip").notNull(),
  description: text("description").notNull(),
  tags: text("tags").array(),
  isVerified: boolean("is_verified").default(true),
  isFeatured: boolean("is_featured").default(false),
  openingHours: jsonb("opening_hours"),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Events ─────────────────────────────────────────────────────────
export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  regionId: text("region_id").references(() => regions.id),
  suburb: text("suburb"),
  category: text("category").notNull(),
  description: text("description"),
  venueName: text("venue_name"),
  address: text("address"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  isRecurring: boolean("is_recurring"),
  recurrencePattern: text("recurrence_pattern"),
  price: text("price"),
  website: text("website"),
  insiderTip: text("insider_tip"),
  isSuntimesPick: boolean("is_suntimes_pick").default(false),
  images: text("images").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Itineraries ────────────────────────────────────────────────────
export const itineraries = pgTable("itineraries", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique(),
  regionId: text("region_id").references(() => regions.id),
  durationDays: integer("duration_days"),
  description: text("description"),
  targetAudience: text("target_audience"),
  budgetLevel: text("budget_level"),
  bestSeason: text("best_season"),
  days: jsonb("days"),
  totalEstimatedCost: text("total_estimated_cost"),
  isFeatured: boolean("is_featured"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Olympics Updates ───────────────────────────────────────────────
export const olympicsUpdates = pgTable("olympics_updates", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title"),
  category: text("category"),
  content: text("content"),
  venueName: text("venue_name"),
  regionId: text("region_id").references(() => regions.id),
  sourceUrl: text("source_url"),
  publishedDate: timestamp("published_date"),
  isFeatured: boolean("is_featured"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── Tweet Logs ─────────────────────────────────────────────────────
export const tweetLogs = pgTable("tweet_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  tweetId: text("tweet_id"),
  userHandle: text("user_handle"),
  userFollowers: integer("user_followers"),
  originalText: text("original_text"),
  intent: text("intent"),
  priorityScore: integer("priority_score"),
  regionMentioned: text("region_mentioned"),
  responseText: text("response_text"),
  responseTweetId: text("response_tweet_id"),
  modelUsed: text("model_used"),
  tokensInput: integer("tokens_input"),
  tokensOutput: integer("tokens_output"),
  llmCostUsd: decimal("llm_cost_usd"),
  portalLink: text("portal_link"),
  responseTimeMs: integer("response_time_ms"),
  wasSkipped: boolean("was_skipped").default(false),
  skipReason: text("skip_reason"),
  wasFlagged: boolean("was_flagged").default(false),
  flagReason: text("flag_reason"),
  isAutonomousPost: boolean("is_autonomous_post").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── Portal Users ───────────────────────────────────────────────────
export const portalUsers = pgTable("portal_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique(),
  name: text("name"),
  passwordHash: text("password_hash"),
  googleId: text("google_id"),
  tier: text("tier").default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  twitterHandle: text("twitter_handle"),
  savedVenueIds: uuid("saved_venue_ids").array(),
  savedItineraryIds: uuid("saved_itinerary_ids").array(),
  chatQueriesToday: integer("chat_queries_today").default(0),
  chatQueriesResetAt: timestamp("chat_queries_reset_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ── Review Queue ───────────────────────────────────────────────────
export const reviewQueue = pgTable("review_queue", {
  id: uuid("id").defaultRandom().primaryKey(),
  tweetLogId: uuid("tweet_log_id").references(() => tweetLogs.id),
  status: text("status"),
  draftResponse: text("draft_response"),
  finalResponse: text("final_response"),
  reviewerNotes: text("reviewer_notes"),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ── System Config ──────────────────────────────────────────────────
export const systemConfig = pgTable("system_config", {
  key: text("key").primaryKey(),
  value: text("value"),
  updatedAt: timestamp("updated_at").defaultNow(),
});
