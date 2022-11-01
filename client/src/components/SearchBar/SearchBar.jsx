import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getDogsByName } from "../../actions/actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/home")
    dispatch(getDogsByName(name));
    setName("");
  }

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <span className="visually-hidden">Search Dog</span>
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search Dog"
        value={name}
        onChange={handleInputChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Search
      </button>
   
    </form>
  );
}
