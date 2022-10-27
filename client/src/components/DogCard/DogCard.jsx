import React from "react";
import style from "./DogCard.module.css";

export default function DogCard(props) {
  const { name, image, temperament, weight_min, weight_max } = props.data;
  return (
    <div className={style.Card}>
      <h2>{name.toUpperCase()}</h2>
      <img src={image} alt="Not found" />
      <h3>{temperament.join(", ")}</h3>
      <h4>
        Tiene un peso de {weight_min} {weight_max ? `- ${weight_max}` : ""}
        kilogramos
      </h4>
    </div>
  );
}
