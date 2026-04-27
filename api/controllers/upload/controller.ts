import { supabase } from "../../lib/supabase";

export async function uploadFile(file: Express.Multer.File, article_id: string): Promise<{ message: string; path: string }> {
    if (!file?.buffer || !file.originalname) {
        throw new Error("No file provided");
    }

    const filePath = `${article_id}/${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
        .from("article images")
        .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });

    if (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
    }

    return { message: "File uploaded successfully", path: filePath };
}

export async function saveImage(path: string, article_id: string): Promise<{ message: string }> {
    const { error } = await supabase
        .from("article")
        .update({ cover_image_url: path })
        .select("*")
        .eq("article_id", article_id)
        .single();
        
    if (error) {
        console.error("Error saving image to article:", error);
        throw new Error("Failed to save image to article");
    }

    return { message: "Image path saved to article successfully" };
}