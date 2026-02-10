export interface AgentEnvironment {
  twitterUsername: string;
  twitterPassword: string;
  twitterEmail: string;
  anthropicApiKey: string;
  databaseUrl: string;
  pollInterval: number;
  maxRepliesPerDay: number;
  emergencyMode: boolean;
  timezone: string;
  siteUrl: string;
}

export function loadEnvironment(): AgentEnvironment {
  return {
    twitterUsername: process.env.TWITTER_USERNAME || "SuntimesQLD",
    twitterPassword: process.env.TWITTER_PASSWORD || "",
    twitterEmail: process.env.TWITTER_EMAIL || "",
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
    databaseUrl: process.env.DATABASE_URL || "",
    pollInterval: parseInt(process.env.TWITTER_POLL_INTERVAL || "90", 10),
    maxRepliesPerDay: parseInt(
      process.env.SUNTIMES_MAX_REPLIES_PER_DAY || "50",
      10
    ),
    emergencyMode: process.env.SUNTIMES_EMERGENCY_MODE === "true",
    timezone: process.env.SUNTIMES_TIMEZONE || "Australia/Brisbane",
    siteUrl:
      process.env.NEXT_PUBLIC_SITE_URL || "https://suntimes.nullh.xyz",
  };
}
