import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import getAppointmentsForDay from "helpers/selectors.js";
// import InterviewerListItem from "components/InterviewerListItem";
// import Empty from "components/Appointment/Empty";
// import Header from "components/Appointment/Header";
// import Show from "components/Appointment/Show";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Form from "components/Appointment/Form";
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
// alaising whaaat?

export default function Application(props) {
  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {}  
  });
  const setDay = (day) => setState({ ...state, day });
  const setDays = (days) => setState({ ...state, days });
  // const [days, setDays] = useState([]);

  useEffect( () =>{
    axios.get("http://localhost:8001/api/days")
    .then(response => setDays(response.data));
  }, []);
  // the empty square brackts means that use effect runs only once after the render

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
          <DayList
            setState{
            ...state}
            day={state.day}
            days={state.days}
            setDay={setState}
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