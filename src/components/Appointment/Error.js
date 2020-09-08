import React from "react";

export default function Header(props) {
  // console.log("Error pg, props glorious props", props);
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">
          {props.message || "Could not cancel appointment"}
        </h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
        // this has to be onClick instead of onClose because it is a DOM element and not a props
      />
    </main>
  );
}
