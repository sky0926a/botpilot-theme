import type * as React from "react";

import { cn } from "../../lib/cn";

/**
 * AppSidebar — shared sidebar shell for all BotPilot services.
 * Provides the fixed sidebar layout with brand, navigation, and footer slots.
 * Services pass their own nav items and user info.
 */

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface AppSidebarProps {
  brand: {
    name: string;
    subtitle?: string;
    logo?: React.ReactNode;
  };
  contextPanel?: React.ReactNode;
  navItems: NavItem[];
  pathname: string;
  onNavigate?: (href: string) => void;
  footer?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  desktopClassName?: string;
  sidebarClassName?: string;
  mobilePanelClassName?: string;
  linkComponent?: React.ComponentType<{
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }>;
}

function AppSidebar({
  brand,
  contextPanel,
  navItems,
  pathname,
  onNavigate,
  footer,
  open = false,
  onClose,
  desktopClassName,
  sidebarClassName,
  mobilePanelClassName,
  linkComponent: LinkComp = "a" as unknown as React.ComponentType<{
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }>,
}: AppSidebarProps) {
  const activeHref = navItems
    .filter((item) => pathname === item.href || pathname.startsWith(`${item.href}/`))
    .sort((left, right) => right.href.length - left.href.length)[0]?.href;

  const sidebarContent = (
    <aside
      className={cn(
        "flex h-full w-56 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground",
        sidebarClassName
      )}
    >
      {/* Brand */}
      <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          {brand.logo ?? (
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-sidebar-primary text-[11px] font-extrabold text-sidebar-primary-foreground shadow-sm">
              B
            </div>
          )}
          <div>
            <div className="text-sm font-semibold leading-tight text-sidebar-foreground">
              {brand.name}
            </div>
            {brand.subtitle && (
              <div className="text-[11px] leading-tight text-muted-foreground">
                {brand.subtitle}
              </div>
            )}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
            aria-label="Close sidebar"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {contextPanel && (
        <div className="border-b border-sidebar-border px-4 py-4">
          {contextPanel}
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navItems.map((item) => {
          const isActive = activeHref === item.href;
          const Icon = item.icon;
          return (
            <LinkComp
              key={item.href}
              href={item.href}
              onClick={() => {
                onNavigate?.(item.href);
              onClose?.();
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {item.label}
            </LinkComp>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="border-t border-sidebar-border p-4">
          {footer}
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className={cn("hidden md:fixed md:top-0 md:bottom-0 md:left-0 md:z-50 md:flex md:w-56", desktopClassName)}>
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className={cn("relative z-10 h-full w-56 border-r border-sidebar-border shadow-xl", mobilePanelClassName)}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}

/**
 * AppContent — main content area paired with AppSidebar.
 * Adds the left margin to account for the fixed sidebar.
 */
function AppContent({
  className,
  offsetClassName,
  children,
  ...props
}: React.ComponentProps<"div"> & { offsetClassName?: string }) {
  return (
    <div className={cn("min-h-screen bg-background md:ml-56", offsetClassName, className)} {...props}>
      {children}
    </div>
  );
}

/**
 * AppMobileHeader — mobile-only header with hamburger menu.
 */
function AppMobileHeader({
  title = "BotPilot",
  onMenuClick,
}: {
  title?: string;
  onMenuClick: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border/70 bg-background/95 px-4 py-4 backdrop-blur md:hidden">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        aria-label="Open menu"
      >
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <span className="text-sm font-semibold">{title}</span>
    </header>
  );
}

/**
 * SidebarUserFooter — shared user info footer for sidebar.
 */
function SidebarUserFooter({
  name,
  email,
  onLogout,
}: {
  name: string;
  email: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="min-w-0">
        <div className="truncate text-xs font-medium">{name}</div>
        <div className="truncate text-[11px] text-muted-foreground">{email}</div>
      </div>
      <button
        onClick={onLogout}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
        title="登出"
      >
        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}

export {
  AppSidebar,
  AppContent,
  AppMobileHeader,
  SidebarUserFooter,
  type NavItem,
  type AppSidebarProps,
};
