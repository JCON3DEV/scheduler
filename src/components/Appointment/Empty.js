import React from "react";
import classnames from "classnames";
import "./styles.scss";


export default function Empty(props) {
  console.log("on add function?", props);
  return <main className="appointment__add">
    <img
      className="appointment__add-button"
      onClick={props.onAdd}
      src="images/add.png"
      alt="Add"
    />
  </main>

}
