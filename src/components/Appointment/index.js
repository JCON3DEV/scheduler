import React, { Fragment } from "react";
// import "components/application.css";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";

export default function Appointment(props) {
  // console.log("appointment props:", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <div className="appoinment">
      <Header time={props.time}></Header>
      {mode === SHOW && <Show />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form onCancel={() => transition(EMPTY)} />}

      {/* {transition(Empty)} */}
      {/* {transition(Show)} */}
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        ></Show>
      ) : (
        <Empty></Empty>
      )} */}
    </div>
  );
}
