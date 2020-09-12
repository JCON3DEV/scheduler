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

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((responses) => {
      setState((prev) => ({
        ...prev,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
      }));
    });
  }, []);

  function daysWithUpdatedSpots(increment) {
    const newDays = [...state.days];
    for (const dayIndex in newDays) {
      const day = newDays[dayIndex];
      if (day.name === state.day) {
        newDays[dayIndex] = { ...day, spots: day.spots + increment };
      }
    }
    return newDays;
  }

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const url = `/api/appointments/${id}`;
    const promise = axios
      .put(url, appointment)
      .then(function (response) {
        // below is checking if there was a interview previously. To decide the increment
        const isUpdate = state.appointments[id].interview !== null;
        const delta = isUpdate ? 0 : -1;
        const newDays = daysWithUpdatedSpots(delta);
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
