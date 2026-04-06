import React from "react";
import { CoverUpload } from "@/components/ui/cover_image_upload/CoverUpload";
import { EditorCard } from "@/components/ui/editor_card/EditorCard";
import { ArticleMetaCard } from "@/components/ui/article_meta_card/ArticleMetaCard";
import { ArticleStatusBadge } from "@/components/ui/article_status_badge/ArticleStatusBadge";
import { classNameHelper } from "@/lib/utils/classNameHelper";
import { StudioPageHeader } from "@/components/ui/studio_page_header/StudioPageHeader";
import { ActionButton } from "@/components/ui/action_button/ActionButton";
import { getStudioCreateArticleData } from "./queries";

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
        "mt-2 font-serif w-full border border-neutral-200 bg-white px-4 py-3 text-black outline-none transition placeholder:text-[#8a8177] focus:border-neutral-400",
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

export async function StudioCreateArticlePageView() {
  const { authorName, categories, article } =
    await getStudioCreateArticleData();

  return (
    <div>
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <StudioPageHeader
            title="Create article"
            description="Draft, preview and prepare your story for publishing."
            actions={
              <>
                <ActionButton>Save draft</ActionButton>
                <ActionButton>Preview</ActionButton>
                <ActionButton variant="primary">Publish</ActionButton>
              </>
            }
          />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            <ArticleMetaCard label="Author">
              <span>{authorName}</span>
            </ArticleMetaCard>

            <ArticleMetaCard label="Category">
              <select
                defaultValue={article.selectedCategory}
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
                defaultValue={article.title}
                placeholder="Enter article title"
                className="mt-2 h-[72px] px-5 text-3xl font-normal text-[#8a8177] placeholder:text-[#8a8177] md:text-3xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Subtitle</Label>

              <TextAreaField
                defaultValue={article.subtitle}
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
                defaultValue={article.coverImageCaption}
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
                Use the editor below to add paragraphs, headings, images, embeds
                and videos.
              </p>
            </div>

            <div className="min-h-[720px] border border-neutral-200 bg-white p-6 md:p-11">
              {/* TODO: Mount Editor.js here */}
            </div>
          </EditorCard>

          <div className="border border-neutral-200 px-4 py-4 text-[15px] text-neutral-700">
            <strong>Tip:</strong> Press the + button inside the editor to add
            content blocks like headings, lists, images and embeds.
          </div>
        </div>
      </div>
    </div>
  );
}
