import React, { useState } from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  // console.log("daylist props; ", props);

  const daylist = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
      />
    );
  });
  return <ul>{daylist}</ul>;
}
