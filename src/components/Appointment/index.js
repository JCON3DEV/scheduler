import React, { Fragment } from "react";
// import "components/application.css";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import "./styles.scss";


export default function Appointment(props) {
  console.log("appointment props:", props);
  return (
    <div className= "appoinment">
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}></Show> : <Empty></Empty>}
  </div>
)
}