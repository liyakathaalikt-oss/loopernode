export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Loopernode",
    "alternateName": "Loopernode AI Data Services",
    "url": "https://loopernode.in",
    "logo": "https://loopernode.in/images/logo-new.png",
    "description": "The official website of Loopernode. An enterprise AI data services company providing global data collection, data labeling, and data processing for machine learning and generative AI models.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Collection",
      "Data Labeling",
      "Data Processing",
      "Generative AI",
      "RLHF"
    ],
    "areaServed": "Worldwide",
    "sameAs": [
      "https://www.linkedin.com/company/loopernode-technologies-llp/",
      "https://www.facebook.com/profile.php?id=61593403880383"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7975265394",
      "contactType": "customer service",
      "availableLanguage": ["English"]
    }
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://loopernode.in${item.url}`
    }))
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  authorName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": `https://loopernode.in${post.image}`,
    "datePublished": post.datePublished,
    "dateModified": post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Loopernode",
      "logo": {
        "@type": "ImageObject",
        "url": "https://loopernode.in/images/logo-new.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://loopernode.in${post.url}`
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "serviceType": service.serviceType || "AI Data Services",
    "provider": {
      "@type": "Organization",
      "name": "Loopernode",
      "url": "https://loopernode.in"
    },
    "areaServed": "Worldwide",
    "url": `https://loopernode.in${service.url}`
  };
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Loopernode",
    "image": "https://loopernode.in/images/logo-new.png",
    "telephone": "+91 7975265394",
    "email": "info@loopernode.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "url": "https://loopernode.in"
  };
}
