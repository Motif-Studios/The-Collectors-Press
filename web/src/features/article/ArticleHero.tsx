import Image from "next/image";
import type { Article } from "@/features/article/types";
import { SaveArticleButton } from "./SaveArticleButton";

type ArticleHeroProps = {
  article: Article;
  userId?: string;
};

function formatArticleDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Pacific/Auckland",
  });
}

export function ArticleHero({ article, userId }: ArticleHeroProps) {
  return (
    <section className="mb-12 pt-11 max-[640px]:pt-7">
      {article.category ? (
        <p className="mb-4.5 font-sans text-[11px] font-bold uppercase tracking-[1.4px] text-[#c44232]">
          {article.category}
        </p>
      ) : null}

      <h1 className="mb-5.5 font-[Georgia,'Times_New_Roman',serif] text-[3.65rem] leading-[1.08] font-medium tracking-[-0.4px] text-black max-[900px]:text-[3rem] max-[640px]:mb-4.5 max-[640px]:text-[2.2rem] max-[640px]:leading-[1.12]">
        {article.title}
      </h1>

      {article.subtitle ? (
        <p className="mb-5.5 max-w-[90%] font-[Georgia,'Times_New_Roman',serif] text-[1.08rem] leading-[1.55] text-black max-[640px]:text-[1rem]">
          {article.subtitle}
        </p>
      ) : null}

      <p className="mb-10 font-[Georgia,'Times_New_Roman',serif] text-[1.05rem] leading-[1.4] text-black">
        By {article.author.name}
      </p>

      {article.coverImage ? (
        <figure className="mb-0">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt || article.title}
            width={1600}
            height={900}
            className="block aspect-[16/9.2] w-full object-cover bg-black"
            priority
          />

          {article.coverImage.caption ? (
            <figcaption className="mt-2 font-sans text-[11px] font-semibold tracking-[0.3px] text-[#6f7690]">
              {article.coverImage.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mt-5.5 flex items-center justify-between gap-6 border-b border-[#d8d8d8] pb-8.5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-4.5">
        <p className="font-sans text-[12px] font-bold uppercase tracking-[1.4px] text-[#111]">
          {article.publishedAt ? formatArticleDate(article.publishedAt) : ""}
        </p>

        <div className="flex items-center gap-6.5 max-[640px]:flex-wrap max-[640px]:gap-4.5">
          {/* <button
            type="button"
            className="inline-flex items-center gap-1.75 font-sans text-[12px] font-bold uppercase tracking-[1.2px] text-[#111] hover:opacity-70 transition"
          >
            <span>Share</span>
            <Icon
              icon={faShare}
              className="text-[14px]"
            />
          </button> */}

          {userId ? <SaveArticleButton userId={userId} articleId={article.id} /> : null}
        </div>
      </div>
    </section>
  );
}
