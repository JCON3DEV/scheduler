import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || "");
  const [name, setName] = useState(props.name || "");

  const resetMethod = (onCancel) => {
    setInterviewer(null);
    setName("");
    props.onCancel(); //this is an empty fake function for testing
  };
  const saveMethod = (nameOfStudent, interviewernumber) => {
    props.onSave(name, interviewer); //this is an empty fake function for testing
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={resetMethod}>
            Cancel
          </Button>{" "}
          {/*resetMethod()*/}
          <Button confirm onClick={saveMethod}>
            Save
          </Button>{" "}
          {/*saveMethod()*/}
        </section>
      </section>
    </main>
  );
}
