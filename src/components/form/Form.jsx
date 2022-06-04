import React from "react";
import "./form.css"

const Form = (props) => {
  return (
     <div className="form-div">
      <h1>CRUD Operation</h1>
     <div className="form-group">
     <form onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="...title"
        name="title"
        value={props.title}
        onChange={props.handleChange}
      />
      <input
        type="text"
        placeholder="...body"
        name="body"
        value={props.body}
        onChange={props.handleChange}
      />
      <input type="submit" />
    </form>
     </div>
   </div>
  );
};

export default Form;
