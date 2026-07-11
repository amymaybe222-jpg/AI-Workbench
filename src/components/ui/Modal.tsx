"use client";

import { ReactNode, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFocusTrap } from "@/lib/useFocusTrap";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

// Stays mounted at all times (like the mobile nav drawer in Header.tsx) and
// transitions via plain class toggles on `open` — simpler and more robust
// than mounting/unmounting with a requestAnimationFrame-driven enter state.
// `inert` (rather than aria-hidden) keeps the panel's contents out of the
// a11y tree AND out of the tab order while closed, since it stays mounted.
export function Modal({ open, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, panelRef, onClose);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      role="dialog"
      aria-modal={open}
      aria-label={title}
      inert={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-200 ease-out",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-sm rounded-2xl border border-border bg-surface p-6 text-center shadow-[0_2px_12px_-4px_rgba(21,19,31,0.06)] transition-all duration-200 ease-out dark:shadow-[0_2px_14px_-4px_rgba(0,0,0,0.4)]",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="focus-ring absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted hover:bg-text/5 hover:text-text"
          aria-label="Close"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
}
