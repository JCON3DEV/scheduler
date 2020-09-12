// below was added to remove a Failing test criteria. It is a duplciate of Application.test.js
import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
