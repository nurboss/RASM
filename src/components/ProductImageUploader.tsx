"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import {
  PRODUCT_IMAGES_BUCKET,
  extractProductImagePathFromPublicUrl,
  sanitizeStorageFileName,
} from "@/lib/product-images";

export type ImageSlot =
  | { kind: "remote"; url: string }
  | { kind: "pending"; file: File; previewUrl: string };

export type ProductImageUploaderHandle = {
  getFinalUrls: (folderId: string) => Promise<string[]>;
};

type Props = {
  initialUrls: string[];
  disabled?: boolean;
};

function randomId() {
  return crypto.randomUUID().slice(0, 8);
}

export const ProductImageUploader = forwardRef<
  ProductImageUploaderHandle,
  Props
>(function ProductImageUploader({ initialUrls, disabled }, ref) {
  const [slots, setSlots] = useState<ImageSlot[]>(() =>
    initialUrls.map((url) => ({ kind: "remote" as const, url })),
  );

  useEffect(() => {
    setSlots(initialUrls.map((url) => ({ kind: "remote" as const, url })));
  }, [initialUrls]);

  const applySlots = useCallback(
    (updater: (prev: ImageSlot[]) => ImageSlot[]) => {
      setSlots((prev) => {
        const next = updater(prev);
        for (const s of prev) {
          if (s.kind === "pending") {
            const still = next.some(
              (x) => x.kind === "pending" && x.previewUrl === s.previewUrl,
            );
            if (!still) URL.revokeObjectURL(s.previewUrl);
          }
        }
        return next;
      });
    },
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      async getFinalUrls(folderId: string) {
        const supabase = createClient();
        const out: string[] = [];
        for (const slot of slots) {
          if (slot.kind === "remote") {
            out.push(slot.url);
            continue;
          }
          const safe = sanitizeStorageFileName(slot.file.name);
          const path = `${folderId}/${Date.now()}-${randomId()}-${safe}`;
          const { error } = await supabase.storage
            .from(PRODUCT_IMAGES_BUCKET)
            .upload(path, slot.file, {
              cacheControl: "3600",
              upsert: false,
              contentType: slot.file.type || "image/jpeg",
            });
          if (error) {
            throw new Error(error.message);
          }
          const { data } = supabase.storage
            .from(PRODUCT_IMAGES_BUCKET)
            .getPublicUrl(path);
          out.push(data.publicUrl);
        }
        return out;
      },
    }),
    [slots],
  );

  const onPickFiles = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;
      const next: ImageSlot[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        next.push({
          kind: "pending",
          file,
          previewUrl: URL.createObjectURL(file),
        });
      }
      if (next.length) {
        applySlots((prev) => [...prev, ...next]);
      }
      e.target.value = "";
    },
    [applySlots],
  );

  const addUrl = useCallback(() => {
    const raw = window.prompt("Paste image URL");
    const url = raw?.trim();
    if (!url) return;
    try {
      // eslint-disable-next-line no-new -- validate URL
      new URL(url);
    } catch {
      return;
    }
    applySlots((prev) => [...prev, { kind: "remote", url }]);
  }, [applySlots]);

  const removeAt = useCallback(
    async (index: number) => {
      const slot = slots[index];
      if (slot?.kind === "remote") {
        const path = extractProductImagePathFromPublicUrl(slot.url);
        if (path) {
          const supabase = createClient();
          // Best-effort delete: if it fails, we still remove from UI.
          await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
        }
      }
      applySlots((prev) => prev.filter((_, i) => i !== index));
    },
    [applySlots, slots],
  );

  const move = useCallback(
    (index: number, dir: -1 | 1) => {
      applySlots((prev) => {
        const j = index + dir;
        if (j < 0 || j >= prev.length) return prev;
        const copy = [...prev];
        const a = copy[index];
        const b = copy[j];
        if (!a || !b) return prev;
        copy[index] = b;
        copy[j] = a;
        return copy;
      });
    },
    [applySlots],
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 disabled:cursor-not-allowed dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            disabled={disabled}
            onChange={onPickFiles}
          />
          Upload images
        </label>
        <button
          type="button"
          disabled={disabled}
          onClick={addUrl}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Add URL
        </button>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Order = gallery order (#1 is primary). Bucket limit applies per file.
        </span>
      </div>

      {slots.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
          No images yet. Upload files or add a URL.
        </p>
      ) : (
        <ul>
          {slots.map((slot, index) => (
            <li
              key={
                slot.kind === "remote"
                  ? `remote-${slot.url}-${index}`
                  : slot.previewUrl
              }
              className="flex gap-3 rounded-lg border border-zinc-200 bg-zinc-50/80 p-3 dark:border-zinc-700 dark:bg-zinc-900/40"
            >
              <div className="relative size-24 shrink-0 overflow-hidden rounded-md bg-zinc-200 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slot.kind === "remote" ? slot.url : slot.previewUrl}
                  alt=""
                  className="size-24 object-cover"
                />
                <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  #{index + 1}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                  {slot.kind === "remote" ? slot.url : slot.file.name}
                </p>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    disabled={disabled || index === 0}
                    onClick={() => move(index, -1)}
                    className="rounded border border-zinc-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-zinc-600"
                    title="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={disabled || index === slots.length - 1}
                    onClick={() => move(index, 1)}
                    className="rounded border border-zinc-300 px-2 py-1 text-xs disabled:opacity-40 dark:border-zinc-600"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      void removeAt(index);
                    }}
                    className="rounded border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50 dark:border-red-900/40 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
