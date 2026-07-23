import Link from "next/link";
import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";
import { ArticleStatsCard } from "@/components/ui/article_stats_card/ArticleStatsCard";
import { Table } from "@/components/ui/table/Table";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { getStudioDashboardData } from "./queries";
import { DeleteArticleButton } from "./DeleteArticleButton";
import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";
import { StudioDashboardFilters } from "./StudioDashboardFilters";

const PAGE_SIZE = 10;

type Props = {
  searchParam?: { search?: string; status?: string; sort?: string; page?: string };
};

export async function StudioDashboardPageView({ searchParam = {} }: Props) {
  const { summary, articles: allArticles } = await getStudioDashboardData();
  const user = await getCurrentUser();

  const isAdmin = user?.userType === "admin";

  const search = searchParam.search ?? "";
  const statusFilter = searchParam.status ?? "";
  const sort = searchParam.sort ?? "newest";
  const page = Math.max(0, parseInt(searchParam.page ?? "0", 10));

  // Apply filters
  let filtered = allArticles;
  if (search) {
    const term = search.toLowerCase();
    filtered = filtered.filter((a) => a.title.toLowerCase().includes(term));
  }
  if (statusFilter) {
    filtered = filtered.filter((a) => a.status === statusFilter);
  }

  // Apply sort
  if (sort === "oldest") {
    filtered = [...filtered].sort((a, b) =>
      new Date(a.updatedAtLabel).getTime() - new Date(b.updatedAtLabel).getTime()
    );
  } else if (sort === "az") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered = [...filtered].sort((a, b) =>
      new Date(b.updatedAtLabel).getTime() - new Date(a.updatedAtLabel).getTime()
    );
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const articles = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-6">
      <StudioPageHeader
        title="Articles"
        description="Manage drafts, published stories and archived articles."
        actions={<ActionButton variant="primary" href="/studio/create">Create article</ActionButton>}
      />

      {isAdmin ? (
        <section className="rounded-md border border-neutral-200 bg-white px-5 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-black">Admin tools</h2>
              <p className="mt-1 text-sm text-neutral-600">
                Review submitted articles and manage the home page panels.
              </p>
            </div>
            <ActionButton variant="primary" href="/studio/admin">
              Open admin page
            </ActionButton>
          </div>
        </section>
      ) : null}

      <StudioDashboardFilters
        currentSearch={search}
        currentStatus={statusFilter}
        currentSort={sort}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ArticleStatsCard label="Total articles" value={summary.totalArticles} />
        <ArticleStatsCard label="Drafts" value={summary.drafts} />
        <ArticleStatsCard label="Submitted" value={summary.submitted} />
        <ArticleStatsCard label="Rejected" value={summary.rejected} />
        <ArticleStatsCard label="Published" value={summary.published} />
        <ArticleStatsCard label="Archived" value={summary.archived} />
      </div>

      <Table>
        <thead>
          <tr className="bg-[#f8f8f8]">
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Title</th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Status</th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Category</th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Author</th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Actions</th>
          </tr>
        </thead>

        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td className="px-[18px] py-[18px] text-sm text-neutral-500" colSpan={5}>
                No articles found.
              </td>
            </tr>
          ) : articles.map((article) => (
            <tr key={article.id}>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black last:border-b-0">
                <div className="flex flex-col gap-1.5">
                  <strong className="text-[15px] font-semibold leading-normal">{article.title}</strong>
                  <span className="text-[13px] leading-[1.4] text-neutral-500">Slug: {article.slug}</span>
                </div>
              </td>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <ArticleStatusBadge status={article.status} />
              </td>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                {article.category}
              </td>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <span className="block max-w-[140px] truncate">{article.authorName}</span>
              </td>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <div className="flex flex-wrap gap-2.5">
                  <Link href={`/studio/create/${article.id}/${article.slug}`} className="text-sm text-black underline underline-offset-[3px]">
                    Edit
                  </Link>
                  <DeleteArticleButton articleId={article.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {page > 0 ? (
            <Link href={`?search=${search}&status=${statusFilter}&sort=${sort}&page=${page - 1}`} className="text-sm text-black underline">
              ← Previous
            </Link>
          ) : (
            <span className="text-sm text-neutral-400">Previous</span>
          )}

          <span className="text-sm text-neutral-600">
            Page {page + 1} of {totalPages}
          </span>

          {page < totalPages - 1 ? (
            <Link href={`?search=${search}&status=${statusFilter}&sort=${sort}&page=${page + 1}`} className="text-sm text-black underline">
              Next →
            </Link>
          ) : (
            <span className="text-sm text-neutral-400">Next</span>
          )}
        </div>
      )}
    </div>
  );
}
