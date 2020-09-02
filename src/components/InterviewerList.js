import React from "react";
import InterviewerListItem from "./InterviewerListItem"
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const ListItems = props.interviewers.map( (interviewer) => {
    console.log("****%%....", props);
    
      return <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected ={props.interviewer === interviewer.id} 
        setInterviewer= {event => props.setInterviewer(interviewer.id)} 
        />
    }
  
  );

  return <section 
  className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{ListItems}</ul>
  </section>

}

// example of props;
// const interviewers = [
// { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },