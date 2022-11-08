import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import Carousel from "../Carousel/Carousel";
import imagen1 from "../../img/1.png";
import imagen2 from "../../img/2.png";
import imagen3 from "../../img/3.png";
export default function LandingPage() {
  const data = [imagen1, imagen2, imagen3];
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
          <Carousel data={data} />
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
