"use client";

import { useRowLabel } from "@payloadcms/ui";

/** Shows the item's own name in collapsed array rows instead of "Item 01". */
export function NamedRowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>();
  const text = (data?.name ?? data?.title ?? data?.label ?? data?.question ?? data?.value) as string | undefined;
  return <span>{text || `Item ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
}
