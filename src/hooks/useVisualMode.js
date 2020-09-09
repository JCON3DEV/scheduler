import { useState } from "react";

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   function transition(newMode, replace = false) {
//     if (replace) {
//       // below order is very importants. Do not change;
//       setMode(newMode);
//       setHistory((history) => {
//         let newHistory = history.slice(0, -1);
//         return [...newHistory, newMode];
//       });
//     } else {
//       setMode(newMode);
//       setHistory([...history, newMode]);
//     }
//     // you cannot forcefully change the state as this will be a nightmare!!
//     // history.push(newMode);
//   }
//   function back() {
//     if (history.length > 1) {
//       setMode(history[history.length - 2]);
//       setHistory(history.slice(0, -1));
//     }
//   }
//   return {
//     mode,
//     transition,
//     back,
//   };
// }
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
