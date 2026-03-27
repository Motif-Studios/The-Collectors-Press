CREATE INDEX idx_articles_author ON article(author_id);
CREATE INDEX idx_article_reads_user ON article_reads(user_id);
CREATE INDEX idx_article_reads_article ON article_reads(article_id);