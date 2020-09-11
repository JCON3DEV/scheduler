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
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";
// import axios from "__mocks__/axios";
import axios from "axios";

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
    const { container } = render(<Application />);

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

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Make sure the confirm screen appears".
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "confirm button"
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Confirm the day is Monday
    await waitForElement(() => getByAltText(appointment, "Add"));
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    // 7. Checks the spots increasse by one
    expect(queryByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  //Test 4 - this needs correcting the spots are decreasing!
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the first appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    //below is debugging
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    console.log(prettyDOM(appointment));
    console.log(prettyDOM(day));
    // above is debugging

    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // console.log(prettyDOM(appointment));
    // console.log(prettyDOM(day));
    // await waitForElement(() => getByAltText(appointment, "Delete"));
    // // const day = getAllByTestId(container, "day").find((day) =>
    // //   queryByText(day, "Monday")
    // // );
    // console.log(prettyDOM(day));
    // 8. Checks the spots do not increasse
    await expect(queryByText(day, "no spots remaining")).toBeInTheDocument();
    // there is an error. the spots are decreasing!
  });

  // it("saves things", async () => {
  //   const { container, debug } = render(<Application />);
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   console.log(prettyDOM(container));
  //   expect(getByText(appointment, "Saving")).not.toBeInTheDocument();
  //   // fireEvent.click()
  // });
  /* Test 5 */
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("it shows the save error when failing to save an appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the schedule data is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = await waitForElement(() =>
      getAllByTestId(container, "appointment")
    );
    const appointment = appointments[0];
    // 3. Click to add a new appointmnet
    fireEvent.click(getByAltText(appointment, "Add"));
    // 4. enter a name for the student
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });
    // 5. click to choose an instructor
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6.  click save
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Expect to see the loading screen
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Expect to see the erro screen
    //  FAILING needs correcting
    axios.put.mockRejectedValueOnce();
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Make sure the confirm screen appears".
    expect(
      getByText(appointment, "Delete the appointment?")
    ).toBeInTheDocument();

    // 5. Click the "confirm button"
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6 It shows the error screen when throw
    axios.delete.mockRejectedValueOnce();
    console.log(prettyDOM(container));
    // 7. Expect to see the error screen
    // How do you get this to throw an error for testing??
    expect(getByText(appointment, "Error")).toBeInTheDocument();
  });
});
