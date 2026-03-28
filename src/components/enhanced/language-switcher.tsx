"use client";

import { Check, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import * as React from "react";
import { Button } from "../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../primitives/dropdown-menu";
import { cn } from "../../lib/cn";

export const locales = ["zh-CN", "zh-TW", "en", "ru", "ja"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁体中文",
  en: "English",
  ru: "Русский",
  ja: "日本語",
};

const { useRouter, usePathname } = createNavigation();

interface LanguageSwitcherProps {
  className?: string;
  size?: "sm" | "default";
}

/**
 * LanguageSwitcher Component
 *
 * Provides a dropdown UI for switching between supported locales.
 * Automatically persists locale preference via cookie and maintains current route.
 */
export function LanguageSwitcher({ className, size = "sm" }: LanguageSwitcherProps) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const handleLocaleChange = React.useCallback(
    (newLocale: Locale) => {
      if (newLocale === currentLocale || isTransitioning) {
        return;
      }

      setIsTransitioning(true);

      try {
        router.push(pathname || "/dashboard", { locale: newLocale });
      } catch (error) {
        console.error("Failed to switch locale:", error);
        setIsTransitioning(false);
      }
    },
    [currentLocale, pathname, router, isTransitioning]
  );

  const buttonSize = size === "sm" ? "icon" : "default";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={buttonSize}
          className={cn(
            "relative rounded-full border border-border/60 bg-card/70 text-foreground shadow-xs transition-all duration-200 hover:border-border hover:bg-accent/60",
            buttonSize === "icon" && "size-9",
            isTransitioning && "cursor-wait opacity-50",
            className
          )}
          aria-label="Select language"
          disabled={isTransitioning}
        >
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[10rem]" sideOffset={8}>
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className="flex cursor-pointer items-center justify-between"
          >
            <span>{localeLabels[locale]}</span>
            {locale === currentLocale && <Check className="size-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
