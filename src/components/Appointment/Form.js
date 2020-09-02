import React from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  //below is causing errors needs help.
  const [value, setInteviewer] = setState("interviewer");
  const [name, setName] =setState("name");

  return <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name={name}
          type="text"
          placeholder="Enter Student Name"
          // need to check below is correct
          interviewer = {value} //{value}
          // onChange={(event) => setName(event.target.value)}
        /*
          This must be a controlled component
        */
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={props.onCancel}>Cancel</Button>
        <Button confirm onClick={props.onSave}>Save</Button>
      </section>
    </section>
  </main>

}