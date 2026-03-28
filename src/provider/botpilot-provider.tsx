'use client';

import { createContext, type ReactNode } from 'react';
import type { ApiClient } from '../contracts/api';
import type { AuthAdapter } from '../contracts/auth';
import type { I18nAdapter } from '../contracts/i18n';
import type { RouterAdapter } from '../contracts/router';

export interface BotpilotContextValue {
  api: ApiClient | null;
  auth: AuthAdapter | null;
  i18n: I18nAdapter | null;
  router: RouterAdapter | null;
}

export const BotpilotContext = createContext<BotpilotContextValue | null>(null);

export interface BotpilotProviderProps {
  api?: ApiClient;
  auth?: AuthAdapter;
  i18n?: I18nAdapter;
  router?: RouterAdapter;
  children: ReactNode;
}

export function BotpilotProvider({
  api,
  auth,
  i18n,
  router,
  children,
}: BotpilotProviderProps) {
  const value: BotpilotContextValue = {
    api: api ?? null,
    auth: auth ?? null,
    i18n: i18n ?? null,
    router: router ?? null,
  };

  return (
    <BotpilotContext.Provider value={value}>
      {children}
    </BotpilotContext.Provider>
  );
}
