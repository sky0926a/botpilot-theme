'use client';

import { useContext } from 'react';
import { BotpilotContext } from './botpilot-provider';
import type { AuthAdapter } from '../contracts/auth';

export function useAuth(): AuthAdapter {
  const ctx = useContext(BotpilotContext);
  if (!ctx?.auth) {
    throw new Error('BotpilotProvider with auth adapter is required');
  }
  return ctx.auth;
}
