import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Appointment from "components/Application";
import Button from "components/Button";

afterEach(cleanup);

describe("Appointment", () => {
  // below produces warning: a test was not wrapped in act(...). Due to updated state. Requires resolution
  // it("renders without crashing", () => {
  //   render(<Appointment />);
  // });

  it("renders a clickable button", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Clickable</Button>
    );

    const button = getByText("Clickable");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
