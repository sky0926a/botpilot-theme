'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useApi } from '../../provider/use-api';
import { UsageProgressBar } from './usage-progress-bar';

/**
 * Connected UsageProgressBar that fetches usage data from an API endpoint.
 *
 * Uses `useApi()` from BotpilotProvider. The API response is mapped to
 * { current, limit } via the `selector` prop.
 */

export interface ConnectedUsageProgressBarProps {
  /** Label displayed above the bar */
  label: string;
  /** API endpoint to GET usage data from */
  endpoint: string;
  /** Extract current + limit from the API response */
  selector: (data: unknown) => { current: number; limit: number | null };
  /** Custom value formatter */
  valueFormatter?: (value: number) => string;
  /** Override the default color thresholds */
  thresholds?: {
    warning?: number;
    danger?: number;
  };
  /** Show percentage text */
  showPercent?: boolean;
  /** Optional icon */
  icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  /** Polling interval in ms */
  refetchInterval?: number;
  /** Additional CSS classes */
  className?: string;
}

export function ConnectedUsageProgressBar({
  label,
  endpoint,
  selector,
  valueFormatter,
  thresholds,
  showPercent,
  icon,
  refetchInterval = 0,
  className,
}: ConnectedUsageProgressBarProps) {
  const api = useApi();
  const [usage, setUsage] = useState<{ current: number; limit: number | null }>({
    current: 0,
    limit: null,
  });

  const fetchData = useCallback(async () => {
    try {
      const data = await api.get<unknown>(endpoint);
      const extracted = selector(data);
      setUsage(extracted);
    } catch (err) {
      console.error('ConnectedUsageProgressBar fetch error:', err);
    }
  }, [api, endpoint, selector]);

  useEffect(() => {
    fetchData();

    if (refetchInterval > 0) {
      const id = setInterval(fetchData, refetchInterval);
      return () => clearInterval(id);
    }
  }, [fetchData, refetchInterval]);

  return (
    <UsageProgressBar
      label={label}
      current={usage.current}
      limit={usage.limit}
      valueFormatter={valueFormatter}
      thresholds={thresholds}
      showPercent={showPercent}
      icon={icon}
      className={className}
    />
  );
}
