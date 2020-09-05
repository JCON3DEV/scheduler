import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

const SECOND = "SECOND";
const THIRD = "THIRD";

// Transition testing;
test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

// back action testing;
test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));
  // console.log(history) = [FIRST]
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
  // mode(FRIST) => mode(SECOND)
  // history.push [FIRST, SECOND]
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);
  // mode(SECOND) => mode(THRID)
  // console.log(history) = [FIRST, SECOND, THRID]

  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);
  // mode(THRID) => mode(SECOND)

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

// Transition with replace;
test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});
