import { supabase } from "../../lib/supabase";

export async function uploadFile(formData: FormData): Promise<{ message: string }> {
    const file = formData.get("file") as File;

    if (!file) {
        throw new Error("No file provided");
    }

    const { error } = await supabase.storage
        .from("article images"),
        .upload(`temp/${file.name}`, file);

    if (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
    }

    return { message: "File uploaded successfully" };
}
