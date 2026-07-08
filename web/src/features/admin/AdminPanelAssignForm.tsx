"use client";

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import { assignAdminArticleToPanelApi, type AdminPanelName } from "@/lib/api/admin_dashboard";

type AdminPublishedArticle = {
  id: string;
  title: string;
  slug: string;
};

type AdminPanelAssignFormProps = {
  panelName: AdminPanelName;
  availableArticles: AdminPublishedArticle[];
};

export function AdminPanelAssignForm({ panelName, availableArticles }: AdminPanelAssignFormProps) {
  const router = useRouter();
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();
  const [pending, setPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [articleId, setArticleId] = useState(availableArticles[0]?.id ?? "");

  const hasArticles = availableArticles.length > 0;

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return availableArticles;
    }

    return availableArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(query) ||
        article.slug.toLowerCase().includes(query) ||
        article.id.toLowerCase().includes(query)
      );
    });
  }, [availableArticles, searchQuery]);

  const selectedArticle = useMemo(
    () => availableArticles.find((article) => article.id === articleId) ?? null,
    [availableArticles, articleId],
  );

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setArticleId(event.target.value);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const nextQuery = event.target.value;
    setSearchQuery(nextQuery);

    const firstMatch = availableArticles.find((article) => {
      const needle = nextQuery.trim().toLowerCase();

      if (!needle) {
        return true;
      }

      return (
        article.title.toLowerCase().includes(needle) ||
        article.slug.toLowerCase().includes(needle) ||
        article.id.toLowerCase().includes(needle)
      );
    });

    if (firstMatch) {
      setArticleId(firstMatch.id);
    }
  }

  async function handleAssign() {
    if (!articleId) {
      showError("Choose an article first.");
      return;
    }

    clearMessage();
    setPending(true);

    try {
      await assignAdminArticleToPanelApi(panelName, articleId);
      showSuccess(selectedArticle ? `Assigned ${selectedArticle.title} to the panel.` : "Assigned article to the panel.");
      window.setTimeout(() => {
        router.refresh();
      }, 900);
    } catch (error) {
      showError(error instanceof Error ? error.message : "We couldn't assign that article right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded border border-dashed border-neutral-300 bg-neutral-50 p-3">
      <div className="flex flex-col gap-2">
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search published articles..."
          disabled={!hasArticles || pending}
          className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition placeholder:text-neutral-500 focus:border-black disabled:cursor-not-allowed disabled:bg-neutral-100"
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <select
          value={articleId}
          onChange={handleChange}
          disabled={!hasArticles || pending}
          className="min-w-0 flex-1 rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-black disabled:cursor-not-allowed disabled:bg-neutral-100"
        >
          {!hasArticles ? <option value="">No published articles available</option> : null}
          {filteredArticles.length ? filteredArticles.map((article) => (
            <option key={article.id} value={article.id}>
              {article.title}
            </option>
          )) : <option value="">No matching articles</option>}
        </select>

        <button
          type="button"
          onClick={handleAssign}
          disabled={!hasArticles || pending}
          className="cursor-pointer rounded bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {pending ? "Adding..." : "Add to slot"}
        </button>
        </div>
      </div>

      <p className="text-xs text-neutral-500">
        Search published articles by title, slug, or id, then pick one to fill this empty slot. The panel still respects its fixed capacity.
      </p>
    </div>
  );
}