'use client';

import { useLocale } from 'react-intlayer';
import { getLocaleString, type LocaleKey } from '@/lib/utils/locale';

export function useLocaleString(key: LocaleKey): string {
  const { locale } = useLocale();
  return getLocaleString(key, locale);
}
