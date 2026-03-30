'use client';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

type SearchInputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange?: (value: string) => void;
  onDebouncedChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onClear?: () => void;
};

export function SearchInput({
  value,
  defaultValue = "",
  placeholder = "Search The Collectors Press...",
  debounceMs = 400,
  className = "",
  disabled = false,
  autoFocus = false,
  onChange,
  onDebouncedChange,
  onSubmit,
  onClear,
}: SearchInputProps) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (!onDebouncedChange) return;

    const timer = window.setTimeout(() => {
      onDebouncedChange(currentValue);
    }, debounceMs);

    return () => window.clearTimeout(timer);
  }, [currentValue, debounceMs, onDebouncedChange]);

  function updateValue(nextValue: string) {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  function handleClear() {
    updateValue("");
    onClear?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      onSubmit?.(currentValue);
    }

    if (event.key === "Escape" && currentValue) {
      handleClear();
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500"
      />

      <input
        type="text"
        value={currentValue}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(event) => updateValue(event.target.value)}
        onKeyDown={handleKeyDown}
        className="
          h-12 w-full rounded-lg border-2 border-transparent bg-[#f4f4f4]
          pl-11 pr-10 text-sm text-neutral-900 outline-none transition
          placeholder:text-neutral-500
          hover:bg-neutral-50
          focus:border-black focus:bg-white
          disabled:cursor-not-allowed disabled:opacity-60
        "
      />

      {currentValue.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2
            items-center justify-center rounded-full text-neutral-500 transition
            hover:bg-neutral-200 hover:text-black
          "
        >
          <FontAwesomeIcon icon={faXmark} className="text-sm" />
        </button>
      )}
    </div>
  );
}