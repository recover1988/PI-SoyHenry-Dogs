import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import iconDogHouse from "../../img/iconoDogHouse.png";
import { useDispatch } from "react-redux";
import { getDogs } from "../../actions/actions";

export default function NavBar() {
  const dispatch = useDispatch();
  return (
    <nav className={styles.navBar}>
      <ul>
        <NavLink to="/">
          <img src={iconDogHouse} alt="house dog" />
        </NavLink>
        <NavLink to="/home" onClick={() => dispatch(getDogs())}>
          <li>HOME</li>
        </NavLink>
        <NavLink to="/dogCreate">
          <li>DOG CRATE</li>
        </NavLink>
        <SearchBar />
      </ul>
    </nav>
  );
}
