import { API_BASE_URL } from "@/lib/env";

export async function getSearchPageDataApi(searchQuery: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            console.error(`Failed to fetch search results: ${response.status} ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return Array.isArray(data) ? data : Array.isArray(data?.articles) ? data.articles : [];
    } catch (error) {
        console.error("Error fetching search page data:", error);
        return [];
    }
}