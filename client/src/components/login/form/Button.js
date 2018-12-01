import React from "react";
import {Route} from "react-router-dom";

  const Button = (props) => (
    <div className="inline">
      <Route render={({ history }) => (
        <button
          type="button"
          onClick={() => { history.push('/') }}>
          {props.value}
        </button>
      )}
      />
    </div>
  )

export default Button;