// Global Primary Keywords
const PRIMARY_KEYWORDS = [
  "data annotation services",
  "training data services",
  "AI training data",
  "machine learning datasets",
  "data labeling services",
];

// Global Secondary Keywords (Specific Services)
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

// Global Industry Keywords
const INDUSTRY_KEYWORDS = [
  "healthcare data annotation",
  "automotive training data",
  "retail machine learning datasets",
  "finance AI training data",
  "autonomous vehicle datasets",
  "medical image annotation",
];

// Global Long-tail Keywords
const LONG_TAIL_KEYWORDS = [
  "high quality AI training data provider",
  "outsource data labeling services",
  "enterprise data annotation solutions",
  "secure training data collection",
  "RLHF data annotation for LLMs",
];

// ==========================================
// REGIONAL KEYWORDS (INDIA)
// ==========================================

const INDIA_PRIMARY_KEYWORDS = [
  "Best AI data partner in India",
  "Top data annotation company India",
  "Leading AI training data provider India",
  "Best data labeling services India",
  "Trusted AI data partner India"
];

const INDIA_SECONDARY_KEYWORDS = [
  "Data annotation services India",
  "AI training data company India",
  "Machine learning datasets India",
  "Data labeling outsourcing India",
  "AI data solutions India"
];

const INDIA_LONG_TAIL_KEYWORDS = [
  "Best data annotation company for AI in India",
  "Top AI data partner for machine learning in India",
  "Affordable data labeling services India",
  "Professional AI training data provider India",
  "Data annotation outsourcing company India"
];

const INDIA_LOCATION_KEYWORDS = [
  "AI data partner Mumbai",
  "Data annotation company Bangalore",
  "AI training data provider Delhi",
  "Data labeling services Hyderabad",
  "AI data solutions Pune"
];

const INDIA_INDUSTRY_KEYWORDS = [
  "Healthcare AI data partner India",
  "Automotive AI training data India",
  "Retail data annotation India",
  "Finance AI datasets India",
  "E-commerce data labeling India"
];

/**
 * Generates an array of SEO keywords based on the page type.
 * Next.js 16 metadata requires an array of strings for the 'keywords' field.
 */
export function generateKeywords(pageType: 'home' | 'services' | 'blog' | 'default' = 'default'): string[] {
  switch (pageType) {
    case 'home':
      return [
        ...PRIMARY_KEYWORDS, 
        ...INDIA_PRIMARY_KEYWORDS,
        ...INDIA_LONG_TAIL_KEYWORDS,
        ...INDIA_LOCATION_KEYWORDS,
        "enterprise AI", 
        "RLHF"
      ];
    case 'services':
      return [
        ...PRIMARY_KEYWORDS, 
        ...SECONDARY_KEYWORDS, 
        ...INDIA_SECONDARY_KEYWORDS,
        ...INDUSTRY_KEYWORDS,
        ...INDIA_INDUSTRY_KEYWORDS
      ];
    case 'blog':
      return [
        "AI data insights", 
        "machine learning blog", 
        "data annotation best practices", 
        ...PRIMARY_KEYWORDS,
        ...INDIA_PRIMARY_KEYWORDS
      ];
    default:
      return [...PRIMARY_KEYWORDS, ...INDIA_PRIMARY_KEYWORDS];
  }
}
