import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { Table } from "@/components/ui/table/Table";
import { getAdminDashboardData } from "./queries";
import { AdminApproveButton } from "./AdminApproveButton";
import { AdminPanelAssignForm } from "./AdminPanelAssignForm";
import { AdminPanelActionButton } from "./AdminPanelActionButton";
import type { AdminPanelName } from "./types";

const ACTIVE_PANEL_CONFIGS: Array<{
  name: AdminPanelName;
  label: string;
  maxItems: number;
  note?: string;
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
  {
    name: "secondary_mini_cards",
    label: "Secondary mini cards",
    maxItems: 4,
    note: "Auto-filled with the latest published articles, but can be manually switched. This panel must always contain exactly four cards.",
  },
];

function HomePanelSection({
  title,
  articles,
  panelName,
  maxItems,
  note,
  availableArticles,
}: {
  title: string;
  articles: Array<{ id: string; title: string; href?: string }>;
  panelName: AdminPanelName;
  maxItems: number;
  note?: string;
  availableArticles: Array<{ id: string; title: string; slug: string }>;
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
                  <AdminPanelActionButton panelName={panelName} articleId={article.id} mode="remove">
                    Remove
                  </AdminPanelActionButton>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">Reserved</span>
                )}
              </div>
              {article?.href ? (
                <span className="text-xs text-neutral-500">Href: {article.href}</span>
              ) : null}
              {!article ? (
                <AdminPanelAssignForm panelName={panelName} availableArticles={availableArticles} />
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

export async function AdminDashboardPageView() {
  const { queuedArticles, publishedArticles, homePage } = await getAdminDashboardData();

  return (
    <div className="flex flex-col gap-8">
      <StudioPageHeader
        eyebrow="Admin workspace"
        title="Admin"
        description="Approve submitted stories and manage the articles that appear on the home page."
      />

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black">Approval queue</h2>
          <p className="mt-1 text-sm text-neutral-600">Submitted articles can be approved from here and promoted straight to published.</p>
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
            {queuedArticles.length ? (
              queuedArticles.map((article) => (
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
                  No submitted articles are waiting for approval right now.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
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
            note="Automatically filled from the latest published articles, but this panel can be manually switched. It must always contain exactly four cards."
            availableArticles={publishedArticles}
          />
        </div>
      </section>
    </div>
  );
}
