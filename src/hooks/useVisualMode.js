import { React, useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      console.log("history:", history);
      // e.g history = [1, 2]

      // below order is very importants. Do not change;
      let newHistory = history.slice(0, -1); // history become [1]
      setMode(newMode); // //
      console.log("newMode", newMode);
      setHistory([...newHistory, newMode]);
      console.log("history after re setting:", history);
    }
    setMode(newMode);
    // you cannot forcefully change the state as this will be a nightmare!!
    // history.push(newMode);
    setHistory([...history, newMode]);
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }
  return {
    mode,
    transition,
    back,
  };
}
