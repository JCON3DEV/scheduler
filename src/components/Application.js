import React, { useState } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import InterviewerListItem from "components/InterviewerListItem";
import "components/Application.scss";
import Empty from "components/Appointment/Empty";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Form from "components/Appointment/Form";
// import Appointment from "components/Appointment";

const appData = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Dom Jolly",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Bob Hoskins",
      interviewer: {
        id: 5,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  }
];

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [state, setState] = useState("Monday");

  const appointments = appData.map( (appointment)=> {
    return <Appointment 
      key = {appointment.id}
      // time = {appointment.time}
      // interview = {appointment.interview}
      {...appointment}
      />
  } );

  return (
    <main className="layout">
      <section className="sidebar">
        <nav>
          <DayList days={days} day={state} setDay={setState} />
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
      <section className="schedule">
          <li>{appointments}</li>
      </section>
    </main>
  );
}
// key={appointments.id}
//             id={appointments.id}
//             time={appointments.time}
//             // interview={appointments.interview}