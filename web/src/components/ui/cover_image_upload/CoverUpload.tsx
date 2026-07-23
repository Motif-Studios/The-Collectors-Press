import React from "react";
import { uploadFile } from "@/features/dashboard/queries/uploadFile";
import { API_BASE_URL_SERVER } from "@/lib/env";

type CoverUploadProps = {
  className?: string;
  id?: string;
  name?: string;
  accept?: string;
  article_id?: string;
  previewUrl?: string;
  onUploaded?: (payload: { publicUrl: string; path: string }) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const defaultOnChange = (
  id?: string,
  article_id?: string,
  onUploaded?: (payload: { publicUrl: string; path: string }) => void,
) => async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    try {
      const file = await uploadFile(event.target.files[0], article_id || "");
      const imageUrl = file.publicUrl || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article%20images/${file.path}`;

      if (article_id) {
        await fetch(`${API_BASE_URL_SERVER}/upload/save-image/${article_id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: imageUrl }),
        });
      }

      // Call callback to update parent component state, which will trigger re-render
      onUploaded?.({ publicUrl: imageUrl, path: file.path });
    } catch (error) {
      console.error("Cover upload failed:", error);
    }
  }
};

export function CoverUpload({
  className,
  id,
  name,
  accept = "image/*",
  article_id,
  previewUrl,
  onUploaded,
  onChange = defaultOnChange(id, article_id, onUploaded),
}: CoverUploadProps) {
  const previewStyle = previewUrl ? { backgroundImage: `url("${previewUrl}")`, backgroundSize: "cover", backgroundPosition: "center" } : undefined;
  
  return (
    <label
      htmlFor={id}
      className={classNameHelper(
        "block cursor-pointer border transition-all",
        previewUrl ? "border-transparent bg-cover bg-center" : "border-dashed border-[#bdb6ad] bg-[#fafafa]",
        className
      )}
      style={previewStyle}
    >
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />

      {!previewUrl && (
        <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center max-[700px]:min-h-[200px]">
          <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#111] text-[26px] leading-none">
            +
          </span>

          <h3 className="text-[20px] font-semibold">Cover image</h3>

          <p className="max-w-[320px] text-[14px] leading-[1.5] text-[#666]">
            Drag and drop an image here, or click to browse
          </p>
        </div>
      )}
      
      {previewUrl && (
        <div className="min-h-[240px] flex items-center justify-center max-[700px]:min-h-[200px] bg-black/30">
          <p className="text-white font-semibold">Image uploaded ✓</p>
        </div>
      )}
    </label>
  );
}