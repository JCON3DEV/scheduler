

function getAppointmentsForDay(state, day) {
  const filteredDays  = state.days.filter(day => days.day === day);
  return filteredDays;
}