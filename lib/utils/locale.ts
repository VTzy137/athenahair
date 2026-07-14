import {
  DEFAULT_LOCALE,
  LOCALE_MESSAGES,
  type LocaleCode,
  type LocaleKey,
} from '@/lib/i18n/messages';

export type {  LocaleCode, LocaleKey };

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

export function resolveLocaleCode(locale?: string): LocaleCode {
  return locale === undefined ? USER_LOCALE.localeCode : resolveLocaleCodeFromString(locale);
}

function resolveLocaleCodeFromString(locale: string): LocaleCode {
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
