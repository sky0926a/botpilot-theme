'use client';

import { useContext } from 'react';
import { BotpilotContext } from './botpilot-provider';
import type { I18nAdapter } from '../contracts/i18n';

export function useI18n(): I18nAdapter {
  const ctx = useContext(BotpilotContext);
  if (!ctx?.i18n) {
    throw new Error('BotpilotProvider with i18n adapter is required');
  }
  return ctx.i18n;
}
