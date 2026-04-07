export async function getCategoryPageDataApi(categorySlug: string, limit = 10, offset = 0) {
  // TEMP: until backend is ready
  // console.log("API CALL");

  const response = await fetch(`http://localhost:5001/articles/category/${categorySlug}/${limit}/${offset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch category articles");
  }

  return response.json();
}