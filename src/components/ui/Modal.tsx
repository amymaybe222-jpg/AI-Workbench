"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Card } from "./Card";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <Card className="relative w-full max-w-sm text-center">
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-text"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        {children}
      </Card>
    </div>
  );
}
