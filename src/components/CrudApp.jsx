import Data from "../db.json";
import "./crudApp.css";
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
          <div className="left-nav">
            <h1>Crud Operation App</h1>
          </div>
          <div className="right-nav">
            <div className="box">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="...Search"
                  value={searchValue}
                  onChange={handleSearch}
                />
              </div>
              <div className="add-cancel-field">
                <p onClick={() => setShowForm(true)}>Add Field</p>
                <p onClick={() => setShowForm(false)}>Cancel</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Form Section */}
        {showForm ? (
          <div className="form-div">
            <h1>CRUD Operation</h1>
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
              <h2>{e.name}</h2>
              <h6>{e.email}</h6>
              <h4>{e.role}</h4>
              <h4>{e.id}</h4>
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
