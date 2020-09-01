import React, { useState } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import InterviewerListItem from "components/InterviewerListItem";
import "components/Application.scss";


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
  const [state, setState] = useState("Monday")
  return (
    <main className="layout">
      <section className="sidebar">
        {/* <nav><DayList
          days={days}
          day={"Monday"}
          setDay={day => console.log(day)}
        />
        </nav>  */}
            <nav>
               <DayList
                days={days}
                day={state}
                setDay={setState}/>
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
      <h1>This is my scheduler</h1>
      <h2>{Application}</h2>
      <div>
        {InterviewerListItem}
      </div>

      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
