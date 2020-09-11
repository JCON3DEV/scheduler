import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";
// import axios from "__mocks__/axios";
// import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = await waitForElement(() =>
      getAllByTestId(container, "appointment")
    );
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
  });
  // Test 3
  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    // console.log(prettyDOM(appointments));
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Make sure the confirm screen appears".
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // console.log(prettyDOM(appointments));
    // 5. Click the "confirm button"
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Confirm the day is Monday
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(day));

    // 7. Checks the spots increasse by one
    expect(queryByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  //Test 4
  // it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  //   // 1. Render the Application.
  //   const { container } = render(<Application />);
  //   // 2. Wait until the text "Archie Cohen" is displayed.
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   // 3. Click the "Edit" button on the first appointment.
  //   // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
  //   // 5. Click the first interviewer in the list.
  //   // 6. Click the "Save" button on that same appointment.
  //   // 7. Check that the element with the text "Saving" is displayed.
  //   // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
  // })

  // it("saves things", async () => {
  //   const { container, debug } = render(<Application />);
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   console.log(prettyDOM(container));
  //   expect(getByText(appointment, "Saving")).not.toBeInTheDocument();
  //   // fireEvent.click()
  // });
});
