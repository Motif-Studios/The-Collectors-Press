"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";

type Props = {
  currentSearch: string;
  currentStatus: string;
  currentSort: string;
};

export function StudioDashboardFilters({ currentSearch, currentStatus, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="min-w-0 flex-1">
        <input
          type="text"
          placeholder="Search articles"
          defaultValue={currentSearch}
          onChange={(e) => updateParam("search", e.target.value)}
          className="min-h-12 w-full border border-neutral-300 bg-white px-4 text-[15px] text-black outline-none placeholder:text-neutral-500"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <select
          defaultValue={currentStatus}
          onChange={(e) => updateParam("status", e.target.value)}
          className="min-h-12 border border-neutral-300 bg-white px-3 text-sm text-black outline-none"
        >
          <option value="">All status</option>
          <option value="draft">Draft</option>
          <option value="submitted">Submitted</option>
          <option value="rejected">Rejected</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        <select
          defaultValue={currentSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="min-h-12 border border-neutral-300 bg-white px-3 text-sm text-black outline-none"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="az">A–Z</option>
        </select>
      </div>
    </div>
  );
}
