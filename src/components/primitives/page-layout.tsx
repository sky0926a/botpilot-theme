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
      className={cn("mx-auto w-full max-w-[1180px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10 xl:py-12", className)}
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
      className={cn("space-y-2", className)}
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
      className={cn("text-[1.85rem] font-semibold tracking-[-0.03em] text-foreground", className)}
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
      className={cn("max-w-2xl text-sm leading-6 text-muted-foreground", className)}
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
      className={cn("space-y-4", className)}
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
        "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/90",
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
