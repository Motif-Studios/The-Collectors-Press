CREATE TABLE article (
    article_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES profiles(id) NOT NULL,
    title TEXT NOT NULL,
    preview_text TEXT NOT NULL,
    description TEXT NOT NULL,
    content JSONB,
    is_premium BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP
);

CREATE TABLE article_categories (
    article_id UUID REFERENCES article(article_id),
    category_id UUID REFERENCES category(category_id),
    PRIMARY KEY (article_id, category_id)
);

CREATE TABLE article_reads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id),
    article_id UUID REFERENCES article(article_id)
);