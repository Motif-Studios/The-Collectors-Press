import { supabase } from "../../lib/supabase";

type UploadedFileResult = {
    message: string;
    path: string;
    publicUrl: string;
};

export async function uploadFile(file: Express.Multer.File, article_id: string): Promise<UploadedFileResult> {
    if (!file?.buffer || !file.originalname) {
        throw new Error("No file provided");
    }

    if (!article_id || article_id === "undefined") {
        throw new Error("No article ID provided");
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

    const { data } = supabase.storage.from("article images").getPublicUrl(filePath);

    return {
        message: "File uploaded successfully",
        path: filePath,
        publicUrl: data.publicUrl,
    };
}

export async function saveImage(path: string, article_id: string): Promise<{ message: string }> {
    if (!article_id || article_id === "undefined") {
        throw new Error("No article ID provided");
    }

    const { error } = await supabase
        .from("article")
        .update({ cover_image_url: path })
        .eq("article_id", article_id)
        .select("*")
        .single();
        
    if (error) {
        console.error("Error saving image to article:", error);
        throw new Error("Failed to save image to article");
    }

    return { message: "Image path saved to article successfully" };
}