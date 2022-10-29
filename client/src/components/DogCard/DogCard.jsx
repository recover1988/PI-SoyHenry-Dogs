import React from "react";
import style from "./DogCard.module.css";
import { Link } from "react-router-dom";

export default function DogCard(props) {
  const { id, name, image, temperament, weight_min, weight_max } = props.data;
  return (
    <li key={id} className={style.Card}>
      <Link to={"/home/" + id}>
        <h2>{name.toUpperCase()}</h2>
      </Link>
      <img src={image} alt="Not found" />
      <h3>{temperament.join(", ")}</h3>
      <h4>
        Tiene un peso de {weight_min} {weight_max ? `- ${weight_max}` : ""}
        kilogramos
      </h4>
    </li>
  );
}
