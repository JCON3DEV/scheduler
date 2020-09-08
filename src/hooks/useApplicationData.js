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
  // the empty square brackts means that use effect runs only once after the render

  const bookInterview = function (id, interview) {
    console.log("book INterview function id and interview;", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    console.log("THis is appointment; ", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // console.log("NEW APPLICATION STATE; .....", state);
    const url = `/api/appointments/${id}`;
    const promise = axios
      .put(url, appointment)
      .then(function (response) {
        setState({ ...state, appointments });
        return true;
      })
      .catch((err) => {
        console.log("PUT", err);
        return false;
      });
    return promise;
  };
  // console.log("interview OBJ *** ", interview);
  function cancelInterview(appointmentId) {
    console.log("THIS SHOULD BE ID 17 for DELETE ME; ", appointmentId);
    console.log("APPLICATION STATE; .....", state);
    // ####################################
    const appointment = {
      ...state.appointments[appointmentId],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [appointmentId]: appointment,
    };
    // const
    //  ###################################

    const url = `/api/appointments/${appointmentId}`;
    const promise = axios
      .delete(url)
      .then(function (response) {
        // ################################################################
        setState({
          ...state,
          appointments,
        }); // needs fixing without mutating
        //####################################################################
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
