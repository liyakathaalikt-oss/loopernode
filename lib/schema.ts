export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Loopernode",
    "url": "https://loopernode.in",
    "logo": "https://loopernode.in/logo.png",
    "description": "Enterprise AI data services company providing data collection, labeling, and processing.",
    "sameAs": [
      "https://twitter.com/loopernode",
      "https://linkedin.com/company/loopernode"
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
        "url": "https://loopernode.in/logo.png"
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "Loopernode"
    },
    "url": `https://loopernode.in${service.url}`
  };
}
