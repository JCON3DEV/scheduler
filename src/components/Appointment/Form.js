import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  // console.log("Form props;....%%..", props);
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }

  const resetMethod = (onCancel) => {
    setInterviewer(null);
    setName("");
    props.onCancel(); //this is an empty fake function for testing
  };
  // console.log("interviewer name and interviewer", name, interviewer);
  // const saveMethod = (nameOfStudent, interviewernumber) => {
  //   props.onSave(name, interviewer); //this is an empty fake function for testing
  // };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
          <InterviewerList
            interviewers={props.interviewers}
            interviewer={interviewer}
            setInterviewer={setInterviewer}
            // saveMethod={saveMethod}
            // resetMethod={resetMethod}
          />
        </form>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={resetMethod}>
            Cancel
          </Button>{" "}
          {/*resetMethod()*/}
          <Button confirm onClick={validate}>
            Save
          </Button>{" "}
          {/*saveMethod()*/}
        </section>
      </section>
    </main>
  );
}
