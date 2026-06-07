import Link from "next/link";
import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";
import { SelectInput } from "@/components/ui/select_input/SelectInput";
import { ArticleStatsCard } from "@/components/ui/article_stats_card/ArticleStatsCard";
import { Table } from "@/components/ui/table/Table";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { getStudioDashboardData } from "./queries";
import { DeleteArticleButton } from "./DeleteArticleButton";


export async function StudioDashboardPageView() {
  // TODO: Fetch dashboard data from the backend.
  // This should eventually include:
  // - article summary counts
  // - search / filters state
  // - paginated article rows
  // - article actions (edit, preview, restore, delete)

  const { summary, articles } = await getStudioDashboardData();

  return (
    <div className="flex flex-col gap-6">
      <StudioPageHeader
        title="Articles"
        description="Manage drafts, published stories and archived articles."
        actions={<ActionButton variant="primary" href="/studio/create">Create article</ActionButton>}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 flex-1">
          <input
            type="text"
            placeholder="Search articles"
            className="min-h-12 w-full border border-neutral-300 bg-white px-4 text-[15px] text-black outline-none placeholder:text-neutral-500"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <SelectInput>
            <option value="all-status">All status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </SelectInput>

          <SelectInput>
            <option value="all-categories">All categories</option>
            <option value="news">News</option>
            <option value="opinion">Opinion</option>
            <option value="culture">Culture</option>
            <option value="technology">Technology</option>
          </SelectInput>

          <SelectInput>
            <option value="newest-first">Newest first</option>
            <option value="oldest-first">Oldest first</option>
            <option value="recently-updated">Recently updated</option>
            <option value="a-z">A–Z</option>
          </SelectInput>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ArticleStatsCard
          label="Total articles"
          value={summary.totalArticles}
        />
        <ArticleStatsCard label="Drafts" value={summary.drafts} />
        <ArticleStatsCard label="Published" value={summary.published} />
        <ArticleStatsCard label="Archived" value={summary.archived} />
      </div>

      <Table>
        <thead>
          <tr className="bg-[#f8f8f8]">
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Title
            </th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Status
            </th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Category
            </th>
            {/* <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Updated
            </th> */}
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Author
            </th>
            <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black last:border-b-0">
                <div className="flex flex-col gap-1.5">
                  <strong className="text-[15px] font-semibold leading-normal">
                    {article.title}
                  </strong>

                  <span className="text-[13px] leading-[1.4] text-neutral-500">
                    Slug: {article.slug}
                  </span>
                </div>
              </td>

              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <ArticleStatusBadge status={article.status} />
              </td>

              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                {article.category}
              </td>

              {/* <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <span className="inline-block max-w-[90px] leading-[1.45]">
                  {article.updatedAtLabel}
                </span>
              </td> */}

              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="block max-w-[140px] truncate leading-[1.45]">
                    {article.authorName}
                  </span>
                </div>
              </td>

              <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                <div className="flex flex-wrap gap-2.5">
                  <Link href={`/studio/create/${article.id}/${article.slug}`} className="text-sm text-black underline underline-offset-[3px]">
                    Edit
                  </Link>

                  <button className="cursor-pointer p-0 text-sm text-black underline underline-offset-[3px]">
                    {article.secondaryActionLabel}
                  </button>

                  <DeleteArticleButton articleId={article.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button className="text-sm text-black">Previous</button>

        <div className="flex items-center gap-2.5">
          <button className="inline-flex h-9 w-9 items-center justify-center border border-black bg-black text-sm text-white">
            1
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 bg-[#fbfaf7] text-sm text-black">
            2
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center border border-neutral-300 bg-[#fbfaf7] text-sm text-black">
            3
          </button>
        </div>

        <button className="text-sm text-black">Next</button>
      </div>
    </div>
  );
}
