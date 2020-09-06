export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredDays = state.days.find((dayObject) => dayObject.name === day);
  if (!filteredDays) {
    return [];
  }
  const result = filteredDays.appointments.map((appointmentId) => {
    return state.appointments[appointmentId];
  });
  // if()
  console.log("selector function output;", result);
  console.log("length of result", result.length);
  return result;
}

/*
The function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null. The object it returns should look like this:
{  
  "student": "Lydia Miller-Jones",
  "interviewer": {  
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  }
}
*/

// below does not like the DOT operator
export function getInterview(state, interview) {
  if (!interview || state.appointments.interview === null) {
    return null;
  }
  // console.log("state.interviewers", state.interviewers);
  // console.log("interview", interview);
  const interviewObj = { student: interview.student };
  interviewObj.interviewer = state.interviewers[interview.interviewer];

  return interviewObj;
}

/*
This is the info as is;

appointments:{
1:
id: 1
interview:
interviewer: 4
student: "Archie Cohen"
__proto__: Object
time: "12pm"
__proto__: Object
}
*/
export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredDays = state.days.find((dayObject) => dayObject.name === day);
  if (!filteredDays) {
    return [];
  }
  const result = filteredDays.interviewers.map((interviewersId) => {
    if (!state.interviewers[interviewersId].interview) {
      return undefined;
    }

    return state.interviewers[interviewersId];
  });
  // console.log("selector function output;", result);
  // console.log("length of result", result.length);
  // console.log("day", day);
  // console.log("results; ", result);
  return result;
}

// console.log(
//   "state.appointments[appointmentId];",
//   state.appointments[appointmentId]
// );
