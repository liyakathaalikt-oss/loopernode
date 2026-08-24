import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { LocalizedServicePage } from '@/components/i18n/localized-service-page';

type Props = { params: Promise<{locale: string}> };

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'services.dataProcessing'});
  const baseUrl = 'https://loopernode.in';
  const localeUrls: Record<string, string> = { de: '/de/datenverarbeitung', fr: '/fr/traitement-donnees', it: '/it/elaborazione-dati', es: '/es/procesamiento-datos', nl: '/nl/dataverwerking' };
  const languages: Record<string, string> = { 'x-default': `${baseUrl}/services/data-processing`, en: `${baseUrl}/services/data-processing` };
  for (const [l, path] of Object.entries(localeUrls)) { languages[l] = `${baseUrl}${path}`; }
  const ogLocale = locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : locale === 'it' ? 'it_IT' : locale === 'es' ? 'es_ES' : 'nl_NL';
  return { title: t('title'), description: t('description'), alternates: { canonical: `${baseUrl}${localeUrls[locale] || '/services/data-processing'}`, languages }, openGraph: { title: t('title'), description: t('description'), url: `${baseUrl}${localeUrls[locale]}`, siteName: 'Loopernode', locale: ogLocale, type: 'website' } };
}

export default function Page() {
  return <LocalizedServicePage service="dataProcessing" />;
}
