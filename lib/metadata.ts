import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

const siteName = 'NovaMind AI';
const baseUrl = 'https://novamind-ai.com';

export function generatePageMetadata({
  title,
  description,
  path,
  image = '/images/og-default.jpg'
}: MetadataProps): Metadata {
  const url = `${baseUrl}${path}`;
  
  return {
    title: `${title} | ${siteName}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@novamindai',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
