import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'de', 'fr', 'it', 'es', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  
  pathnames: {
    '/': '/',
    '/services': {
      en: '/services',
      de: '/dienstleistungen',
      fr: '/services',
      it: '/servizi',
      es: '/servicios',
      nl: '/diensten'
    },
    '/services/data-annotation': {
      en: '/services/data-annotation',
      de: '/datenannotation',
      fr: '/annotation-donnees',
      it: '/annotazione-dati',
      es: '/anotacion-datos',
      nl: '/data-annotatie'
    },
    '/services/data-collection': {
      en: '/services/data-collection',
      de: '/datenerfassung',
      fr: '/collecte-donnees',
      it: '/raccolta-dati',
      es: '/recopilacion-datos',
      nl: '/dataverzameling'
    },
    '/services/data-processing': {
      en: '/services/data-processing',
      de: '/datenverarbeitung',
      fr: '/traitement-donnees',
      it: '/elaborazione-dati',
      es: '/procesamiento-datos',
      nl: '/dataverwerking'
    }
  }
});

export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);
