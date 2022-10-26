import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "../../img/perris.gif";

export default function LandingPage() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <h1>A DOGS WORLD !!!!</h1>
      </div>
      <div className={styles.img}>
        <Link to={"/home"}>
          <img src={image} alt="A dog" className="imagen" />
        </Link>
      </div>
      <button className="divb">
        <Link to={"/home"}>
          <span>HOME</span>
        </Link>
      </button>
    </div>
  );
}
