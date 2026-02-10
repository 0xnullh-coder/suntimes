export interface QualityCheckResult {
  passed: boolean;
  failures: string[];
}

export function checkResponseQuality(
  response: string,
  venueName?: string
): QualityCheckResult {
  const failures: string[] = [];

  // Length check
  if (response.length > 280) {
    failures.push(`Over 280 chars (${response.length})`);
  }

  // No "I" check (must use "we")
  const iPattern = /\b[Ii]\s+(am|was|think|believe|recommend|love|hate|feel)\b/;
  if (iPattern.test(response)) {
    failures.push("Contains first person singular — must use 'we'");
  }

  // Emoji count
  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const emojiCount = (response.match(emojiRegex) || []).length;
  if (emojiCount > 2) {
    failures.push(`Too many emoji (${emojiCount}, max 2)`);
  }

  // Hashtag count
  const hashtagCount = (response.match(/#\w+/g) || []).length;
  if (hashtagCount > 1) {
    failures.push(`Too many hashtags (${hashtagCount}, max 1)`);
  }

  // Brochure language check
  const brochurePatterns = [
    /hidden gem/i,
    /paradise awaits/i,
    /unforgettable experience/i,
    /don't miss out/i,
    /book now/i,
    /limited time/i,
  ];
  for (const pattern of brochurePatterns) {
    if (pattern.test(response)) {
      failures.push(`Contains brochure language: ${pattern.source}`);
    }
  }

  return {
    passed: failures.length === 0,
    failures,
  };
}
