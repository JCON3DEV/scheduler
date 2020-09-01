import React from "react";
import classnames from "classnames"
import "components/Button.scss";

export default function Button(props) {
   // const [value, setValue] = React.useState("hello")
   // const handleClick = () => {
   //    setValue("Clicked")
   // }
   const  buttonClass = classnames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger,
   });

   return (
      <button 
        className = {buttonClass} 
        onClick = {props.onClick}
        disabled = {props.disabled}
        >
         { props.children }
      </button>);
   
}
