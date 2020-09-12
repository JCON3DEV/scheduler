import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  function transition(mode, replace = false) {
    setHistory(
      (prev) =>
        replace ? [...prev.slice(0, prev.length - 1), mode] : [...prev, mode]
      // If replace, we replace the last element of the array with mode
      // Otherwise append mode to prev
    );
  }
  function back() {
    if (history.length < 2) return;
    //Remove the last element in the array and return the array
    setHistory((prev) => [...prev.slice(0, history.length - 1)]);
  }
  return { mode: history[history.length - 1], transition, back };
}
