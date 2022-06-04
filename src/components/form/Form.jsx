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
        placeholder="...Name"
        name="name"
        value={props.name}
        onChange={props.handleChange}
      />
      <input
        type="text"
        placeholder="...Email"
        name="email"
        value={props.email}
        onChange={props.handleChange}
      />
      <input
        type="text"
        placeholder="...Role"
        name="role"
        value={props.role}
        onChange={props.handleChange}
      />
      <input type="submit" />
    </form>
     </div>
   </div>
  );
};

export default Form;
