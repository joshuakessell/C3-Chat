import React from "react";


const Button = (props) => {

  return (
    <div className="inline">
      <button name={props.name} className="btn" onClick={props.useClick}>{props.value}</button>
    </div>
  )
}

export default Button;