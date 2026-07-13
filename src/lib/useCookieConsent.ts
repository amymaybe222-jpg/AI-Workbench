"use client";

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS } from "./storageKeys";

export type ConsentChoice = "accepted" | "declined" | null;

// A plain `storage` event only fires in *other* tabs, not the one that made
// the change, so the banner (which writes the choice) and the analytics
// loader (which needs to react to it immediately, same tab) share state via
// this custom event instead of two independent localStorage reads.
const CHANGE_EVENT = "aiw:cookie-consent-changed";

function readConsent(): ConsentChoice {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.cookieConsent);
    return raw ? (JSON.parse(raw) as ConsentChoice) : null;
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  const [consent, setConsentState] = useState<ConsentChoice>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setConsentState(readConsent());
    setHydrated(true);

    function onChange() {
      setConsentState(readConsent());
    }
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  const setConsent = useCallback((value: ConsentChoice) => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.cookieConsent, JSON.stringify(value));
    } catch {
      // storage may be unavailable (private mode, quota) — fail silently
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  return { consent, setConsent, hydrated } as const;
}
