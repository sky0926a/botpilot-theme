'use client';

import type { ComponentType, SVGProps } from 'react';
import { cn } from '../../lib/cn';

/**
 * Presentational usage progress bar.
 *
 * Shows a label, current/limit text, and a color-coded progress bar.
 * Thresholds: >=90% red, >=70% yellow, otherwise primary color.
 */

export interface UsageProgressBarProps {
  /** Label displayed above the bar */
  label: string;
  /** Current usage value */
  current: number;
  /** Maximum / limit value. If 0 or null the bar is hidden. */
  limit: number | null;
  /** Custom formatter for the current/limit text (e.g. currency formatter) */
  valueFormatter?: (value: number) => string;
  /** Override the default color thresholds */
  thresholds?: {
    /** Percentage at which the bar turns yellow (default 70) */
    warning?: number;
    /** Percentage at which the bar turns red (default 90) */
    danger?: number;
  };
  /** Show percentage text alongside the value text */
  showPercent?: boolean;
  /** Optional icon rendered before the label */
  icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  /** Additional CSS classes */
  className?: string;
}

export function UsageProgressBar({
  label,
  current,
  limit,
  valueFormatter,
  thresholds,
  showPercent = false,
  icon: Icon,
  className,
}: UsageProgressBarProps) {
  if (!limit || limit <= 0) {
    return null;
  }

  const percent = Math.min((current / limit) * 100, 100);
  const warningAt = thresholds?.warning ?? 70;
  const dangerAt = thresholds?.danger ?? 90;

  const fmt = valueFormatter ?? ((v: number) => v.toLocaleString());

  const barColor =
    percent >= dangerAt
      ? 'bg-red-500'
      : percent >= warningAt
        ? 'bg-yellow-500'
        : 'bg-primary';

  const textColor =
    percent >= 100
      ? 'text-destructive'
      : percent >= dangerAt
        ? 'text-red-600 dark:text-red-400'
        : percent >= warningAt
          ? 'text-orange-600 dark:text-orange-400'
          : '';

  return (
    <div className={cn('space-y-1', className)}>
      {/* Label + value row */}
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">
          {Icon && <Icon className="h-3 w-3" />}
          {label}
        </span>
        <span className={cn('font-medium font-mono', textColor)}>
          {fmt(current)} / {fmt(limit)}
          {showPercent && (
            <span className="ml-1 text-muted-foreground">
              ({percent.toFixed(1)}%)
            </span>
          )}
        </span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20">
        <div
          className={cn('h-full transition-all rounded-full', barColor)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
