import type * as React from "react";

import { cn } from "../../lib/cn";

/**
 * PageLayout — shared content wrapper for all BotPilot services.
 * Centers content, constrains max-width, and provides consistent padding.
 */
function PageLayout({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="page-layout"
      className={cn("mx-auto w-full max-w-7xl px-6 py-8", className)}
      {...props}
    />
  );
}

/**
 * PageHeader — consistent page title section.
 */
function PageHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header"
      className={cn("space-y-1", className)}
      {...props}
    />
  );
}

/**
 * PageTitle — h1 for page titles.
 */
function PageTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="page-title"
      className={cn("text-2xl font-bold tracking-tight", className)}
      {...props}
    />
  );
}

/**
 * PageDescription — subtitle below page title.
 */
function PageDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="page-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/**
 * PageSection — groups related content with a label.
 */
function PageSection({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="page-section"
      className={cn("space-y-3", className)}
      {...props}
    />
  );
}

/**
 * PageSectionTitle — section heading, smaller and muted.
 */
function PageSectionTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="page-section-title"
      className={cn(
        "text-sm font-medium text-muted-foreground flex items-center gap-2",
        className
      )}
      {...props}
    />
  );
}

export {
  PageLayout,
  PageHeader,
  PageTitle,
  PageDescription,
  PageSection,
  PageSectionTitle,
};
