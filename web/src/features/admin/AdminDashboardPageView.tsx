import Link from "next/link";
import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { Table } from "@/components/ui/table/Table";
import { getAdminDashboardData } from "./queries";
import { AdminApproveButton } from "./AdminApproveButton";
import { AdminRejectButton } from "./AdminRejectButton";
import { AdminArchiveButton } from "./AdminArchiveButton";
import { AdminArticleStatusControl } from "./AdminArticleStatusControl";
import { AdminPanelAssignForm } from "./AdminPanelAssignForm";
import { AdminPanelActionButton } from "./AdminPanelActionButton";
import type { AdminPanelName } from "./types";

const PAGE_SIZE = 12;
const ADMIN_PATH = "/studio/admin";
const ARTICLE_STATUS_VALUES = ["draft", "submitted", "rejected", "published", "archived"] as const;

type ArticleStatusValue = (typeof ARTICLE_STATUS_VALUES)[number];

type AdminDashboardSearchParams = {
  queuedSearch?: string;
  queuedStatus?: string;
  queuedPage?: string;
  allSearch?: string;
  allStatus?: string;
  allPage?: string;
};

function toNonNegativeInt(value: string | undefined) {
  const parsed = Number.parseInt(value ?? "0", 10);
  if (Number.isNaN(parsed) || parsed < 0) {
    return 0;
  }
  return parsed;
}

function toArticleStatus(value: string | undefined) {
  if (!value) return "";
  return ARTICLE_STATUS_VALUES.includes(value as ArticleStatusValue) ? value : "";
}

function buildAdminHref(
  current: URLSearchParams,
  updates: Record<string, string | number | undefined | null>
) {
  const next = new URLSearchParams(current.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined || value === null || value === "") {
      next.delete(key);
    } else {
      next.set(key, String(value));
    }
  }

  const query = next.toString();
  return query ? `${ADMIN_PATH}?${query}` : ADMIN_PATH;
}

const ACTIVE_PANEL_CONFIGS: Array<{
  name: AdminPanelName;
  label: string;
  maxItems: number;
  note?: string;
  allowManualControls?: boolean;
}> = [
  {
    name: "primary_feature",
    label: "Primary feature",
    maxItems: 1,
    note: "Single lead story only.",
  },
  {
    name: "primary_stories",
    label: "Primary stories",
    maxItems: 3,
    note: "Exactly three stories.",
  },
  {
    name: "secondary_top_stories",
    label: "Secondary top stories",
    maxItems: 2,
    note: "Exactly two stories.",
  },
];

function HomePanelSection({
  title,
  articles,
  panelName,
  maxItems,
  note,
  availableArticles,
  allowManualControls = true,
}: {
  title: string;
  articles: Array<{ id: string; title: string; href?: string }>;
  panelName: AdminPanelName;
  maxItems: number;
  note?: string;
  availableArticles: Array<{ id: string; title: string; slug: string }>;
  allowManualControls?: boolean;
}) {
  const visibleArticles = articles.slice(0, maxItems);
  const slotCount = Math.max(maxItems, visibleArticles.length);
  const slots = Array.from({ length: slotCount }, (_, index) => visibleArticles[index]);

  return (
    <section className="rounded-md border border-neutral-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <div>
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          <p className="mt-1 text-sm text-neutral-600">Current articles in this homepage slot.</p>
          {note ? <p className="mt-1 text-xs text-neutral-500">{note}</p> : null}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {slots.length ? (
          slots.map((article, index) => (
            <div key={`${panelName}-${index}`} className="flex flex-col gap-2 rounded border border-neutral-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm text-black">
                  {`Slot ${index + 1}`}
                  {article ? ` · ${article.title}` : " · Empty"}
                </strong>
                {article ? (
                  allowManualControls ? (
                    <div className="flex items-center gap-2">
                      <AdminPanelActionButton panelName={panelName} articleId={article.id} mode="reorder-up">
                        ↑
                      </AdminPanelActionButton>
                      <AdminPanelActionButton panelName={panelName} articleId={article.id} mode="reorder-down">
                        ↓
                      </AdminPanelActionButton>
                      <AdminPanelActionButton panelName={panelName} articleId={article.id} mode="remove">
                        Remove
                      </AdminPanelActionButton>
                    </div>
                  ) : null
                ) : (
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">Reserved</span>
                )}
              </div>
              {article?.href ? (
                <span className="text-xs text-neutral-500">Href: {article.href}</span>
              ) : null}
              {!article && allowManualControls ? (
                <AdminPanelAssignForm panelName={panelName} availableArticles={availableArticles} position={index + 1} />
              ) : null}
            </div>
          ))
        ) : (
          <div className="text-sm text-neutral-500">No articles are currently pinned here.</div>
        )}
      </div>
    </section>
  );
}

