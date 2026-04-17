"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronUp, Copy } from "lucide-react";

import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { cn } from "../../lib/cn";

type WorkspaceNavIcon = React.ComponentType<{ className?: string }>;

export interface WorkspaceSettingsNavItem {
  key: string;
  label: React.ReactNode;
  icon?: WorkspaceNavIcon;
  active?: boolean;
  onSelect?: () => void;
  testId?: string;
}

function WorkspaceSettingsShell({
  identityName,
  identityEmail,
  identityAvatar,
  sectionLabel = "Settings",
  navItems,
  title,
  subtitle,
  closeAction,
  children,
  className,
}: {
  identityName: React.ReactNode;
  identityEmail: React.ReactNode;
  identityAvatar?: React.ReactNode;
  sectionLabel?: React.ReactNode;
  navItems: WorkspaceSettingsNavItem[];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  closeAction?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid h-full min-h-0 md:grid-cols-[280px_minmax(0,1fr)]", className)}>
      <aside className="flex min-h-0 flex-col border-r border-white/8 bg-[#17181b]">
        <div className="border-b border-white/8 px-5 py-5">
          <WorkspaceIdentityBlock
            avatar={identityAvatar}
            name={identityName}
            subtitle={identityEmail}
            className="border-none bg-transparent px-0 py-0 shadow-none"
            avatarClassName="h-11 w-11 rounded-[14px] text-sm font-extrabold"
            titleClassName="text-sm"
            subtitleClassName="text-xs"
          />
          <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-white/38">{sectionLabel}</div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                type="button"
                data-testid={item.testId}
                onClick={item.onSelect}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[14px] px-4 py-3 text-left text-sm transition-colors",
                  item.active
                    ? "bg-white/8 font-medium text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-0 flex-col bg-[#1f2023]">
        <div className="flex items-start justify-between gap-4 border-b border-white/8 px-8 py-7">
          <div className="min-w-0">
            <h1 className="text-[1.85rem] font-semibold tracking-[-0.03em] text-white">{title}</h1>
            {subtitle ? (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">{subtitle}</p>
            ) : null}
          </div>
          {closeAction}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-7">{children}</div>
      </div>
    </div>
  );
}

function WorkspaceDisclosureCard({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  headerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  triggerTestId,
  chevronClassName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  triggerTestId?: string;
  chevronClassName?: string;
}) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange}>
      <Card className={cn("gap-0 overflow-hidden border-white/8 bg-[#181a1d] py-0 text-white shadow-none", className)}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            data-testid={triggerTestId}
            className={cn(
              "flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors hover:bg-white/5",
              headerClassName
            )}
          >
            <div className="min-w-0 flex-1">
              <div className={cn("text-sm font-semibold text-white", titleClassName)}>{title}</div>
              {description ? (
                <div className={cn("mt-0.5 text-sm text-white/55", descriptionClassName)}>{description}</div>
              ) : null}
            </div>
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-white/60",
                chevronClassName
              )}
            >
              {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t border-white/8">
          <CardContent className={cn("px-5 py-3", contentClassName)}>{children}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function WorkspaceIdentityBlock({
  avatar,
  name,
  subtitle,
  trailing,
  className,
  avatarClassName,
  titleClassName,
  subtitleClassName,
}: {
  avatar?: React.ReactNode;
  name: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  className?: string;
  avatarClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-4 rounded-[16px] border border-white/8 bg-white/[0.03] px-4 py-4",
        className
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/8 text-base font-semibold text-white",
          avatarClassName
        )}
      >
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className={cn("truncate text-lg font-semibold text-white", titleClassName)}>{name}</div>
        {subtitle ? (
          <div className={cn("truncate text-sm text-white/60", subtitleClassName)}>{subtitle}</div>
        ) : null}
      </div>
      {trailing ? <div className="flex shrink-0 items-center gap-2">{trailing}</div> : null}
    </div>
  );
}

function WorkspaceCollectionCard({
  title,
  description,
  icon,
  children,
  className,
  headerClassName,
  contentClassName,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}) {
  return (
    <Card className={cn("border-white/8 bg-[#181a1d] text-white shadow-none", className)}>
      <CardHeader className={cn("border-b border-white/8", headerClassName)}>
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
        {description ? <CardDescription className="text-white/58">{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className={cn("space-y-3", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

function WorkspaceNoticePanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white/60",
        className
      )}
    >
      {children}
    </div>
  );
}

function WorkspaceActionRow({
  label,
  description,
  action,
  className,
}: {
  label: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between", className)}>
      <div className="space-y-1">
        <div className="text-sm text-white/50">{label}</div>
        {description ? <div className="text-xs text-white/55">{description}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

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
    <WorkspaceIdentityBlock
      avatar={avatar}
      name={name}
      subtitle={email}
      trailing={actions}
      className={cn(
        "w-full gap-3 rounded-[18px] bg-[#17181b]/96 px-4 py-3 shadow-[0_16px_36px_rgba(0,0,0,0.32)]",
        className
      )}
      avatarClassName="h-10 w-10 rounded-[14px] text-sm font-semibold text-white/90"
      titleClassName="text-sm"
      subtitleClassName="text-xs text-white/55"
    />
  );
}

export {
  SettingsFieldRow,
  SettingsCopyFieldRow,
  WorkspaceActionRow,
  WorkspaceCollectionCard,
  WorkspaceDisclosureCard,
  WorkspaceIdentityBlock,
  WorkspaceListRow,
  WorkspaceNoticePanel,
  WorkspaceSettingsShell,
  WorkspaceUserBar,
};
