import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Carousel from "../Carousel/Carousel";

export default function LandingPage() {
  return (
    <div className={styles.body}>
      <div className={styles.title}>
        <h1>THE DOGS API</h1>
      </div>
      <div className={styles.text}>
        <p>
          A dog is much more than a pet. He is a companion, he is part of the
          family, he is a confidant... And any family that has a dog will
          understand how special they can be.
        </p>
      </div>
      <div className={styles.carousel}>
        <Link to={"/home"}>
          <Carousel />
        </Link>
      </div>
      <div className={styles.buttonDiv} >
        <Link to={"/home"}>
          <button className={styles.buttonHome}>HOME</button>
        </Link>
      </div>
    </div>
  );
}
