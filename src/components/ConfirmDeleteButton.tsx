"use client";

import { useRef, useState } from "react";

export function ConfirmDeleteButton({
  title,
  description,
  action,
  buttonClassName,
  confirmClassName,
  confirmLabel = "Delete",
}: {
  title: string;
  description?: string;
  action: (formData: FormData) => void | Promise<void>;
  buttonClassName: string;
  confirmClassName: string;
  confirmLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function show() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  function close() {
    dialogRef.current?.close();
    setOpen(false);
  }

  return (
    <>
      <button type="button" onClick={show} className={buttonClassName}>
        Delete
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        className="fixed left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/50 dark:border-zinc-800 dark:bg-zinc-950"
      >
        {open ? (
          <div className="p-6 text-left">
            <h2 className="text-lg font-semibold leading-6 text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            {description ? (
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            ) : null}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={close}
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Cancel
              </button>
              <form action={action}>
                <button type="submit" className={confirmClassName}>
                  {confirmLabel}
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

