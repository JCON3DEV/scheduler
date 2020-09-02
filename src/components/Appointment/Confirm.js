import React from "react";
import Button from "../Button";

export default function Confirm(props) {
  console.log("whats in here again:", props);

  return <main className="appointment__card appointment__card--confirm">
    <h1 className="text--semi-bold">Delete the appointment?</h1>
    <section className="appointment__actions">
      <Button danger onConfirm={props.onConfirm}>Cancel</Button>
      <Button danger onConfirm={props.onConfirm}>Confirm</Button>
    </section>
  </main>


}