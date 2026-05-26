import { API_BASE_URL_SERVER } from "@/lib/env";

export async function getSearchPageDataApi(searchQuery: string) {
    const query = searchQuery.trim();

    try {
        const [articlesRes, categoriesRes] = await Promise.all([
            fetch(`${API_BASE_URL_SERVER}/search/${encodeURIComponent(query)}`),
            fetch(`${API_BASE_URL_SERVER}/search/category`),
        ]);

        const articles = articlesRes.ok ? await articlesRes.json() : [];
        const categoriesData = categoriesRes.ok ? await categoriesRes.json() : [];

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