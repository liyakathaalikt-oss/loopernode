import { MetadataRoute } from 'next';
import { dataCollectionServices } from '@/content/services/data-collection';
import { dataLabelingServices } from '@/content/services/data-labeling';
import { dataProcessingServices } from '@/content/services/data-processing';
import { blogPosts } from '@/content/blog-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://novamind-ai.com';
  
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/services',
    '/services/data-collection',
    '/services/data-labeling',
    '/services/data-processing',
    '/blog',
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

  return [
    ...staticRoutes,
    ...collectionRoutes,
    ...labelingRoutes,
    ...processingRoutes,
    ...blogRoutes,
  ];
}
