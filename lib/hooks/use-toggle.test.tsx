import { renderHook, act } from "@testing-library/react";
import { useToggle } from "@/lib/hooks/use-toggle";

describe("useToggle", () => {
  it("toggles boolean state", () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current.value).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.value).toBe(true);
  });
});