export async function AdminDashboardPageView({ searchParams = {} }: { searchParams?: AdminDashboardSearchParams }) {
  const { queuedArticles, publishedArticles, allArticles, homePage } = await getAdminDashboardData();

  const currentParams = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string" && value.length > 0) {
      currentParams.set(key, value);
    }
  }

  const queuedSearch = (searchParams.queuedSearch ?? "").trim();
  const queuedStatus = toArticleStatus(searchParams.queuedStatus);
  const queuedPage = toNonNegativeInt(searchParams.queuedPage);

  const queuedFiltered = queuedArticles
    .filter((article) => {
      if (!queuedSearch) return true;
      const term = queuedSearch.toLowerCase();
      return article.title.toLowerCase().includes(term) || article.slug.toLowerCase().includes(term);
    })
    .filter((article) => (queuedStatus ? article.status === queuedStatus : true));

  const queuedTotalPages = Math.max(1, Math.ceil(queuedFiltered.length / PAGE_SIZE));
  const queuedPageSafe = Math.min(Math.max(0, queuedPage), queuedTotalPages - 1);
  const queuedVisible = queuedFiltered.slice(queuedPageSafe * PAGE_SIZE, (queuedPageSafe + 1) * PAGE_SIZE);

  const allSearch = (searchParams.allSearch ?? "").trim();
  const allStatus = toArticleStatus(searchParams.allStatus);
  const allPage = toNonNegativeInt(searchParams.allPage);

  const allFiltered = allArticles
    .filter((article) => {
      if (!allSearch) return true;
      const term = allSearch.toLowerCase();
      return article.title.toLowerCase().includes(term) || article.slug.toLowerCase().includes(term);
    })
    .filter((article) => (allStatus ? article.status === allStatus : true));

  const allTotalPages = Math.max(1, Math.ceil(allFiltered.length / PAGE_SIZE));
  const allPageSafe = Math.min(Math.max(0, allPage), allTotalPages - 1);
  const allVisible = allFiltered.slice(allPageSafe * PAGE_SIZE, (allPageSafe + 1) * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-8">
      <StudioPageHeader
        eyebrow="Admin workspace"
        title="Admin"
        description="Approve submitted stories and manage the articles that appear on the home page."
      />

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black">Submitted articles</h2>
          <p className="mt-1 text-sm text-neutral-600">Review submitted articles, approve them, reject them with a reason, or archive them.</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <form action={ADMIN_PATH} method="get" className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <input
              name="queuedSearch"
              defaultValue={queuedSearch}
              placeholder="Search submitted by title or slug"
              className="min-h-11 w-full rounded border border-neutral-300 bg-white px-3 text-sm text-black outline-none transition focus:border-black md:max-w-md"
            />
            <select
              name="queuedStatus"
              defaultValue={queuedStatus}
              className="min-h-11 rounded border border-neutral-300 bg-white px-3 text-sm text-black outline-none transition focus:border-black"
            >
              <option value="">All status</option>
              <option value="submitted">Submitted</option>
              <option value="rejected">Rejected</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <input type="hidden" name="queuedPage" value="0" />
            <input type="hidden" name="allSearch" value={allSearch} />
            <input type="hidden" name="allStatus" value={allStatus} />
            <input type="hidden" name="allPage" value={String(allPageSafe)} />

            <button
              type="submit"
              className="min-h-11 rounded bg-black px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Apply
            </button>
            <Link
              href={buildAdminHref(currentParams, { queuedSearch: "", queuedStatus: "", queuedPage: 0 })}
              className="inline-flex min-h-11 items-center rounded border border-neutral-300 px-4 text-sm text-black"
            >
              Reset
            </Link>
          </form>

          <span className="text-sm text-neutral-600 md:ml-auto">{queuedFiltered.length} results</span>
        </div>

        <Table>
          <thead>
            <tr className="bg-[#f8f8f8]">
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Title</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Status</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Author</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Updated</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {queuedVisible.length ? (
              queuedVisible.map((article) => (
                <tr key={article.id}>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black last:border-b-0">
                    <div className="flex flex-col gap-1.5">
                      <strong className="text-[15px] font-semibold leading-normal">{article.title}</strong>
                      <span className="text-[13px] leading-[1.4] text-neutral-500">Slug: {article.slug}</span>
                      <span className="text-[13px] leading-[1.4] text-neutral-500">Summary: {article.category}</span>
                    </div>
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <ArticleStatusBadge status={article.status} />
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    {article.authorName}
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <span className="text-sm text-neutral-700">{article.updatedAtLabel}</span>
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <div className="flex flex-wrap gap-3">
                      <AdminApproveButton articleId={article.id} />
                      <AdminRejectButton articleId={article.id} />
                      <AdminArchiveButton articleId={article.id} />
                      <Link href={`/studio/preview/${article.id}`} className="text-sm text-black underline underline-offset-[3px]">
                        Preview
                      </Link>
                      <div className="flex flex-wrap gap-3 border-l border-neutral-200 pl-3">
                        {ACTIVE_PANEL_CONFIGS.map((panel) => (
                          <AdminPanelActionButton
                            key={panel.name}
                            panelName={panel.name}
                            articleId={article.id}
                            mode="assign"
                          >
                            {panel.label}
                          </AdminPanelActionButton>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-[18px] py-[18px] text-sm text-neutral-500" colSpan={5}>
                  No submitted articles found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {queuedTotalPages > 1 ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Page {queuedPageSafe + 1} of {queuedTotalPages}</span>
            <div className="flex items-center gap-3 text-sm">
              {queuedPageSafe > 0 ? (
                <Link
                  href={buildAdminHref(currentParams, { queuedPage: queuedPageSafe - 1 })}
                  className="text-black underline underline-offset-[3px]"
                >
                  Previous
                </Link>
              ) : (
                <span className="text-neutral-400">Previous</span>
              )}

              {queuedPageSafe < queuedTotalPages - 1 ? (
                <Link
                  href={buildAdminHref(currentParams, { queuedPage: queuedPageSafe + 1 })}
                  className="text-black underline underline-offset-[3px]"
                >
                  Next
                </Link>
              ) : (
                <span className="text-neutral-400">Next</span>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black">All articles</h2>
          <p className="mt-1 text-sm text-neutral-600">Change the status of any article, including archived stories.</p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <form action={ADMIN_PATH} method="get" className="flex w-full flex-col gap-3 md:flex-row md:items-center">
            <input
              name="allSearch"
              defaultValue={allSearch}
              placeholder="Search all by title or slug"
              className="min-h-11 w-full rounded border border-neutral-300 bg-white px-3 text-sm text-black outline-none transition focus:border-black md:max-w-md"
            />
            <select
              name="allStatus"
              defaultValue={allStatus}
              className="min-h-11 rounded border border-neutral-300 bg-white px-3 text-sm text-black outline-none transition focus:border-black"
            >
              <option value="">All status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="rejected">Rejected</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
            <input type="hidden" name="allPage" value="0" />
            <input type="hidden" name="queuedSearch" value={queuedSearch} />
            <input type="hidden" name="queuedStatus" value={queuedStatus} />
            <input type="hidden" name="queuedPage" value={String(queuedPageSafe)} />

            <button
              type="submit"
              className="min-h-11 rounded bg-black px-4 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              Apply
            </button>
            <Link
              href={buildAdminHref(currentParams, { allSearch: "", allStatus: "", allPage: 0 })}
              className="inline-flex min-h-11 items-center rounded border border-neutral-300 px-4 text-sm text-black"
            >
              Reset
            </Link>
          </form>

          <span className="text-sm text-neutral-600 md:ml-auto">{allFiltered.length} results</span>
        </div>

        <Table>
          <thead>
            <tr className="bg-[#f8f8f8]">
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Title</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Status</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Author</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Updated</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Rejection reason</th>
              <th className="border-b border-neutral-300 px-4.5 py-4 text-left text-xs uppercase tracking-[0.06em] text-neutral-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allVisible.length ? (
              allVisible.map((article) => (
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
                    {article.authorName}
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <span className="text-sm text-neutral-700">{article.updatedAtLabel}</span>
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <span className="text-sm text-neutral-700">{article.rejectionReason || "—"}</span>
                  </td>
                  <td className="border-b border-[#e3ddd4] px-[18px] py-[18px] align-top text-sm text-black">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap gap-3">
                        <Link href={`/studio/create/${article.id}/${article.slug}`} className="text-sm text-black underline underline-offset-[3px]">
                          Edit
                        </Link>
                        <Link href={`/studio/preview/${article.id}`} className="text-sm text-black underline underline-offset-[3px]">
                          Preview
                        </Link>
                        <AdminArchiveButton articleId={article.id} />
                      </div>
                      <AdminArticleStatusControl articleId={article.id} currentStatus={article.status} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-[18px] py-[18px] text-sm text-neutral-500" colSpan={6}>
                  No articles found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {allTotalPages > 1 ? (
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Page {allPageSafe + 1} of {allTotalPages}</span>
            <div className="flex items-center gap-3 text-sm">
              {allPageSafe > 0 ? (
                <Link
                  href={buildAdminHref(currentParams, { allPage: allPageSafe - 1 })}
                  className="text-black underline underline-offset-[3px]"
                >
                  Previous
                </Link>
              ) : (
                <span className="text-neutral-400">Previous</span>
              )}

              {allPageSafe < allTotalPages - 1 ? (
                <Link
                  href={buildAdminHref(currentParams, { allPage: allPageSafe + 1 })}
                  className="text-black underline underline-offset-[3px]"
                >
                  Next
                </Link>
              ) : (
                <span className="text-neutral-400">Next</span>
              )}
            </div>
          </div>
        ) : null}
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black">Homepage panels</h2>
          <p className="mt-1 text-sm text-neutral-600">These panels have fixed slot counts and should always follow the homepage structure.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <HomePanelSection
            title="Primary feature"
            articles={homePage.primaryPanel.feature?.title ? [homePage.primaryPanel.feature] : []}
            panelName="primary_feature"
            maxItems={1}
            note="Exactly one article is allowed here."
            availableArticles={publishedArticles}
            allowManualControls={false}
          />
          <HomePanelSection
            title="Primary stories"
            articles={homePage.primaryPanel.stories}
            panelName="primary_stories"
            maxItems={3}
            note="Exactly three articles are allowed here."
            availableArticles={publishedArticles}
          />
          <HomePanelSection
            title="Secondary top stories"
            articles={homePage.secondaryPanel.topStories}
            panelName="secondary_top_stories"
            maxItems={2}
            note="Exactly two articles are allowed here."
            availableArticles={publishedArticles}
          />
          {/*
          <HomePanelSection
            title="Secondary stories"
            articles={homePage.secondaryPanel.stories}
            panelName="secondary_stories"
            maxItems={4}
            note="Not used for now."
            availableArticles={publishedArticles}
          />
          */}
          <HomePanelSection
            title="Secondary mini cards"
            articles={homePage.secondaryPanel.miniCards}
            panelName="secondary_mini_cards"
            maxItems={4}
            note="Recently added — automatically filled from the latest published articles."
            availableArticles={publishedArticles}
            allowManualControls={false}
          />
        </div>
      </section>
    </div>
  );
}
