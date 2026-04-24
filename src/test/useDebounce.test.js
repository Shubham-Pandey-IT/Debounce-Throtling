import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../hooks/useDebounce";

jest.useFakeTimers();

test("should update value after delay", () => {
  const { result, rerender } = renderHook(
    ({ value, delay }) => useDebounce(value, delay),
    { initialProps: { value: "a", delay: 500 } },
  );

  expect(result.current).toBe("a");

  rerender({ value: "ab", delay: 500 });

  expect(result.current).toBe("a");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(result.current).toBe("ab");
});
