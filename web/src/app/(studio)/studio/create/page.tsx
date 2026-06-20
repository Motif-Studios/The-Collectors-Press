import { createArticle } from "@/features/dashboard/queries/createArticle";
import { redirect } from "next/navigation";

export default async function StudioCreateArticlePage() {
  const data = await createArticle();

  if (data?.error || !data?.article_id) {
    redirect("/studio/create/error?feedback=create_failed");
  }

  // console.log(data);
  // console.log("Redirecting to article creation page with ID:", data.article_id.article_id);

  redirect(`/studio/create/${data.article_id.article_id}/${data.article_id.slug}?feedback=created`);
}