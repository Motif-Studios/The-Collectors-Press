"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SearchInput } from "@/components/ui/search/SearchInput";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const currentQuery = searchParams?.get("q") ?? "";
  const [value, setValue] = useState(currentQuery);

  useEffect(() => {
    setValue(currentQuery);
  }, [currentQuery]);

  function handleSubmit(submittedValue: string) {
    const trimmedValue = submittedValue.trim();
    const params = new URLSearchParams(searchParams?.toString() ?? "");

    if (trimmedValue) {
      params.set("q", trimmedValue);
    } else {
      params.delete("q");
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleClear() {
    setValue("");

    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.delete("q");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  }

  return (
    <SearchInput
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      onClear={handleClear}
      placeholder="Search The Collectors Press..."
    />
  );
}