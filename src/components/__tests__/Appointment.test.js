import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Application from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    // const testMessage = "Test Message";
    render(<Application />);
  });
});
