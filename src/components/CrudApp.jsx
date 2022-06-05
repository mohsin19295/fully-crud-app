import Data from "../db.json";
import "./crudApp.css";
import "./crudMedia.css";
import React, { useState, useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import { v4 as uuid } from "uuid";

const CrudApp = () => {
  const [state, setState] = useState(Data);
  const [query, setQuery] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [postInput, setPostInput] = useState({ name: "", email: "", role: "" });

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    startTransition(() => {
      setQuery(e.target.value);
    });
  };
  
  const { name, email, role } = postInput;

  const formInputChange = (e) => {
    setPostInput({ ...postInput, [e.target.name]: e.target.value });
  };

  const updateInput = (name, email, role, id) => {
    const newInput = state.map((input) =>
      input.id === id ? {name, email, role, id} : input
    );
    setState(newInput);
    setPostInput({ name: "", email: "", role: "" })
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!editMode) {
      const payload = {
        name: postInput.name,
        email: postInput.email,
        role: postInput.role,
        id: uuid(),
      };
      setPostInput({ name: "", email: "", role: ""})
      setState([...state, payload]);
      setShowForm(false);
    } else {
      updateInput(name, email, role, postInput.id);
      setEditMode(false);
      setShowForm(false)
    }
  };

  const filterData = state.filter((e) => {
    return (
      e.name.toLowerCase().includes(query) ||
      e.email.toLowerCase().includes(query) ||
      e.role.toLowerCase().includes(query)
    );
  });

  const deleteCard = (id) => {
    setState(
      state.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const editCard = (id) => {
    const edit = state.filter((item) => {
      return item.id === id;
    });
    setPostInput(...edit);
    setShowForm(true);
    setEditMode(true);
  };

  return (
    <>
      <main>
        {/* Nav section */}
        <nav>
          <ul className="left-nav">
          <li className="nav_items">
              <img src="https://mohsinportfolio1.netlify.app/images/mohsin.png" alt="" />
            </li>
          </ul>

          <ul className="right-nav">
            <li className="nav_items input-field">
           <input
                  type="text"
                  placeholder="...Search"
                  value={searchValue}
                  onChange={handleSearch}
                />
            </li>
            <li className="nav_items" id="add-field">
              <button onClick={() => setShowForm(true)}>Add</button>
            </li>
            <li className="nav_items">
              <button onClick={() => setShowForm(false)}>Cancel</button>
            </li>
          </ul>

        </nav>

        {/* Form Section */}
        {showForm ? (
          <div className="form-div">
            <p>CRUD Operation</p>
            <div className="form-group">
              <form onSubmit={formSubmit}>
                <input
                  type="text"
                  placeholder="...Name"
                  name="name"
                  value={name}
                  onChange={formInputChange}
                />
                <input
                  type="text"
                  placeholder="...Email"
                  name="email"
                  value={email}
                  onChange={formInputChange}
                />
                <input
                  type="text"
                  placeholder="...Role"
                  name="role"
                  value={role}
                  onChange={formInputChange}
                />
                <input type="submit" />
              </form>
            </div>
          </div>
        ) : null}

        {/* Spinner Section */}
        {isPending && (
          <img
            id="spinner"
            src="https://icon-library.com/images/loading-icon-animated-gif/loading-icon-animated-gif-9.jpg"
            alt="Spinner"
          />
        )}

        {/* Grid Section */}
        <div className="grid-box">
          {filterData.map((e) => (
            <div className="grid-card" key={e.id}>
              <h3>{e.name}</h3>
              <p>{e.email}</p>
              <h4>{e.role}</h4>
              <div className="operation-icons">
                <RiEdit2Fill id="edit-icon" onClick={() => editCard(e.id)} />
                <AiFillDelete
                  id="delete-icon"
                  onClick={() => deleteCard(e.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default CrudApp;
