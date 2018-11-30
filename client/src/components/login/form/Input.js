import React from "react";


const Input = (props) => {

  return (
    <div>
      <input
        type="text"
        name={props.placeholder}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default Input;