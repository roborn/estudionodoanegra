import pt from './pt.json';
import en from './en.json';
import de from './de.json';
import es from './es.json';
import fr from './fr.json';

const languages = {
  pt,
  en,
  de,
  es,
  fr,
};

export type Language = keyof typeof languages;

export const defaultLanguage: Language = 'pt';
export const languages_list: Language[] = ['pt', 'en', 'de', 'es', 'fr'];

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLanguage;
}

export function useTranslations(lang: Language) {
  return function t(key: string, defaultValue?: string): string {
    const keys = key.split('.');
    let value: any = languages[lang];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof value === 'string' ? value : defaultValue || key;
  };
}

export function getLocalizedPath(
  path: string,
  lang: Language
): string {
  const pathWithoutLang = path
    .split('/')
    .filter((p) => p && !languages_list.includes(p as Language))
    .join('/');

  if (lang === defaultLanguage) {
    return `/${pathWithoutLang}`;
  }
  return `/${lang}/${pathWithoutLang}`;
}

// Page type detection for cross-language URL mapping
type PageType = 'home' | 'group' | 'individual' | 'contact' | '404' | 'other';

function getPageType(path: string): PageType {
  const cleanPath = path.replace(/\/$/, '');
  
  if (cleanPath === '' || cleanPath === '/' || 
      cleanPath === '/en' || cleanPath === '/de' || 
      cleanPath === '/es' || cleanPath === '/fr') {
    return 'home';
  }
  
  if (cleanPath.includes('treino-grupo') || 
      cleanPath.includes('group-training') ||
      cleanPath.includes('gruppenertraining') ||
      cleanPath.includes('entrenamiento-grupo') ||
      cleanPath.includes('entrainement-groupe')) {
    return 'group';
  }
  
  if (cleanPath.includes('treino-individual') || 
      cleanPath.includes('one-on-one-training') ||
      cleanPath.includes('einzeltraining') ||
      cleanPath.includes('entrenamiento-personal') ||
      cleanPath.includes('entrainement-personnel')) {
    return 'individual';
  }
  
  if (cleanPath.includes('contacto') || 
      cleanPath.includes('contact') ||
      cleanPath.includes('kontakt')) {
    return 'contact';
  }

  if (cleanPath.includes('404')) {
    return '404';
  }
  
  return 'other';
}

// URL mappings per language
const urlMappings: Record<PageType, Record<Language, string>> = {
  home: { pt: '/', en: '/en/', de: '/de/', es: '/es/', fr: '/fr/' },
  group: { pt: '/treino-grupo', en: '/en/group-training', de: '/de/gruppenertraining', es: '/es/entrenamiento-grupo', fr: '/fr/entrainement-groupe' },
  individual: { pt: '/treino-individual', en: '/en/one-on-one-training', de: '/de/einzeltraining', es: '/es/entrenamiento-personal', fr: '/fr/entrainement-personnel' },
  contact: { pt: '/contacto', en: '/en/contact', de: '/de/kontakt', es: '/es/contacto', fr: '/fr/contact' },
  '404': { pt: '/404', en: '/en/404', de: '/de/404', es: '/es/404', fr: '/fr/404' },
  other: { pt: '/', en: '/en/', de: '/de/', es: '/es/', fr: '/fr/' },
};

// Language to hreflang mapping
export const hreflangMap: Record<Language, string> = {
  pt: 'pt-PT',
  en: 'en',
  de: 'de',
  es: 'es',
  fr: 'fr',
};

export function getAlternateUrls(currentPath: string, siteUrl: string): { lang: Language; hreflang: string; url: string }[] {
  const pageType = getPageType(currentPath);
  
  return languages_list.map((lang) => ({
    lang,
    hreflang: hreflangMap[lang],
    url: new URL(urlMappings[pageType][lang], siteUrl).toString(),
  }));
}
