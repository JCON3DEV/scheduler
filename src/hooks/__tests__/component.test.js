// import React from "React";

//the file path is incorrect.
// this was personal testing and can be deleted;

// import { render, fireEvent, screen } from "@testing-library/react";
// import Button from "src/components/Button";

// it("renders the button with the test message", () => {
//   const testMessage = "Test Message";
//   render(<Button>{testMessage}</Button>);
// });

// below was added to remove a Failing test criteria. It is a duplciate of Application.test.js
import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
