import { getCurrentUser } from "@/features/auth/queries/getCurrentUser";

export async function createArticle() {
    const user = await getCurrentUser();

    if (!user?.id) {
        throw new Error("User is not authenticated");
    }

    const response = await fetch(`http://localhost:5001/dashboard/create_article/${user.id}`, {
        method: "POST",
    });
    if (!response.ok) {
        throw new Error("Failed to create article");
    }

    return response.json();
}