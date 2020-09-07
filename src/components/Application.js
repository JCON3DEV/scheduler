import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors.js";
import { getInterview } from "helpers/selectors.js";
import { getInterviewersForDay } from "helpers/selectors.js";

// import InterviewerListItem from "components/InterviewerListItem";
// import Empty from "components/Appointment/Empty";
// import Header from "components/Appointment/Header";
// import Show from "components/Appointment/Show";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Form from "components/Appointment/Form";
// import Appointment from "components/Appointment";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // what is days?
    appointments: {},
    interviewers: {},
    // previously interviewers was an object
  });

  console.log("Orriginal state before axios;", state);
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => setState({ ...state, days });

  // const [days, setDays] = useState([]);
  //  Below collects the days data from server
  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((responses) => {
      console.log("the retured info ", responses);
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
      }));
      // console.log("********", responses[2].data);
      console.log("Current state;", state);
    });
  }, []);
  // responses[0].data = days
  // responses[1].data = appontments
  // the empty square brackts means that use effect runs only once after the render

  let appointments = getAppointmentsForDay(state, state.day);
  // console.log("CHECK IT,.....", appointments);
  const interviewersArray = getInterviewersForDay(state, state.day);
  // console.log("What is this interview; ", interview);
  // console.log("THis is interviewers;.....", interviewers);

  const bookInterview = function (id, interview) {
    console.log("book INterview function id and interview;", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState({ ...state, appointments });
    console.log("NEW STATE; .....", state);
  };
  // console.log("interview OBJ *** ", interview);

  let appointmentsList = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log("%%%%%%%", interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersArray}
        bookInterview={bookInterview}
        // {...appointment}
      />
    );
  });
  // const appointments = state.appointments.map((appointment) => {
  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       // time = {appointment.time}
  //       // interview = {appointment.interview}
  //       {...appointment}
  //     />
  //   );
  // });

  return (
    <main className="layout">
      <section className="sidebar">
        <nav>
          <DayList
            setState
            {...state}
            day={state.day}
            days={state.days}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"></nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      {/* <h1>This is my scheduler</h1> */}
      <section className="schedule">{appointmentsList}</section>
    </main>
  );
}
// key={appointments.id}
//             id={appointments.id}
//             time={appointments.time}
//             // interview={appointments.interview}
