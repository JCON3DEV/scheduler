import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import propTypes from "prop-types";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: propTypes.array.isRequired,
  };
  if (props.interviewers) {
    const ListItems = props.interviewers.map((interviewer) => {
      return (
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={props.interviewer === interviewer.id}
          setInterviewer={(event) => props.setInterviewer(interviewer.id)}
        />
      );
    });

    return (
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">{ListItems}</ul>
      </section>
    );
  } else {
    return <h1>INterviewerList.js WORDS!</h1>;
  }
}

export default InterviewerList;
