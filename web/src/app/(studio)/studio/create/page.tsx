import { createArticle } from "@/features/dashboard/queries/createArticle";
import { redirect } from "next/navigation";

export default async function StudioCreateArticlePage() {
  const data = await createArticle();

  if (data?.error || !data?.article_id) {
    redirect("/studio/create/error?feedback=create_failed");
  }

  redirect(`/studio/create/${data.article_id}/${data.slug}?feedback=created`);
}