"use client";

import { useFormStatus } from "react-dom";

type DeleteArticleButtonProps = {
  action: () => Promise<void>;
};

function DeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer p-0 text-sm text-[#8d2f2f] underline underline-offset-[3px] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}

export function DeleteArticleButton({ action }: DeleteArticleButtonProps) {
  return (
    <form action={action}>
      <DeleteSubmitButton />
    </form>
  );
}
