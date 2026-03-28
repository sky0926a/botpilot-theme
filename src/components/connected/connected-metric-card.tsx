'use client';

import { useCallback, useEffect, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { useApi } from '../../provider/use-api';
import { MetricCard } from './metric-card';

/**
 * Connected MetricCard that fetches its value from an API endpoint.
 *
 * Uses the `useApi()` hook from BotpilotProvider.
 * Supports optional polling with `refetchInterval`.
 */

export interface ConnectedMetricCardProps {
  /** Card title / metric label */
  title: string;
  /** API endpoint to GET the metric value from */
  endpoint: string;
  /** Extract the display value from the API response (defaults to the raw response) */
  selector?: (data: unknown) => number | string;
  /** Optional description text below the value */
  description?: string;
  /** Lucide-style icon component */
  icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  /** Custom formatter for numeric values */
  formatter?: (value: number) => string;
  /** Polling interval in ms. Set to 0 or omit to disable polling. */
  refetchInterval?: number;
  /** Value to show while loading */
  loadingValue?: number | string;
  /** Additional CSS classes on the outer card */
  className?: string;
}

export function ConnectedMetricCard({
  title,
  endpoint,
  selector,
  description,
  icon,
  formatter,
  refetchInterval = 0,
  loadingValue = '--',
  className,
}: ConnectedMetricCardProps) {
  const api = useApi();
  const [value, setValue] = useState<number | string>(loadingValue);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const data = await api.get<unknown>(endpoint);
      const extracted = selector ? selector(data) : data;
      if (typeof extracted === 'number' || typeof extracted === 'string') {
        setValue(extracted);
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Fetch failed');
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
    <MetricCard
      title={title}
      value={value}
      description={error ?? description}
      icon={icon}
      formatter={formatter}
      className={className}
    />
  );
}
