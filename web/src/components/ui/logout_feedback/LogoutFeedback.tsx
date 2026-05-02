"use client";

import React from "react";

type FeedbackType = "success" | "error";

type LogoutFeedbackState = {
  message: string;
  type: FeedbackType | null;
};

type LogoutFeedbackContextValue = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  clearMessage: () => void;
  state: LogoutFeedbackState;
};

const FEEDBACK_STORAGE_KEY = "the_collectors_press_feedback";

function persistFeedback(message: string, type: FeedbackType) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify({ message, type }));
}

function readPersistedFeedback(): LogoutFeedbackState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(FEEDBACK_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LogoutFeedbackState>;

    if (typeof parsed.message !== "string" || (parsed.type !== "success" && parsed.type !== "error")) {
      return null;
    }

    return { message: parsed.message, type: parsed.type };
  } catch {
    return null;
  }
}

const LogoutFeedbackContext = React.createContext<LogoutFeedbackContextValue | null>(null);

export function LogoutFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<LogoutFeedbackState>({
    message: "",
    type: null,
  });

  React.useEffect(() => {
    const queued = readPersistedFeedback();

    if (queued) {
      setState(queued);
      window.sessionStorage.removeItem(FEEDBACK_STORAGE_KEY);
    }
  }, []);

  const clearMessage = React.useCallback(() => {
    setState({ message: "", type: null });

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(FEEDBACK_STORAGE_KEY);
    }
  }, []);

  const showSuccess = React.useCallback((message: string) => {
    persistFeedback(message, "success");
    setState({ message, type: "success" });
  }, []);

  const showError = React.useCallback((message: string) => {
    persistFeedback(message, "error");
    setState({ message, type: "error" });
  }, []);

  const value = React.useMemo(
    () => ({ showSuccess, showError, clearMessage, state }),
    [showSuccess, showError, clearMessage, state],
  );

  return (
    <LogoutFeedbackContext.Provider value={value}>
      {children}
    </LogoutFeedbackContext.Provider>
  );
}

export function useLogoutFeedback() {
  const context = React.useContext(LogoutFeedbackContext);

  if (!context) {
    throw new Error("useLogoutFeedback must be used within a LogoutFeedbackProvider");
  }

  return context;
}

export function LogoutFeedbackBanner() {
  const { state, clearMessage } = useLogoutFeedback();

  React.useEffect(() => {
    if (!state.message) {
      return;
    }

    const timeout = window.setTimeout(() => {
      clearMessage();
    }, 6500);

    return () => window.clearTimeout(timeout);
  }, [state.message, clearMessage]);

  if (!state.message) {
    return null;
  }

  const isSuccess = state.type === "success";

  return (
    <div
      className={
        isSuccess
          ? "border-b border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 px-4 py-4"
          : "border-b border-red-200 bg-gradient-to-r from-red-50 via-white to-red-50 px-4 py-4"
      }
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur sm:px-5">
        <div className="flex min-w-0 items-start gap-3 text-left">
          <span
            className={
              isSuccess
                ? "mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
                : "mt-0.5 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700"
            }
            aria-hidden="true"
          >
            {isSuccess ? "✓" : "!"}
          </span>

          <div className="min-w-0">
            <p className={isSuccess ? "text-sm font-semibold text-emerald-900" : "text-sm font-semibold text-red-900"}>
              {isSuccess ? "Success" : "Error"}
            </p>
            <p className={isSuccess ? "text-sm text-emerald-800" : "text-sm text-red-800"}>
              {state.message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clearMessage}
          className="shrink-0 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-900"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
