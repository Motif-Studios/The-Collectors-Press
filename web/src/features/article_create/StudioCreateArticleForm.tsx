"use client";

import React from "react";
import { CoverUpload } from "@/components/ui/cover_image_upload/CoverUpload";
import { EditorCard } from "@/components/ui/editor_card/EditorCard";
import { ArticleMetaCard } from "@/components/ui/article_meta_card/ArticleMetaCard";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { classNameHelper } from "@/lib/utils/classNameHelper";
import { StudioArticleBodyEditor } from "./StudioArticleBodyEditor";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";
import type {
  StudioCreateArticle,
  EditorJsContent,
} from "./types";
import { saveArticle } from "./queries/saveArticle";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-medium uppercase tracking-widest text-neutral-700">
      {children}
    </span>
  );
}

function InputField({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={classNameHelper(
        "mt-2 w-full border border-neutral-200 bg-white px-4 py-3 font-serif text-black outline-none transition placeholder:text-[#8a8177] focus:border-neutral-400",
        className,
      )}
    />
  );
}

function TextAreaField({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={classNameHelper(
        "mt-2 w-full resize-none border border-neutral-200 bg-white px-4 py-3 text-black outline-none transition placeholder:text-[#8a8177] focus:border-neutral-400",
        className,
      )}
    />
  );
}

type StudioCreateArticleFormProps = {
  authorName: string;
  categories: string[];
  article: StudioCreateArticle;
  onChange?: (article: StudioCreateArticle) => void;
};

export function StudioCreateArticleForm({
  authorName,
  categories,
  article,
  onChange,
}: StudioCreateArticleFormProps) {
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();
  const [localArticle, setLocalArticle] = React.useState<StudioCreateArticle>(article);

  React.useEffect(() => {
    if (!onChange) {
      setLocalArticle(article);
    }
  }, [article, onChange]);

  const currentArticle = onChange ? article : localArticle;

  function updateField<K extends keyof StudioCreateArticle>(
    key: K,
    value: StudioCreateArticle[K],
  ) {
    const nextArticle = {
      ...currentArticle,
      [key]: value,
    };

    if (onChange) {
      onChange(nextArticle);
      return;
    }

    setLocalArticle(nextArticle);
  }

  function handleBodyChange(body: EditorJsContent) {
    const nextArticle = {
      ...currentArticle,
      body,
    };

    if (onChange) {
      onChange(nextArticle);
      return;
    }

    setLocalArticle(nextArticle);
  }

  // debounce saving (12 seconds)
  React.useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        if (!currentArticle.id) {
          return;
        }
        const response = await saveArticle(currentArticle.id, currentArticle);
        clearMessage();
        showSuccess("Article saved successfully.");
      } catch (error) {
        console.error("Failed to save article:", error);
        showError("We couldn't save your article right now. Please try again.");
      }
    }, 12000);

    return () => clearTimeout(timeout);
  }, [clearMessage, currentArticle, currentArticle.id, showError, showSuccess]);
 
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <ArticleMetaCard label="Author">
          <span>{authorName}</span>
        </ArticleMetaCard>

        <ArticleMetaCard label="Category">
          <select
            value={currentArticle.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full bg-transparent text-sm text-black outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </ArticleMetaCard>

        <ArticleMetaCard label="Status">
          <ArticleStatusBadge status={currentArticle.status} />
        </ArticleMetaCard>

        <ArticleMetaCard label="Last saved">
          <span>{currentArticle.lastSavedLabel}</span>
        </ArticleMetaCard>
      </div>

      {currentArticle.status === "rejected" ? (
        <div className="border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
          <strong className="block font-semibold">Rejected</strong>
          <span className="mt-1 block">
            {currentArticle.rejectionReason?.trim() || "This article was rejected. Please review the feedback before resubmitting."}
          </span>
        </div>
      ) : null}

      <EditorCard className="space-y-6">
        <div className="space-y-2">
          <Label>Title</Label>

          <InputField
            value={currentArticle.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter article title"
            className="mt-2 h-[72px] px-5 text-3xl font-normal text-[#8a8177] placeholder:text-[#8a8177] md:text-3xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Subtitle</Label>

          <TextAreaField
            value={currentArticle.subtitle}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Add a short subtitle or standfirst"
            rows={3}
            className="min-h-[120px] text-lg text-[#8a8177] placeholder:text-[#8a8177]"
          />
        </div>
      </EditorCard>

      <EditorCard className="space-y-6">
        <div className="space-y-2">
          <Label>Cover image</Label>

          <CoverUpload
            id="cover-image-upload"
            name="coverImage"
            className="mt-2"
            article_id={currentArticle.id}
            previewUrl={currentArticle.coverImageUrl}
            onUploaded={({ publicUrl }) => updateField("coverImageUrl", publicUrl)}
          />

          <p className="text-xs uppercase tracking-[0.08em] text-neutral-500">Cover image</p>
        </div>

        <div className="space-y-2">
          <Label>Cover image annotation</Label>

          <TextAreaField
            value={currentArticle.coverImageCaption}
            onChange={(e) => updateField("coverImageCaption", e.target.value)}
            placeholder="Write a caption or credit for the cover image"
            rows={3}
            className="min-h-[120px] text-lg text-[#8a8177] placeholder:text-[#8a8177]"
          />
        </div>
      </EditorCard>

      <EditorCard className="space-y-5">
        <div>
          <h2 className="font-serif text-3xl text-black md:text-4xl">
            Article body
          </h2>

          <p className="mt-2 text-lg text-neutral-600">
            Use the editor below to add paragraphs, headings, images, embeds and
            videos.
          </p>
        </div>

        <div className="article-editor min-h-[720px] border border-neutral-200 bg-white py-4">
          <StudioArticleBodyEditor
            initialData={currentArticle.body}
            articleId={currentArticle.id}
            onChange={handleBodyChange}
          />
        </div>
      </EditorCard>

      <div className="border border-neutral-200 px-4 py-4 text-[15px] text-neutral-700">
        <strong>Tip:</strong> Press the + button inside the editor to add
        content blocks like headings, lists, images and embeds.
      </div>
    </div>
  );
}
