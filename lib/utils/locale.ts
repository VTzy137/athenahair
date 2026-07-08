/**
 * Simple web-based locale code detection utility.
 * Can be used for language and currency in the future.
 * 
 * Search Keywords:
 * - locale code
 * - language code
 * - currency code
 */

// --- Priority Definitions ---

export enum WebLocaleSource {
  NAVIGATOR_LANGUAGES = 'NAVIGATOR_LANGUAGES',
  NAVIGATOR_LANGUAGE = 'NAVIGATOR_LANGUAGE',
  DOCUMENT_ELEMENT = 'DOCUMENT_ELEMENT',
  DEFAULT = 'DEFAULT'
}

export const LOCALE_DETECTION_PRIORITY: WebLocaleSource[] = [
  WebLocaleSource.NAVIGATOR_LANGUAGES,
  WebLocaleSource.NAVIGATOR_LANGUAGE,
  WebLocaleSource.DOCUMENT_ELEMENT,
  WebLocaleSource.DEFAULT
];

// --- Simple Retrieval Functions ---

export function getLocaleFromLanguages(): string | null {
  if (typeof navigator !== 'undefined' && navigator.languages && navigator.languages.length > 0) {
    return navigator.languages[0];
  }
  return null;
}

export function getLocaleFromLanguage(): string | null {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language;
  }
  return null;
}

export function getLocaleFromDocument(): string | null {
  if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
    return document.documentElement.lang;
  }
  return null;
}

export function getDefaultLocale(): string {
  return 'en-US';
}

// --- Main Core Function ---

/**
 * Get the current locale code from the web environment.
 */
export function getLocale(): string {
  for (const source of LOCALE_DETECTION_PRIORITY) {
    let locale: string | null = null;
    switch (source) {
      case WebLocaleSource.NAVIGATOR_LANGUAGES:
        locale = getLocaleFromLanguages();
        break;
      case WebLocaleSource.NAVIGATOR_LANGUAGE:
        locale = getLocaleFromLanguage();
        break;
      case WebLocaleSource.DOCUMENT_ELEMENT:
        locale = getLocaleFromDocument();
        break;
      case WebLocaleSource.DEFAULT:
        locale = getDefaultLocale();
        break;
    }
    if (locale) return locale;
  }
  return getDefaultLocale();
}

// --- Future Extensions (Language and Currency) ---

/**
 * Extracts the language code from a given locale code.
 */
export function getLanguageFromLocale(locale: string): string {
  if (!locale) return 'en';
  return locale.split('-')[0].split('_')[0].toLowerCase();
}

/**
 * Maps a locale code to a currency code.
 */
export function getCurrencyFromLocale(locale: string): string {
  const lang = getLanguageFromLocale(locale);
  switch (lang) {
    case 'ja': return 'JPY';
    case 'zh': return 'CNY';
    case 'fr':
    case 'de':
    case 'it':
    case 'es': return 'EUR';
    case 'vi': return 'VND';
    case 'ko': return 'KRW';
    case 'en':
      if (locale.toLowerCase().includes('gb')) return 'GBP';
      if (locale.toLowerCase().includes('ca')) return 'CAD';
      if (locale.toLowerCase().includes('au')) return 'AUD';
      return 'USD';
    default:
      return 'USD';
  }
}
