export interface I18nAdapter {
  t(key: string, params?: Record<string, unknown>): string;
  locale: string;
  setLocale(locale: string): void;
}
