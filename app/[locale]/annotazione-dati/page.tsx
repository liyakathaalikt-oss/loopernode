import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { LocalizedServicePage } from '@/components/i18n/localized-service-page';

type Props = { params: Promise<{locale: string}> };

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'services.dataAnnotation'});
  const baseUrl = 'https://loopernode.in';
  const localeUrls: Record<string, string> = { de: '/de/datenannotation', fr: '/fr/annotation-donnees', it: '/it/annotazione-dati', es: '/es/anotacion-datos', nl: '/nl/data-annotatie' };
  const languages: Record<string, string> = { 'x-default': `${baseUrl}/services/data-annotation`, en: `${baseUrl}/services/data-annotation` };
  for (const [l, path] of Object.entries(localeUrls)) { languages[l] = `${baseUrl}${path}`; }
  const ogLocale = locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'it' ? 'it_IT' : locale === 'es' ? 'es_ES' : 'nl_NL';
  return { title: t('title'), description: t('description'), alternates: { canonical: `${baseUrl}${localeUrls[locale] || '/services/data-annotation'}`, languages }, openGraph: { title: t('title'), description: t('description'), url: `${baseUrl}${localeUrls[locale]}`, siteName: 'Loopernode', locale: ogLocale, type: 'website' } };
}

export default function Page() {
  return <LocalizedServicePage service="dataAnnotation" />;
}
