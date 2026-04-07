export async function getSearchPageDataApi(searchQuery: string) {
    try {
        const response = await fetch(`http://localhost:5001/search?q=${encodeURIComponent(searchQuery)}`);
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