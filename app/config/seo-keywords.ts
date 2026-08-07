export const SEOKeywords = {
  // PRIMARY KEYWORDS - Global high search volume
  primary: [
    'Best AI data partner worldwide',
    'Top data annotation company global',
    'Leading AI training data provider worldwide',
    'Best data labeling services globally',
    'Trusted AI data partner international',
    'Premium AI data services worldwide',
    'Expert data annotation company global',
    'Professional AI training partner international',
    'World-class AI data services',
    'Global AI data solutions provider'
  ],
  
  // SECONDARY KEYWORDS - Service specific global
  secondary: [
    'Data annotation services worldwide',
    'AI training data company global',
    'Machine learning datasets international',
    'Data labeling outsourcing worldwide',
    'AI data solutions global',
    'Image annotation services international',
    'Video annotation services worldwide',
    'Text annotation services global',
    'Audio annotation services international',
    '3D point cloud annotation worldwide',
    'Custom AI dataset services global',
    'Enterprise data labeling solutions worldwide'
  ],
  
  // LONG-TAIL KEYWORDS - High conversion global
  longTail: [
    'Best data annotation company for AI worldwide',
    'Top AI data partner for machine learning globally',
    'Affordable data labeling services international',
    'Professional AI training data provider worldwide',
    'Data annotation outsourcing company global',
    'High-quality training data services worldwide',
    'Custom AI dataset creation international',
    'Human-in-the-loop data annotation global',
    'Quality-controlled data labeling worldwide',
    'Enterprise AI data solutions international',
    'End-to-end AI data services global',
    'Scalable data annotation solutions worldwide'
  ],
  
  // REGION KEYWORDS - Geographic targeting
  regions: {
    usa: 'AI data partner USA',
    uk: 'Data annotation company UK',
    europe: 'AI training data provider Europe',
    canada: 'Data labeling services Canada',
    australia: 'AI data solutions Australia',
    germany: 'Data annotation services Germany',
    japan: 'Machine learning datasets Japan',
    singapore: 'AI training partner Singapore',
    uae: 'Data labeling company UAE',
    france: 'Data annotation services France',
    netherlands: 'AI data partner Netherlands',
    switzerland: 'Data labeling services Switzerland'
  },
  
  // INTERNATIONAL CITIES
  cities: {
    newyork: 'AI data partner New York',
    london: 'Data annotation company London',
    berlin: 'AI training data provider Berlin',
    toronto: 'Data labeling services Toronto',
    sydney: 'AI data solutions Sydney',
    tokyo: 'Data annotation services Tokyo',
    singapore: 'Machine learning datasets Singapore',
    dubai: 'AI training partner Dubai',
    paris: 'Data labeling company Paris',
    amsterdam: 'Annotation services Amsterdam'
  },
  
  // INDUSTRY KEYWORDS - Vertical specific global
  industries: {
    healthcare: [
      'Healthcare AI data partner global',
      'Medical image annotation worldwide',
      'Clinical data labeling international',
      'Radiology AI datasets global',
      'Health AI training data worldwide'
    ],
    automotive: [
      'Automotive AI training data worldwide',
      'Autonomous vehicle datasets global',
      'ADAS annotation services international',
      'Self-driving car data worldwide'
    ],
    retail: [
      'Retail data annotation global',
      'E-commerce data labeling worldwide',
      'Inventory AI datasets international',
      'Retail analytics data global'
    ],
    finance: [
      'Finance AI datasets global',
      'Banking AI training worldwide',
      'Fraud detection data international',
      'Financial data labeling global'
    ],
    insurance: [
      'Insurance AI data partner global',
      'Claims data annotation worldwide'
    ],
    manufacturing: [
      'Manufacturing AI datasets global',
      'Industrial data labeling worldwide'
    ],
    agriculture: [
      'Agriculture AI annotation global',
      'Crop monitoring data worldwide'
    ]
  },
  
  // TECHNOLOGY KEYWORDS
  technology: [
    'Machine learning data services global',
    'Deep learning datasets worldwide',
    'Computer vision annotation international',
    'NLP data labeling services global',
    'Large language model data worldwide',
    'Generative AI training data international',
    'Computer vision datasets global',
    'AI model training data worldwide',
    'Neural network datasets international'
  ],
  
  // PLATFORM KEYWORDS
  platform: [
    'Data annotation platform global',
    'AI training data marketplace worldwide',
    'Data labeling software international',
    'Annotation tool services global',
    'AI dataset marketplace worldwide',
    'Training data platform international',
    'Labeling automation services global'
  ],
  
  // ACTION KEYWORDS - Conversion focused global
  action: [
    'Hire international AI data partner',
    'Outsource global data annotation',
    'Get worldwide AI training data',
    'Custom dataset services globally',
    'Expert data labeling worldwide',
    'Professional AI partner international',
    'Reliable data annotation global',
    'Accurate AI training data worldwide',
    'Scalable data solutions international',
    'End-to-end AI data services global',
    'Trusted global annotation partner',
    'International data labeling company'
  ],
  
  // BENEFIT KEYWORDS - Value proposition global
  benefits: [
    'Accurate AI training data worldwide',
    'Reliable data annotation global',
    'Scalable AI data solutions international',
    'Cost-effective data labeling worldwide',
    'High-quality AI datasets global',
    'Fast data annotation services worldwide',
    'Secure AI data solutions international',
    'Compliant data labeling global',
    'Premium training data worldwide',
    'Enterprise-grade AI data international',
    'ISO-certified annotation services global',
    'GDPR-compliant data labeling worldwide'
  ]
};

