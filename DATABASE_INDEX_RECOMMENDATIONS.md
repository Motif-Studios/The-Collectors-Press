# Database Index Recommendations

To fully optimize the database queries that have been streamlined, ensure these indexes exist in your Supabase database. Run these migrations in your Supabase SQL editor.

## Critical Indexes (Performance-Critical)

```sql
-- Article status filtering (used in almost every article query)
CREATE INDEX IF NOT EXISTS idx_article_status
ON article(status);

-- Author lookups (used for displaying author names)
CREATE INDEX IF NOT EXISTS idx_article_author_id
ON article(author_id);

-- Article panels (used for homepage panel queries)
CREATE INDEX IF NOT EXISTS idx_article_panels_panel_id
ON article_panels(panel_id);

-- Saved articles user lookup
CREATE INDEX IF NOT EXISTS idx_saved_articles_user_id
ON saved_articles(user_id);

-- Article slug lookups (article detail pages)
CREATE INDEX IF NOT EXISTS idx_article_slug
ON article(slug);
```

## Important Indexes (High-Frequency Queries)

```sql
-- Category lookups
CREATE INDEX IF NOT EXISTS idx_article_categories_article_id
ON article_categories(article_id);

CREATE INDEX IF NOT EXISTS idx_article_categories_category_id
ON article_categories(category_id);

CREATE INDEX IF NOT EXISTS idx_category_name
ON category(category_name);

-- Panel name lookups (used for panel ID caching)
CREATE INDEX IF NOT EXISTS idx_panels_name
ON panels(name);
```

## Composite Indexes (Complex Queries)

```sql
-- Composite index for article filtering and ordering
CREATE INDEX IF NOT EXISTS idx_article_status_created
ON article(status, created_at DESC);

-- Composite index for saved articles with user
CREATE INDEX IF NOT EXISTS idx_saved_articles_user_created
ON saved_articles(user_id, created_at DESC);

-- Composite index for article panels ordering
CREATE INDEX IF NOT EXISTS idx_article_panels_panel_created
ON article_panels(panel_id, created_at DESC);
```

## Verification Query

Run this to check which indexes currently exist on your tables:

```sql
SELECT
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('article', 'article_panels', 'saved_articles', 'category', 'article_categories', 'panels')
ORDER BY tablename, indexname;
```

## Performance Testing

After adding indexes, test query performance:

```sql
-- Test article lookup by status (should be <10ms with index)
EXPLAIN ANALYZE
SELECT * FROM article WHERE status = 'published' LIMIT 100;

-- Test panel articles (should be <20ms with index)
EXPLAIN ANALYZE
SELECT a.* FROM article a
INNER JOIN article_panels ap ON a.article_id = ap.article_id
WHERE ap.panel_id = 'your_panel_id'
AND a.status = 'published'
ORDER BY ap.created_at DESC
LIMIT 10;

-- Test saved articles (should be <10ms with index)
EXPLAIN ANALYZE
SELECT * FROM saved_articles WHERE user_id = 'your_user_id' LIMIT 100;
```

## Index Maintenance

### Monitor Index Usage

```sql
-- Check which indexes are NOT being used (candidates for removal)
SELECT * FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;
```

### Monitor Index Performance

```sql
-- Check index efficiency
SELECT
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

## Notes

- Indexes improve READ performance but slow down INSERT/UPDATE/DELETE
- The queries have been optimized to use these indexes
- Monitor performance after adding indexes using Supabase's Performance Dashboard
- If you notice slow queries, check the EXPLAIN ANALYZE output to confirm indexes are being used

## Supabase Dashboard Access

To verify indexes in Supabase:

1. Go to SQL Editor
2. Run the verification query above
3. Monitor in "Indexes" section if available in your plan
4. Check execution times in Supabase dashboard

---

**After implementing these indexes, you should see a 2-5x improvement in query execution times for the optimized endpoints.**
