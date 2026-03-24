import { renderHook, act, waitFor } from "@testing-library/react";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists and retrieves values", () => {
    const { result } = renderHook(() => useLocalStorage("amber-key", "init"));
    act(() => result.current[1]("stored"));
    expect(window.localStorage.getItem("amber-key")).toBe(JSON.stringify("stored"));
  });

  it("starts with initialValue then hydrates from storage after mount", async () => {
    window.localStorage.setItem("amber-key", JSON.stringify("from-storage"));
    const { result } = renderHook(() => useLocalStorage("amber-key", "init"));
    expect(result.current[0]).toBe("init");
    await waitFor(() => {
      expect(result.current[0]).toBe("from-storage");
    });
  });
});