// Generate keywords based on page type and region
export function generateKeywords(
  pageType: 'home' | 'services' | 'blog' | 'contact' | 'industries' | 'solutions' | 'default' = 'home',
  customKeywords: string[] = [],
  region?: keyof typeof SEOKeywords.regions
): string[] {
  let keywords: string[] = [];
  
  switch(pageType) {
    case 'home':
      keywords = [
        ...SEOKeywords.primary,
        ...SEOKeywords.secondary,
        ...SEOKeywords.longTail,
        ...SEOKeywords.benefits,
        ...Object.values(SEOKeywords.regions),
        ...Object.values(SEOKeywords.cities)
      ];
      break;
      
    case 'services':
      keywords = [
        ...SEOKeywords.secondary,
        ...SEOKeywords.longTail,
        ...SEOKeywords.action,
        ...SEOKeywords.benefits,
        ...SEOKeywords.technology,
        ...SEOKeywords.platform,
        ...SEOKeywords.primary.slice(0, 5)
      ];
      break;
      
    case 'blog':
      keywords = [
        ...SEOKeywords.longTail,
        ...SEOKeywords.secondary,
        ...Object.values(SEOKeywords.industries).flat(),
        ...SEOKeywords.technology
      ];
      break;
      
    case 'contact':
      keywords = [
        ...SEOKeywords.action,
        ...SEOKeywords.primary,
        ...Object.values(SEOKeywords.regions),
        ...Object.values(SEOKeywords.cities)
      ];
      break;
      
    case 'industries':
      keywords = [
        ...Object.values(SEOKeywords.industries).flat(),
        ...SEOKeywords.primary,
        ...SEOKeywords.longTail,
        ...SEOKeywords.technology
      ];
      break;
      
    case 'solutions':
      keywords = [
        ...SEOKeywords.primary,
        ...SEOKeywords.technology,
        ...SEOKeywords.platform,
        ...SEOKeywords.benefits
      ];
      break;
      
    default:
      keywords = [...SEOKeywords.primary, ...SEOKeywords.secondary];
  }
  
  // Add region-specific keywords if specified
  if (region && SEOKeywords.regions[region]) {
    keywords.push(SEOKeywords.regions[region]);
  }
  
  // Add custom keywords
  if (customKeywords.length > 0) {
    keywords = [...keywords, ...customKeywords];
  }
  
  // Remove duplicates and limit to 25 keywords
  const uniqueKeywords = [...new Set(keywords)];
  // Next.js metadata expects an array for keywords
  return uniqueKeywords.slice(0, 25);
}

// Get region-specific keywords
export function getRegionKeywords(region: keyof typeof SEOKeywords.regions): string {
  return SEOKeywords.regions[region] || SEOKeywords.regions.usa;
}

// Get city-specific keywords
export function getCityKeywords(city: keyof typeof SEOKeywords.cities): string {
  return SEOKeywords.cities[city] || SEOKeywords.cities.newyork;
}

// Get industry-specific keywords
export function getIndustryKeywords(industry: keyof typeof SEOKeywords.industries): string[] {
  return SEOKeywords.industries[industry] || [];
}

// Get all global keywords
export function getAllGlobalKeywords(): string[] {
  return [
    ...SEOKeywords.primary,
    ...SEOKeywords.secondary,
    ...SEOKeywords.longTail,
    ...Object.values(SEOKeywords.regions),
    ...Object.values(SEOKeywords.cities),
    ...Object.values(SEOKeywords.industries).flat(),
    ...SEOKeywords.technology,
    ...SEOKeywords.platform,
    ...SEOKeywords.action,
    ...SEOKeywords.benefits
  ];
}
