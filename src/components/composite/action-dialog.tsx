"use client";

import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../primitives";

export type ActionDialogTone = "default" | "destructive";

export interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  error?: string | null;
  tone?: ActionDialogTone;
  icon?: ReactNode;
  confirmLabel?: string;
  loadingLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  confirmDisabled?: boolean;
  confirmTestId?: string;
  hideCancel?: boolean;
  onConfirm?: () => void;
}

export function ActionDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  error,
  tone = "default",
  icon,
  confirmLabel = "確認",
  loadingLabel,
  cancelLabel = "取消",
  loading = false,
  confirmDisabled = false,
  confirmTestId,
  hideCancel = false,
  onConfirm,
}: ActionDialogProps) {
  const resolvedIcon = icon ?? (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-[15px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] ${
        tone === "destructive"
          ? "border-destructive/18 bg-[#24262b] text-destructive/90"
          : "border-white/[0.08] bg-[#24262b] text-white/70"
      }`}
    >
      <AlertTriangle className="h-[1.05rem] w-[1.05rem]" />
    </div>
  );

  const shouldRenderBody = Boolean(children) || Boolean(error);
  const resolvedConfirmLabel = loading ? loadingLabel ?? confirmLabel : confirmLabel;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="z-[120] max-w-[30rem] gap-0 border-white/[0.07] bg-[#1f2125]/98 p-0 text-white shadow-[0_32px_96px_rgba(0,0,0,0.54),inset_0_1px_0_rgba(255,255,255,0.02)] ring-1 ring-white/[0.025] backdrop-blur-xl"
      >
        <DialogHeader className="gap-0 px-6 py-6 text-left sm:px-7 sm:py-7">
          <div className="flex items-center gap-4.5">
            <div className="shrink-0">{resolvedIcon}</div>
            <DialogTitle className="text-[1.86rem] font-semibold leading-none tracking-[-0.032em] text-white">
              {title}
            </DialogTitle>
          </div>
          {description ? (
            <DialogDescription className="mt-5 max-w-[24rem] text-[1.01rem] leading-[1.92] text-white/54">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {shouldRenderBody ? (
          <div className="space-y-3 px-6 py-5 sm:px-7">
            {children}
            {error ? (
              <div
                className={`rounded-[14px] px-4 py-3 text-sm ${
                  tone === "destructive"
                    ? "border border-destructive/30 bg-destructive/10 text-red-200"
                    : "border border-white/10 bg-white/[0.04] text-white/72"
                }`}
              >
                {error}
              </div>
            ) : null}
          </div>
        ) : null}

        <DialogFooter className="border-t border-white/[0.06] bg-black/[0.08] px-6 py-4.5 sm:justify-end sm:px-7">
          {!hideCancel ? (
            <Button
              variant="outline"
              className="border-white/[0.09] bg-white/[0.035] text-white/70 hover:bg-white/[0.055] hover:text-white"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
          ) : null}
          {onConfirm ? (
            <Button
              variant={tone === "destructive" ? "destructive" : undefined}
              onClick={onConfirm}
              disabled={confirmDisabled || loading}
              data-testid={confirmTestId}
            >
              {resolvedConfirmLabel}
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>{confirmLabel}</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
