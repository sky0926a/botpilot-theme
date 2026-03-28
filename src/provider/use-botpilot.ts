'use client';

import { useContext } from 'react';
import { BotpilotContext, type BotpilotContextValue } from './botpilot-provider';

export function useBotpilot(): BotpilotContextValue {
  const ctx = useContext(BotpilotContext);
  if (!ctx) {
    throw new Error('BotpilotProvider is required');
  }
  return ctx;
}
