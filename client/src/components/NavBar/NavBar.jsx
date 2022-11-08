import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import iconDogHouse from "../../img/iconoDogHouse.png";

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <ul>
        <NavLink to="/">
          <img src={iconDogHouse} alt="house dog" />
        </NavLink>
        <li>
          <a href="http://localhost:3000/home">HOME</a>
        </li>

        <li>
          <a href="http://localhost:3000/dogCreate">DOG CRATE</a>
        </li>

        <SearchBar />
      </ul>
    </nav>
  );
}
