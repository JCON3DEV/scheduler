import React, { Fragment } from "react";
// import "components/application.css";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  // console.log("appointment props:......", props);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    console.log("appointment save function.....:", name, interviewer);
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then((res) => {
      if (res) {
        transition(SHOW);
      } else {
        //to include an error
      }
    });
    // transition(SAVE); // needs Status.js correcting
  }
  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(id).then((res) => {
      if (res) {
        transition(EMPTY);
      } else {
        //to include an error
      }
    });
  }
  // function confirm() {
  //   transition(CONFIRM);
  // }

  return (
    <div className="appoinment">
      <Header time={props.time}></Header>
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          // onConfirm={} // need ot fill in due course
          onDelete={() => transition(CONFIRM)} //
          onCancel={() => transition(EMPTY)}
          //  () => cancel(props.id)
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          onCancel={() => transition(EMPTY)}
          onSave={save}
          interviewers={props.interviewers}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={cancel(props.id)}
          onCancel={() => transition(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
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
