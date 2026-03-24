import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";

describe("useDebounce", () => {
  it("delays value updates", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
      initialProps: { value: "a" },
    });

    rerender({ value: "amber" });
    expect(result.current).toBe("a");

    act(() => vi.advanceTimersByTime(200));
    expect(result.current).toBe("amber");
    vi.useRealTimers();
  });
});
