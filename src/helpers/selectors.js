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
  return result;
}

export function getInterview(state, interview) {
  if (!interview || state.appointments.interview === null) {
    return null;
  }
  const interviewObj = { student: interview.student };
  interviewObj.interviewer = state.interviewers[interview.interviewer];

  return interviewObj;
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const filteredDays = state.days.find((dayObject) => dayObject.name === day);
  if (!filteredDays) {
    return [];
  }
  const result = filteredDays.interviewers.map((interviewersId) => {
    if (!state.interviewers) {
      return;
    }
    return state.interviewers[interviewersId];
  });
  return result;
}
