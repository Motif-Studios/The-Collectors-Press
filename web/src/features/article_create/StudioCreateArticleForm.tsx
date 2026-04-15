"use client";

import React from "react";
import { CoverUpload } from "@/components/ui/cover_image_upload/CoverUpload";
import { EditorCard } from "@/components/ui/editor_card/EditorCard";
import { ArticleMetaCard } from "@/components/ui/article_meta_card/ArticleMetaCard";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { classNameHelper } from "@/lib/utils/classNameHelper";
import { StudioArticleBodyEditor } from "./StudioArticleBodyEditor";
import type { StudioCreateArticle, EditorJsContent } from "./types";

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
  onChange: (article: StudioCreateArticle) => void;
};

export function StudioCreateArticleForm({
  authorName,
  categories,
  article,
  onChange,
}: StudioCreateArticleFormProps) {
  function updateField<K extends keyof StudioCreateArticle>(
    key: K,
    value: StudioCreateArticle[K],
  ) {
    onChange({
      ...article,
      [key]: value,
    });
  }

  function handleBodyChange(body: EditorJsContent) {
    onChange({
      ...article,
      body,
    });
  }

  React.useEffect(() => {
    console.log("current article form:", article);
  }, [article]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <ArticleMetaCard label="Author">
          <span>{authorName}</span>
        </ArticleMetaCard>

        <ArticleMetaCard label="Category">
          <select
            value={article.category}
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
          <ArticleStatusBadge status={article.status} />
        </ArticleMetaCard>

        <ArticleMetaCard label="Last saved">
          <span>{article.lastSavedLabel}</span>
        </ArticleMetaCard>
      </div>

      <EditorCard className="space-y-6">
        <div className="space-y-2">
          <Label>Title</Label>

          <InputField
            value={article.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Enter article title"
            className="mt-2 h-[72px] px-5 text-3xl font-normal text-[#8a8177] placeholder:text-[#8a8177] md:text-3xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Subtitle</Label>

          <TextAreaField
            value={article.subtitle}
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
          />
        </div>

        <div className="space-y-2">
          <Label>Cover image annotation</Label>

          <TextAreaField
            value={article.coverImageCaption}
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
            initialData={article.body}
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
