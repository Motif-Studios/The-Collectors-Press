import Image from "next/image";
import Link from "next/link";
import "./ArticleCard.css";

export type ArticleCardProps = {
  title: string;
  summary?: string;
  author: string;
  date: string;
  imageSrc: string;
  imageAlt: string;
  caption?: string;
  href?: string;
  className?: string;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function ArticleCard({
  title,
  summary,
  author,
  date,
  imageSrc,
  imageAlt,
  caption,
  href,
  className,
}: ArticleCardProps) {
  const content = (
    <article className={classNameHelper("article-card", className)}>
      <div className="article-card__content">
        <h3 className="article-card__title">{title}</h3>

        {summary ? <p className="article-card__summary">{summary}</p> : null}

        <div className="article-card__meta">
          <span className="article-card__author">{author}</span>
          <span className="article-card__date">{date}</span>
        </div>
      </div>

      <div className="article-card__media">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={320}
          height={180}
          className="article-card__image"
        />
        {caption ? <p className="article-card__caption">{caption}</p> : null}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} className="article-card__link">
        {content}
      </Link>
    );
  }

  return content;
}
