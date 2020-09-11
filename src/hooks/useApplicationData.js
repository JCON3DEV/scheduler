import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //  Below collects all the data from server
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((responses) => {
      // console.log("the retured info ", responses);
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
      }));
      // console.log("********", responses[2].data);
      // console.log("Current state;", state);
    });
  }, []);
  // the empty square brackts means that use effect runs only once after the render

  //### Refactor this to use state.days.find ### - optional
  function daysWithUpdatedSpots(increment) {
    console.log("info monday", state.day);
    let newDays = [...state.days];
    for (const dayIndex in newDays) {
      let day = newDays[dayIndex];
      if (day.name === state.day) {
        newDays[dayIndex] = { ...day, spots: day.spots + increment };
      }
    }
    return newDays;
  }

  const bookInterview = function (id, interview) {
    // console.log("book INterview function id and interview;", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // console.log("THis is appointment; ", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // console.log("NEW APPLICATION STATE; .....", state);
    const url = `/api/appointments/${id}`;
    const promise = axios
      .put(url, appointment)
      .then(function (response) {
        // below is checking if there was a interview previously. update / create
        let isUpdate = state.appointments[id].interview !== null;
        let delta = isUpdate ? 0 : -1;
        let newDays = daysWithUpdatedSpots(delta);
        setState({ ...state, appointments, days: newDays });
        return true;
      })
      .catch((err) => {
        console.log("PUT", err);
        return false;
      });
    return promise;
  };

  function cancelInterview(appointmentId) {
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };

    const url = `/api/appointments/${appointmentId}`;
    const promise = axios
      .delete(url)
      .then(function (response) {
        let newDays = daysWithUpdatedSpots(+1);
        setState({
          ...state,
          appointments,
          days: newDays,
        });
        return true;
      })
      .catch((err) => {
        console.log("DELETE", err);
        return false;
      });
    return promise;
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
