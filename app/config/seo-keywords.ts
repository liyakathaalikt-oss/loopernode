// ==========================================
// BASE KEYWORDS
// ==========================================

const PRIMARY_KEYWORDS = [
  "data annotation services",
  "training data services",
  "AI training data",
  "machine learning datasets",
  "data labeling services",
];

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

const INDUSTRY_KEYWORDS = [
  "healthcare data annotation",
  "automotive training data",
  "retail machine learning datasets",
  "finance AI training data",
  "autonomous vehicle datasets",
  "medical image annotation",
];

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

// ==========================================
// INTERNATIONAL KEYWORDS (WORLDWIDE/GLOBAL)
// ==========================================

const GLOBAL_PRIMARY_KEYWORDS = [
  "Best AI data partner worldwide",
  "Top data annotation company global",
  "Leading AI training data provider worldwide",
  "Best data labeling services globally",
  "Trusted AI data partner international",
  "Premium AI data services worldwide",
  "Expert data annotation company global"
];

const GLOBAL_SECONDARY_KEYWORDS = [
  "Data annotation services worldwide",
  "AI training data company global",
  "Machine learning datasets international",
  "Data labeling outsourcing worldwide",
  "AI data solutions global",
  "Image annotation services international",
  "Video annotation services worldwide"
];

const GLOBAL_LONG_TAIL_KEYWORDS = [
  "Best data annotation company for AI worldwide",
  "Top AI data partner for machine learning globally",
  "Affordable data labeling services international",
  "Professional AI training data provider worldwide",
  "Data annotation outsourcing company global",
  "Enterprise AI data solutions worldwide"
];

const GLOBAL_REGION_KEYWORDS = [
  "AI data partner USA",
  "Data annotation company UK",
  "AI training data provider Europe",
  "Data labeling services Canada",
  "AI data solutions Australia",
  "Data annotation services Germany",
  "Machine learning datasets Japan",
  "AI training partner Singapore",
  "Data labeling company UAE"
];

const GLOBAL_ACTION_KEYWORDS = [
  "Hire international AI data partner",
  "Outsource global data annotation",
  "Get worldwide AI training data",
  "Custom dataset services globally",
  "Expert data labeling worldwide"
];

const GLOBAL_INDUSTRY_KEYWORDS = [
  "Healthcare AI data partner global",
  "Automotive AI training data worldwide",
  "Retail data annotation international",
  "Finance AI datasets global",
  "E-commerce data labeling worldwide"
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
        ...GLOBAL_PRIMARY_KEYWORDS,
        ...GLOBAL_LONG_TAIL_KEYWORDS,
        ...GLOBAL_REGION_KEYWORDS,
        ...GLOBAL_ACTION_KEYWORDS,
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
        ...GLOBAL_SECONDARY_KEYWORDS,
        ...INDIA_SECONDARY_KEYWORDS,
        ...INDUSTRY_KEYWORDS,
        ...GLOBAL_INDUSTRY_KEYWORDS,
        ...INDIA_INDUSTRY_KEYWORDS
      ];
    case 'blog':
      return [
        "AI data insights", 
        "machine learning blog", 
        "data annotation best practices", 
        ...PRIMARY_KEYWORDS,
        ...GLOBAL_PRIMARY_KEYWORDS,
        ...INDIA_PRIMARY_KEYWORDS
      ];
    default:
      return [
        ...PRIMARY_KEYWORDS, 
        ...GLOBAL_PRIMARY_KEYWORDS, 
        ...INDIA_PRIMARY_KEYWORDS
      ];
  }
}
