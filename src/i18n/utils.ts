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
