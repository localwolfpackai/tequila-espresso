"use client";

import { useCallback, useState } from "react";

type CopyState = "idle" | "success" | "error";

export function useCopyToClipboard() {
  const [status, setStatus] = useState<CopyState>("idle");

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }, []);

  return { status, copy };
}
