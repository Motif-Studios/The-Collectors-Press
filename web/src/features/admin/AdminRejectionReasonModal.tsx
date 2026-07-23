"use client";

import { useEffect, useId, useState } from "react";

type AdminRejectionReasonModalProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  pending?: boolean;
  initialValue?: string;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void> | void;
};

export function AdminRejectionReasonModal({
  open,
  title,
  description,
  confirmLabel = "Save rejection",
  pending = false,
  initialValue = "",
  onClose,
  onConfirm,
}: AdminRejectionReasonModalProps) {
  const [reason, setReason] = useState(initialValue);
  const [error, setError] = useState("");
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    setReason(initialValue);
    setError("");
  }, [initialValue, open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !pending) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, pending]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      setError("A rejection reason is required.");
      return;
    }

    setError("");
    await onConfirm(trimmedReason);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close rejection modal"
        className="absolute inset-0 bg-black/55"
        onClick={() => {
          if (!pending) {
            onClose();
          }
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-[91] w-full max-w-xl overflow-hidden rounded-[24px] border border-[#d9d2c7] bg-[#fbf7f1] shadow-[0_30px_90px_rgba(0,0,0,0.2)]"
      >
        <div className="border-b border-[#e5ded3] px-6 py-5 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a8177]">
            Editorial review
          </p>
          <h3 id={titleId} className="mt-2 font-serif text-3xl text-[#111]">
            {title}
          </h3>
          <p id={descriptionId} className="mt-2 text-sm leading-6 text-[#5c554d]">
            {description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6 md:px-8">
          <div>
            <label htmlFor="rejection-reason" className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6d645a]">
              Message to the author
            </label>
            <textarea
              id="rejection-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              autoFocus
              rows={6}
              disabled={pending}
              placeholder="Explain what needs to be revised before this story can move forward."
              className="mt-3 w-full resize-none rounded-[18px] border border-[#d9d2c7] bg-white px-4 py-3 font-serif text-[17px] leading-7 text-[#111] outline-none transition focus:border-black disabled:bg-neutral-100"
            />
            {error ? <p className="mt-2 text-sm text-rose-700">{error}</p> : null}
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="rounded-full border border-[#d0c8bc] px-5 py-2.5 text-sm font-medium text-[#3c352f] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
            >
              {pending ? "Saving..." : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
