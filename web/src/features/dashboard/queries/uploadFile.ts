import { env } from "@/lib/env";

export async function uploadFile(file: File, article_id: string) {
  const formData = new FormData();
  formData.append("file", file);

  const apiBaseUrl = (env.apiUrl || "http://localhost:5001").replace(/\/$/, "");

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}/upload`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error("Unable to reach upload service. Check that the API is running and NEXT_PUBLIC_API_URL is correct.");
  }

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const errorMessage = errorPayload?.error ?? `HTTP error! status: ${response.status}`;
    throw new Error(errorMessage);
  }

  const result = await response.json();
  console.log("File uploaded successfully:", result);

  try{
    const saveImageToArticle = await fetch(`${apiBaseUrl}/upload/save-image/${article_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: result.path }),
    });

    if (!saveImageToArticle.ok) {
      throw new Error(`Failed to save image to article: ${saveImageToArticle.statusText}`);
    }
  } catch (error) {
    console.error("Error saving image to article:", error);
  }

  return result;
}