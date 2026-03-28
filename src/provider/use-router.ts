'use client';

import { useContext } from 'react';
import { BotpilotContext } from './botpilot-provider';
import type { RouterAdapter } from '../contracts/router';

export function useBotpilotRouter(): RouterAdapter {
  const ctx = useContext(BotpilotContext);
  if (!ctx?.router) {
    throw new Error('BotpilotProvider with router adapter is required');
  }
  return ctx.router;
}
