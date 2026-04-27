ALTER TABLE public.article_categories
DROP CONSTRAINT IF EXISTS article_categories_article_id_fkey;

ALTER TABLE public.article_categories
ADD CONSTRAINT article_categories_article_id_fkey
FOREIGN KEY (article_id)
REFERENCES public.article(article_id)
ON DELETE CASCADE;

ALTER TABLE public.article_reads
DROP CONSTRAINT IF EXISTS article_reads_article_id_fkey;

ALTER TABLE public.article_reads
ADD CONSTRAINT article_reads_article_id_fkey
FOREIGN KEY (article_id)
REFERENCES public.article(article_id)
ON DELETE CASCADE;

ALTER TABLE public.article_categories
DROP CONSTRAINT IF EXISTS article_categories_category_id_fkey;

ALTER TABLE public.article_categories
ADD CONSTRAINT article_categories_category_id_fkey
FOREIGN KEY (category_id)
REFERENCES public.category(category_id)
ON DELETE CASCADE;