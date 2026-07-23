export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NovaMind AI",
    "url": "https://novamind-ai.com",
    "logo": "https://novamind-ai.com/logo.png",
    "description": "Enterprise AI data services company providing data collection, labeling, and processing.",
    "sameAs": [
      "https://twitter.com/novamindai",
      "https://linkedin.com/company/novamindai"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-0199",
      "contactType": "customer service"
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
      "item": `https://novamind-ai.com${item.url}`
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
    "image": `https://novamind-ai.com${post.image}`,
    "datePublished": post.datePublished,
    "dateModified": post.datePublished,
    "author": {
      "@type": "Person",
      "name": post.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "NovaMind AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://novamind-ai.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://novamind-ai.com${post.url}`
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "NovaMind AI"
    },
    "url": `https://novamind-ai.com${service.url}`
  };
}
