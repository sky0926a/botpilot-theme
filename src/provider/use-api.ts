'use client';

import { useContext } from 'react';
import { BotpilotContext } from './botpilot-provider';
import type { ApiClient } from '../contracts/api';

export function useApi(): ApiClient {
  const ctx = useContext(BotpilotContext);
  if (!ctx?.api) {
    throw new Error('BotpilotProvider with api adapter is required');
  }
  return ctx.api;
}
