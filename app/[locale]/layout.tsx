import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Metadata} from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const baseUrl = 'https://loopernode.in';

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    if (l === 'en') {
      languages['x-default'] = baseUrl;
      languages['en'] = baseUrl;
    } else {
      languages[l] = `${baseUrl}/${l}`;
    }
  }

  return {
    alternates: {
      languages
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
