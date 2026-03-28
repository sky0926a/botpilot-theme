'use client';

import { useTranslations, useLocale } from 'next-intl';
import type { I18nAdapter } from '../contracts/i18n';

export function createNextIntlAdapter(
  namespace?: string,
  defaults?: Record<string, string>,
): I18nAdapter {
  const t = useTranslations(namespace);
  const locale = useLocale();

  return {
    t(key: string, params?: Record<string, unknown>): string {
      try {
        return t(key as never, params as never);
      } catch {
        if (defaults && key in defaults) {
          return defaults[key];
        }
        return key;
      }
    },
    locale,
    setLocale(_locale: string) {
      throw new Error(
        'setLocale is not supported with next-intl. Use Next.js routing to change locale.',
      );
    },
  };
}
