import {
  DEFAULT_LOCALE,
  LOCALE_MESSAGES,
  SUPPORTED_LOCALES,
  type LocaleCode,
  type LocaleKey,
} from '@/lib/i18n/messages';

export type { LocaleCode, LocaleKey };
export { SUPPORTED_LOCALES };

export const USER_LOCALE = createUserLocale();

export function getTimezone(): string {
  return USER_LOCALE.timeZone;
}

export function getLocale(): string {
  return USER_LOCALE.locale;
}

export function getLanguageAndRegion(): { language: string; region: string | null } {
  return {
    language: USER_LOCALE.language,
    region: USER_LOCALE.region,
  };
}

export function getLocaleString(key: LocaleKey, locale?: string): string {
  const localeCode = resolveLocaleCode(locale);
  const dictionary = LOCALE_MESSAGES[localeCode] ?? LOCALE_MESSAGES[DEFAULT_LOCALE];
  const value = dictionary[key];

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  return LOCALE_MESSAGES[DEFAULT_LOCALE][key] ?? key;
}

export function getLanguageNativeName(code: LocaleCode): string {
  const dictionary = LOCALE_MESSAGES[code] ?? LOCALE_MESSAGES[DEFAULT_LOCALE];
  const nativeName = dictionary[code as LocaleKey];
  if (typeof nativeName === 'string' && nativeName.length > 0) {
    return nativeName;
  }
  return code.toUpperCase();
}

export function getLanguageDisplayName(code: LocaleCode, targetLocale?: string): string {
  const targetCode = resolveLocaleCode(targetLocale);
  const dictionary = LOCALE_MESSAGES[targetCode] ?? LOCALE_MESSAGES[DEFAULT_LOCALE];
  const name = dictionary[code as LocaleKey];
  if (typeof name === 'string' && name.length > 0) {
    return name;
  }
  return getLanguageNativeName(code);
}

export function getAvailableLanguages(currentLocale?: string): { code: LocaleCode; name: string; nativeName: string }[] {
  return SUPPORTED_LOCALES.map((code) => ({
    code,
    name: getLanguageDisplayName(code, currentLocale),
    nativeName: getLanguageNativeName(code),
  }));
}

export function resolveLocaleCode(locale?: string): LocaleCode {
  return locale === undefined ? USER_LOCALE.localeCode : resolveLocaleCodeFromString(locale);
}

export function resolveLocaleCodeFromString(locale: string): LocaleCode {
  if (locale in LOCALE_MESSAGES) {
    return locale as LocaleCode;
  }

  const language = locale.split('-')[0];
  if (language in LOCALE_MESSAGES) {
    return language as LocaleCode;
  }

  return DEFAULT_LOCALE;
}

function createUserLocale() {
  const locale =
    typeof navigator !== 'undefined' && navigator.language
      ? navigator.language
      : Intl.DateTimeFormat().resolvedOptions().locale;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const parts = locale.split('-');

  return {
    locale,
    language: parts[0],
    region: parts[1] ?? null,
    timeZone,
    localeCode: resolveLocaleCodeFromString(locale),
  } as const;
}
