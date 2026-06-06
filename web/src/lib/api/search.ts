import { API_BASE_URL_SERVER } from "@/lib/env";

export async function getSearchPageDataApi(searchQuery: string) {
    const query = searchQuery.trim();

    try {
        const [articlesRes, categoriesRes] = await Promise.all([
            fetch(`${API_BASE_URL_SERVER}/search/${encodeURIComponent(query)}`),
            fetch(`${API_BASE_URL_SERVER}/search/category`),
        ]);

        const articlesData = articlesRes.ok ? await articlesRes.json() : [];
        const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];

        const articles = (Array.isArray(articlesData) ? articlesData : []).map((article) => {
            const title = String(article.title || article.name || "");
            const summary = String(article.preview_text || article.description || article.summary || "");
            const imageSrc = String(article.cover_image_url || article.imageSrc || "");
            const imageAlt = String(article.image_alt || article.imageAlt || title || "Article cover image");

            return {
                id: String(article.article_id || article.id || title),
                title,
                summary,
                author: String(article.author_name || article.author || "Unknown author"),
                date: String(article.created_at || article.date || ""),
                caption: String(article.cover_image_caption || article.caption || ""),
                imageSrc,
                imageAlt,
                href: article.slug ? `/article/${encodeURIComponent(article.slug)}` : "#",
            };
        });

        const queryLower = query.toLowerCase();
        const categories = (Array.isArray(categoriesData) ? categoriesData : [])
            .filter(cat => !query || String(cat.category_name || cat.name).toLowerCase().includes(queryLower))
            .map(cat => {
                const name = String(cat.category_name || cat.name);
                const slug = name
                    .toLowerCase()
                    .replace(/&/g, "and")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "");

                return {
                    id: String(cat.category_id || cat.id || name),
                    name,
                    slug,
                    href: `/category/${slug}`,
                };
            });

        return { articles, categories };
    } catch (error) {
        console.error("Error fetching search data:", error);
        return { articles: [], categories: [] };
    }
}