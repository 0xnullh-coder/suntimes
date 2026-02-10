// Queensland tourism statistics for context in responses
export const TOURISM_STATS = {
  industryValue: "$35B",
  internationalVisitors: "2.2M",
  olympics2032Impact: "$8.1B",
  topSourceMarkets: ["New Zealand", "UK", "USA", "China", "Japan"],
  employmentJobs: "237,000",
  domesticOvernightVisitors: "24.3M",
} as const;

export function getTourismContext(): string {
  return `Queensland tourism: ${TOURISM_STATS.industryValue} industry, ${TOURISM_STATS.internationalVisitors} international visitors annually, ${TOURISM_STATS.employmentJobs} jobs. Brisbane 2032 Olympics projected ${TOURISM_STATS.olympics2032Impact} economic impact.`;
}
