import React from "react";
import { uploadFile } from "@/features/dashboard/queries/uploadFile";

type CoverUploadProps = {
  className?: string;
  id?: string;
  name?: string;
  accept?: string;
  article_id?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

const defaultOnChange = (id?: string, article_id?: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    try {
      const file = await uploadFile(event.target.files[0], article_id || "");
      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article%20images/${file.path}`;
      const label = id
        ? (document.querySelector(`label[for="${id}"]`) as HTMLLabelElement | null)
        : null;

      if (label) {
        label.style.backgroundImage = `url("${imageUrl}")`;
        label.style.backgroundSize = "cover";
        label.style.backgroundPosition = "center";
        label.style.border = "none";
        
        const textDiv = label.querySelector('#text');
        if (textDiv) {
          textDiv.remove();
        }
      }
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
  onChange = defaultOnChange(id, article_id),
}: CoverUploadProps) {
  console.log("article_id", article_id);
  return (
    <label
      htmlFor={id}
      className={classNameHelper(
        "block cursor-pointer border border-dashed border-[#bdb6ad] bg-[#fafafa]",
        className
      )}
    >
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />

      <div id="text" className="flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center max-[700px]:min-h-[200px]">
        <span className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-full border border-[#111] text-[26px] leading-none">
          +
        </span>

        <h3 className="text-[20px] font-semibold">Upload cover image</h3>

        <p className="max-w-[320px] text-[14px] leading-[1.5] text-[#666]">
          Drag and drop an image here, or click to browse
        </p>
      </div>
    </label>
  );
}