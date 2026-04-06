import React from "react";

type CoverUploadProps = {
  className?: string;
  id?: string;
  name?: string;
  accept?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function classNameHelper(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function CoverUpload({
  className,
  id,
  name,
  accept = "image/*",
  onChange,
}: CoverUploadProps) {
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

      <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center max-[700px]:min-h-[200px]">
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