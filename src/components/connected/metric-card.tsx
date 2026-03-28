'use client';

import { useEffect, useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { cn } from '../../lib/cn';

/**
 * Presentational MetricCard component.
 *
 * Displays a single metric with an optional icon, description, and
 * number-animation when the value changes.
 */

export interface MetricCardProps {
  /** Card title / metric label */
  title: string;
  /** Metric value — numbers get animated transitions, strings render as-is */
  value: number | string;
  /** Optional description text below the value */
  description?: string;
  /** Lucide-style icon component */
  icon?: ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;
  /** Custom formatter for numeric values (receives the rounded integer) */
  formatter?: (value: number) => string;
  /** Additional CSS classes on the outer card */
  className?: string;
}

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  formatter,
  className,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (typeof value === 'number' && typeof prevValueRef.current === 'number') {
      if (value !== prevValueRef.current) {
        setIsAnimating(true);
        const duration = 500;
        const startValue = prevValueRef.current as number;
        const diff = value - startValue;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // easeOutCubic
          const easeProgress = 1 - (1 - progress) ** 3;
          const currentValue = startValue + diff * easeProgress;

          setDisplayValue(currentValue);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setIsAnimating(false);
            prevValueRef.current = value;
          }
        };

        requestAnimationFrame(animate);
      }
    } else {
      setDisplayValue(value);
      prevValueRef.current = value;
    }
  }, [value]);

  const formattedValue =
    typeof displayValue === 'number' && formatter
      ? formatter(Math.round(displayValue))
      : typeof displayValue === 'number'
        ? Math.round(displayValue).toLocaleString()
        : displayValue;

  return (
    <div
      className={cn(
        'group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 transition-colors duration-200',
        className,
      )}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between space-y-0 px-4 pb-0">
        <div className="text-sm font-medium">{title}</div>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      </div>

      {/* Content */}
      <div className="px-4">
        <div
          className={cn(
            'text-2xl font-bold transition-opacity duration-200',
            isAnimating && 'opacity-80',
          )}
        >
          {formattedValue}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
