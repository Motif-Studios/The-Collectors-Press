"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";

import { StudioCreateArticleForm } from "./StudioCreateArticleForm";
import { saveStudioCreateArticleDraft, publishStudioCreateArticle } from "./queries";
import type { StudioCreateArticle } from "./types";

type Props = {
  authorName: string;
  categories: string[];
  initialArticle: StudioCreateArticle;
};

export function StudioCreateArticleEditor({
  authorName,
  categories,
  initialArticle,
}: Props) {
  const [form, setForm] = useState<StudioCreateArticle>(initialArticle);
  const router = useRouter();

  async function handleSaveDraft() {
    const saved = await saveStudioCreateArticleDraft(form);
    setForm(saved);
  }

  async function handlePreview() {
    const saved = await saveStudioCreateArticleDraft(form);
    setForm(saved);
    router.push(`/studio/preview/${saved.id}`);
  }

  async function handlePublish() {
    const saved = await publishStudioCreateArticle(form);
    setForm(saved);
  }

  return (
    <div className="flex flex-col gap-6">
      <StudioPageHeader
        title="Create article"
        description="Draft, preview and prepare your story for publishing."
        actions={
          <>
            <ActionButton onClick={handleSaveDraft}>
              Save draft
            </ActionButton>

            <ActionButton onClick={handlePreview}>
              Preview
            </ActionButton>

            <ActionButton variant="primary" onClick={handlePublish}>
              Publish
            </ActionButton>
          </>
        }
      />

      <StudioCreateArticleForm
        authorName={authorName}
        categories={categories}
        article={form}
        onChange={setForm}
      />
    </div>
  );
}