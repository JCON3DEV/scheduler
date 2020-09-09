import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import propTypes from "prop-types";
import "components/InterviewerList.scss";

function InterviewerList(props) {
  InterviewerList.propTypes = {
    interviewers: propTypes.array.isRequired,
  };
  // console.log("Interviewer List Props $$$$%%$%$%; ", props);
  if (props.interviewers) {
    const ListItems = props.interviewers.map((interviewer) => {
      // console.log("****%%....", props);

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

// example of props;
// const interviewers = [
// { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
