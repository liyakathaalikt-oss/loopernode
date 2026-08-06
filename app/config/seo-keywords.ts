// Primary Keywords
const PRIMARY_KEYWORDS = [
  "data annotation services",
  "training data services",
  "AI training data",
  "machine learning datasets",
  "data labeling services",
];

// Secondary Keywords (Specific Services)
const SECONDARY_KEYWORDS = [
  "image annotation",
  "video annotation",
  "text annotation",
  "audio annotation",
  "3D point cloud",
  "semantic segmentation",
  "bounding boxes",
  "polygon annotation",
  "keypoint annotation",
  "sentiment analysis",
  "named entity recognition",
];

// Industry Specific Keywords
const INDUSTRY_KEYWORDS = [
  "healthcare data annotation",
  "automotive training data",
  "retail machine learning datasets",
  "finance AI training data",
  "autonomous vehicle datasets",
  "medical image annotation",
];

// Long-tail and Action Keywords
const LONG_TAIL_KEYWORDS = [
  "high quality AI training data provider",
  "outsource data labeling services",
  "enterprise data annotation solutions",
  "secure training data collection",
  "RLHF data annotation for LLMs",
];

/**
 * Generates an array of SEO keywords based on the page type.
 * Next.js 16 metadata requires an array of strings for the 'keywords' field.
 */
export function generateKeywords(pageType: 'home' | 'services' | 'blog' | 'default' = 'default'): string[] {
  switch (pageType) {
    case 'home':
      return [...PRIMARY_KEYWORDS, ...LONG_TAIL_KEYWORDS, "enterprise AI", "RLHF"];
    case 'services':
      return [...PRIMARY_KEYWORDS, ...SECONDARY_KEYWORDS, ...INDUSTRY_KEYWORDS];
    case 'blog':
      return ["AI data insights", "machine learning blog", "data annotation best practices", ...PRIMARY_KEYWORDS];
    default:
      return [...PRIMARY_KEYWORDS];
  }
}
