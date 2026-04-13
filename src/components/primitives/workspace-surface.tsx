"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "./button";
import { cn } from "../../lib/cn";

function SettingsFieldRow({
  label,
  value,
  hint,
  className,
  valueClassName,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  hint?: React.ReactNode;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 py-4 md:flex-row md:items-center md:justify-between md:gap-6",
        className
      )}
    >
      <div className="text-sm text-white/50">{label}</div>
      <div className={cn("text-sm font-medium text-white md:text-right", valueClassName)}>{value}</div>
      {hint ? <div className="text-xs text-white/55 md:hidden">{hint}</div> : null}
    </div>
  );
}

function SettingsCopyFieldRow({
  label,
  value,
  className,
  valueClassName,
  copyLabel = "複製",
  copiedLabel = "已複製",
  onCopy,
  copyButtonClassName,
  copyButtonTestId,
}: {
  label: React.ReactNode;
  value: string;
  className?: string;
  valueClassName?: string;
  copyLabel?: string;
  copiedLabel?: string;
  onCopy?: (value: string) => void | Promise<void>;
  copyButtonClassName?: string;
  copyButtonTestId?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1500);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (onCopy) {
      await onCopy(value);
    } else {
      await navigator.clipboard.writeText(value);
    }
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:gap-6",
        className
      )}
    >
      <div className="text-sm text-white/50">{label}</div>
      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_1px_auto] items-stretch overflow-hidden rounded-[12px] border border-white/8 bg-white/[0.03] md:min-w-[30rem]">
        <div className="flex min-w-0 items-center justify-center px-4 py-2 text-center">
          <div className={cn("break-all font-mono text-base font-semibold text-white", valueClassName)}>{value}</div>
        </div>
        <div className="bg-white/8" />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-full min-h-[44px] rounded-none px-3 text-white/70 hover:bg-white/8 hover:text-white",
            copyButtonClassName
          )}
          onClick={() => void handleCopy()}
          aria-label={copied ? copiedLabel : copyLabel}
          title={copied ? copiedLabel : copyLabel}
          data-testid={copyButtonTestId}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  );
}

function WorkspaceListRow({
  title,
  subtitle,
  meta,
  leading,
  actions,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3 px-3 py-3", className)}>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          {leading}
          <span className="font-medium text-white">{title}</span>
          {meta}
        </div>
        {subtitle ? <div className="mt-1 text-xs text-white/55">{subtitle}</div> : null}
      </div>
      {actions ? <div className="flex items-center">{actions}</div> : null}
    </div>
  );
}

function WorkspaceUserBar({
  name,
  email,
  avatar,
  actions,
  className,
}: {
  name: React.ReactNode;
  email: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-[18px] border border-white/8 bg-[#17181b]/96 px-4 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.32)]",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white/8 text-sm font-semibold text-white/90">
          {avatar}
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{name}</div>
          <div className="truncate text-xs text-white/55">{email}</div>
        </div>
      </div>
      {actions ? <div className="flex items-center gap-1">{actions}</div> : null}
    </div>
  );
}

export {
  SettingsFieldRow,
  SettingsCopyFieldRow,
  WorkspaceListRow,
  WorkspaceUserBar,
};
