

export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  };
  const filteredDays = state.days.find(dayObject => dayObject.name === day);
  if (!filteredDays) {
    return [];
  }
  const result = filteredDays.appointments.map( (appointmentId) => {
    return state.appointments[appointmentId];
  }); 

  return result;
}

