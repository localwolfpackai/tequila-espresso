import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  it("copies and reports status", async () => {
    Object.assign(navigator, {
      clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      const copied = await result.current.copy("amber");
      expect(copied).toBe(true);
    });
    expect(result.current.status).toBe("success");
  });
});
