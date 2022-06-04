import Data from "../db.json";
import "./crudApp.css";
import React, { useState, useTransition } from "react";
import Form from "./form/Form";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import axios from "axios"

const CrudApp = () => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  const filterData = Data.filter((e) => {
    return (
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query)
    );
  });


  return (
    <>
      <main>
        <nav>
          <div className="left-nav">
            <h1>Crud Operation App</h1>
          </div>
          <div className="right-nav">
            <div className="box">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="...Search"
                  value={inputValue}
                  onChange={handleChange}
                />
              </div>
              <div className="add-cancel-field">
                <p onClick={() => setShow(true)}>Add Field</p>
                <p onClick={() => setShow(false)}>Cancel</p>
              </div>
            </div>
          </div>
        </nav>

        {show ? <Form /> : null}
        {isPending && (
          <img
            id="spinner"
            src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-9.jpg"
            alt="Spinner"
          />
        )}
        <div className="grid-box">
          {filterData.map((e) => (
            <div className="grid-card" key={e.id}>
              <h2>{e.name}</h2>
              <h6>{e.email}</h6>
              <h4>{e.role}</h4>
              <div className="operation-icons">
                <RiEdit2Fill id="edit-icon" />
                <AiFillDelete id="delete-icon"/>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CrudApp;
