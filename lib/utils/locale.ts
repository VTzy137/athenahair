import {
  DEFAULT_LOCALE,
  LOCALE_MESSAGES,
  SUPPORTED_LOCALES,
  type LocaleCode,
  type LocaleKey,
} from '@/lib/i18n/messages';

export type { LocaleCode, LocaleKey };
export { SUPPORTED_LOCALES };

export var APP_LOCALE: LocaleCode = 'en';

import { useSettingsStore } from '@/lib/stores/use-settings-store';

export function resolveLocaleCode(locale?: string): LocaleCode {
  if (locale !== undefined) {
    return resolveLocaleCodeFromString(locale);
  }
  if (typeof window !== 'undefined') {
    try {
      const storeLanguage = useSettingsStore.getState().language;
      if (storeLanguage) {
        return resolveLocaleCodeFromString(storeLanguage);
      }
    } catch {
      // fallback
    }
  }
  return USER_LOCALE.localeCode;
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


export const USER_LOCALE = (() => {
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
})();

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

export function localeString(key: LocaleKey): string {
  const dictionary = LOCALE_MESSAGES[APP_LOCALE];
  const value = dictionary[key];

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  return LOCALE_MESSAGES[DEFAULT_LOCALE][key] ?? key;
}

function getLanguageNativeName(code: LocaleCode): string {
  const dictionary = LOCALE_MESSAGES[code] ?? LOCALE_MESSAGES[DEFAULT_LOCALE];
  const nativeName = dictionary[code as LocaleKey];
  if (typeof nativeName === 'string' && nativeName.length > 0) {
    return nativeName;
  }
  return code.toUpperCase();
}

function getLanguageDisplayName(code: LocaleCode, targetLocale?: string): string {
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
