import { API_BASE_URL } from "@/lib/env";

export async function getSearchPageDataApi(searchQuery: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch search results: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching search page data:", error);
        return { error: "Failed to fetch search results" };
    }
}