import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";
import "./styles.scss";
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then((res) => {
      if (res) {
        transition(SHOW);
      } else {
        transition(ERROR_SAVE, true);
      }
    });
  }

  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(id).then((res) => {
      if (res) {
        transition(EMPTY);
      } else {
        transition(ERROR_DELETE, true);
      }
    });
  }

  return (
    <div className="appoinment" data-testid="appointment">
      <Header time={props.time}></Header>
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form onCancel={back} onSave={save} interviewers={props.interviewers} />
      )}
      {mode === EDIT && (
        <Form
          onCancel={back}
          onSave={save}
          interviewer={props.interview.interviewer.id}
          name={props.interview.student}
          interviewers={props.interviewers}
        />
      )}
      {mode === CONFIRM && (
        <Confirm onConfirm={() => cancel(props.id)} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={() => transition(SHOW)}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment" onClose={back} />
      )}
    </div>
  );
}
