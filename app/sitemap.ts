import { MetadataRoute } from 'next';
import { dataCollectionServices } from '@/content/services/data-collection';
import { dataLabelingServices } from '@/content/services/data-labeling';
import { dataProcessingServices } from '@/content/services/data-processing';
import { blogPosts } from '@/content/blog-posts';
import { caseStudies } from '@/content/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://loopernode.in';
  
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/services/data-collection',
    '/services/data-labeling',
    '/services/data-processing',
    '/blog',
    '/docs',
    '/case-studies',
    '/api-reference',
    '/security',
    '/privacy',
    '/terms',
    '/cookie',
    '/careers',
    '/partners',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const collectionRoutes = dataCollectionServices.map((service) => ({
    url: `${baseUrl}/services/data-collection/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const labelingRoutes = dataLabelingServices.map((service) => ({
    url: `${baseUrl}/services/data-labeling/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const processingRoutes = dataProcessingServices.map((service) => ({
    url: `${baseUrl}/services/data-processing/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Localized European SEO pages
  const localizedRoutes = [
    // German (de)
    '/de/datenannotation', '/de/datenerfassung', '/de/datenverarbeitung',
    // French (fr)
    '/fr/annotation-donnees', '/fr/collecte-donnees', '/fr/traitement-donnees',
    // Italian (it)
    '/it/annotazione-dati', '/it/raccolta-dati', '/it/elaborazione-dati',
    // Spanish (es)
    '/es/anotacion-datos', '/es/recopilacion-datos', '/es/procesamiento-datos',
    // Dutch (nl)
    '/nl/data-annotatie', '/nl/dataverzameling', '/nl/dataverwerking',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...labelingRoutes,
    ...processingRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
    ...localizedRoutes,
  ];
}
