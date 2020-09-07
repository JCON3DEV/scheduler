import React from "react";
import "./styles.scss";

export default function Show(props) {
  // console.log("Whats in here;", props);
  // https://web.compass.lighthouselabs.ca/days/w07d2/activities/1112
  // show component should accept the following props;
  // student:String eg. "Lydia Miller-Jones"
  // interviewer: Object we can use the interview object that already exists in stories / index.js for this
  console.log("SHOW props; ...", props);
  return (
    <main className="appointment__card appointment__card--show">
      <section className="appointment__card-left">
        <h2 className="text--regular">
          {props.student || "Lydia Miller-Jones"}
        </h2>
        <section className="interviewer">
          <h4 className="text--light">Interviewer</h4>
          <h3 className="text--regular">
            {props.interviewer ? props.interviewer.name : "Sylvia Palmer"}
          </h3>
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <img
            className="appointment__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="appointment__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}
