import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDogsByName } from "../../actions/actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/home");
    dispatch(getDogsByName(name));
    setName("");
  }

  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search"></label>
      <input
        className={styles.search}
        type="text"
        id="search"
        placeholder="Search Dog"
        value={name}
        onChange={handleInputChange}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={handleSubmit}
      >
        Search
      </button>
    </form>
  );
}
