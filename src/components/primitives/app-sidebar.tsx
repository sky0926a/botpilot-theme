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
  navItems: NavItem[];
  pathname: string;
  onNavigate?: (href: string) => void;
  footer?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  linkComponent?: React.ComponentType<{
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }>;
}

function AppSidebar({
  brand,
  navItems,
  pathname,
  onNavigate,
  footer,
  open = false,
  onClose,
  linkComponent: LinkComp = "a" as unknown as React.ComponentType<{
    href: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
  }>,
}: AppSidebarProps) {
  const sidebarContent = (
    <aside className="flex flex-col w-56 h-full bg-card border-r border-border">
      {/* Brand */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {brand.logo ?? (
            <div className="size-7 rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-[11px] font-extrabold text-black">
              B
            </div>
          )}
          <div>
            <div className="text-sm font-semibold leading-tight">
              {brand.name}
            </div>
            {brand.subtitle && (
              <div className="text-[11px] text-muted-foreground leading-tight">
                {brand.subtitle}
              </div>
            )}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-md hover:bg-muted"
            aria-label="Close sidebar"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </LinkComp>
          );
        })}
      </nav>

      {/* Footer */}
      {footer && (
        <div className="p-3 border-t border-border">
          {footer}
        </div>
      )}
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:fixed md:left-0 md:top-0 md:bottom-0 md:w-56 md:z-50">
        {sidebarContent}
      </div>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="relative z-10 h-full w-56">
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
function AppContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("md:ml-56 min-h-screen", className)} {...props}>
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
    <header className="md:hidden sticky top-0 z-40 flex items-center gap-3 border-b bg-background px-4 py-3">
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-md hover:bg-muted"
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
        <div className="text-xs font-medium truncate">{name}</div>
        <div className="text-[11px] text-muted-foreground truncate">{email}</div>
      </div>
      <button
        onClick={onLogout}
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
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
